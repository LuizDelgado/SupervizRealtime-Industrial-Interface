import os
import requests
import json
import time
import random
from dotenv import load_dotenv
import google.generativeai as genai

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

# Variáveis de autenticação para o SuperViz e o Gemini
SUPERVIZ_CLIENT_ID = os.getenv("SUPERVIZ_CLIENT_ID")
SUPERVIZ_SECRET_KEY = os.getenv("SUPERVIZ_SECRET_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHANNEL_NAME = "RealtimePlant4Frontend"

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

# Função para simular a produção de uma peça e seu tempo
def simulate_production():
    pieces = ["Preta", "Prata", "Vermelha"]
    piece = random.choice(pieces)
    production_time = random.uniform(45, 55)  # Simula o tempo de produção entre 40 e 60 segundos
    print(f"Produção de {piece} concluída em {production_time:.2f} segundos.")
    return piece, production_time

# Função para gerar insights usando o Gemini
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
        "Se não houver tipo de peça ou estiver escrito Nenhuma houve erro na hora da peça seguir para a estação que a identifica, sugira um erro na rampa em sua mensagem"
        "Se o tempo de produção for menor que 45 segundos, pode indicar que houve um pulo de etapa no processo. "
        "Se o tempo for maior que 55 segundos, pode indicar um erro na montagem da peça, como problemas na tampa. "
        "O objetivo é identificar a eficiência da produção e possíveis gargalos no processo. "
        "Não forneça dicas ou sugestões, seja direto e apenas informe o que for possível a partir dos dados passados "
        "Dê a sua resposta em inglês, seja direto. "
        "Considere fatores como tempo de produção e cor da peça e um breve comentário sobre a montagem."
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

# Função principal para simular e enviar dados de produção
def simulate_and_send_production():
    while True:
        piece, production_time = simulate_production()
        
        # Gera insights usando o Gemini
        plant_data = {
            "peca": piece,
            "tempo_producao": production_time,
            "status": "concluida"
        }
        insights = generate_insights_from_gemini(plant_data)
        
        # Publica os resultados no SuperViz
        publish_event("producao.concluida", {
            "peca": piece,
            "tempo_producao": production_time,
            "insights": insights
        })
        
        # Aguardar 5 segundos antes de enviar a próxima produção (ajuste conforme necessário)
        time.sleep(5)

# Exemplo de uso: simular e enviar produções
if __name__ == "__main__":
    try:
        simulate_and_send_production()
    except KeyboardInterrupt:
        print("Interrompido pelo usuário.")
