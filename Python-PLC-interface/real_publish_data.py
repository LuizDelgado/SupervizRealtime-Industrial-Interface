import os
import requests
import json
import time
from dotenv import load_dotenv
import google.generativeai as genai
from pymodbus.client.sync import ModbusTcpClient

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

# Variáveis de autenticação para o SuperViz e o Gemini
SUPERVIZ_CLIENT_ID = os.getenv("SUPERVIZ_CLIENT_ID")
SUPERVIZ_SECRET_KEY = os.getenv("SUPERVIZ_SECRET_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHANNEL_NAME = "Realtime Plant 4.0"

# Configurar a API do Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Configuração do modelo Gemini
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Configuração do cliente Modbus
MODBUS_SLAVE_IP = "192.168.2.50"  # Substitua com o IP real do seu slave Modbus
MODBUS_PORT = 502  # Porta padrão do Modbus
client = ModbusTcpClient(MODBUS_SLAVE_IP, port=MODBUS_PORT)

# Função para capturar o valor dos registradores Modbus (leitura dos 4 bits iniciais de um registrador)
def read_modbus_registers():
    response = client.read_input_registers(0, 1)  # Lê o primeiro registrador (ajuste o endereço conforme necessário)
    if not response.isError():
        register_value = response.registers[0]
        # Converte o valor do registrador para binário e captura os 4 primeiros bits
        return [bool(register_value & (1 << n)) for n in range(4)]  # Retorna os bits 0 a 3
    else:
        print("Erro ao ler os registradores do Modbus")
        return None

# Função para identificar a peça produzida
def get_produced_piece(bits):
    if bits[0]:
        return "Preta"
    elif bits[1]:
        return "Prata"
    elif bits[2]:
        return "Vermelha"
    else:
        return "Nenhuma"

# Função para contar o tempo de produção e integrar com o Gemini
def track_production_time():
    start_time = None
    last_piece = None
    while True:
        bits = read_modbus_registers()  # Lê os registradores e pega os bits
        print(bits)
        if bits:
            # Verifica se o bit 3 (flag do robô) está alto
            if bits[3] and start_time is None:
                print("Produção iniciada...")
                start_time = time.time()  # Inicia o cronômetro
            elif not bits[3] and start_time is not None:
                # Robô parou, espera um tempo para garantir que os bits de peça estejam setados
                time.sleep(2)  # Ajuste o delay conforme necessário para garantir que os bits da peça estejam corretos
                bits = read_modbus_registers()  # Lê os bits novamente após o delay

                # Robô parou, calcula o tempo de produção
                end_time = time.time()
                production_time = end_time - start_time
                
                last_piece = get_produced_piece(bits)  # Armazena a peça produzida
                print(f"Produção de {last_piece} concluída em {production_time:.2f} segundos.")
                
                # Gera insights usando o Gemini e publica no SuperViz
                plant_data = {
                    "peca": last_piece,
                    "tempo_producao": production_time,
                    "status": "concluida"
                }
                insights = generate_insights_from_gemini(plant_data)
                
                # Publica os resultados no SuperViz
                publish_event("producao.concluida", {
                    "peca": last_piece,
                    "tempo_producao": production_time,
                    "insights": insights
                })
                
                # Reinicializa o cronômetro
                start_time = None
                last_piece = None

            time.sleep(0.5)  # Intervalo entre leituras

# Função para gerar insights usando o Gemini com o formato correto de 'parts'
# Função para gerar insights usando o Gemini com o histórico correto
def generate_insights_from_gemini(plant_data):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    # Contexto sobre a produção
    contexto = (
        "Você está analisando dados de uma planta industrial que produz êmbolos pneumáticos. "
        "Essas peças podem ser vermelhas, pratas ou pretas. O tempo de produção é medido em segundos, "
        "e o tempo padrão de produção de uma peça é entre 45 e 55 segundos. "
        "Se não houver tipo de peça ou estiver escrito Nenhuma houve erro na hora da peça seguir para a estação que a identifica, sugira um erro na rampa "
        "Se o tempo de produção for menor que 45 segundos, pode indicar que houve um pulo de etapa no processo. "
        "Se o tempo for maior que 55 segundos, pode indicar um erro na montagem da peça, como problemas na tampa. "
        "O objetivo é identificar a eficiência da produção e possíveis gargalos no processo. "
        "Não forneça dicas ou sugestões, seja direto e apenas informe o que for possível a partir dos dados passados "
        "Dê a sua resposta em inglês "
        "Considere fatores como tempo de produção, cor da peça e áreas de otimização."
    )

    # Iniciar a sessão de chat com o contexto fornecido
    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [contexto],  # Passar o contexto de forma simples
            }
        ]
    )

    # Mensagem de entrada com os dados da planta
    input_message = f"Análise dos dados da planta: {json.dumps(plant_data)}. Gere insights sobre a produção."
    
    # Enviar a mensagem para o modelo Gemini com o formato correto
    response = chat_session.send_message({"role": "user", "parts": [input_message]})

    return response.text



# Função para publicar eventos no SuperViz
def publish_event(event_name, event_data):
    url = f"https://api.superviz.com/realtime/{CHANNEL_NAME}/publish"
    headers = {
        "client_id": SUPERVIZ_CLIENT_ID,
        "secret": SUPERVIZ_SECRET_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "name": event_name,
        "data": event_data
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200 or response.status_code == 201:
        print("Evento enviado com sucesso:", response.json())
    else:
        print(f"Falha ao enviar evento: {response.status_code} - {response.text}")

# Exemplo de uso: monitorar a produção
if __name__ == "__main__":
    try:
        track_production_time()  # Monitora o tempo de produção, gera insights e publica os resultados
    except KeyboardInterrupt:
        print("Interrompido pelo usuário.")
    finally:
        client.close()  # Fecha a conexão Modbus
