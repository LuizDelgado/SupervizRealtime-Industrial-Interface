import requests
import os
from dotenv import load_dotenv
load_dotenv()

SUPERVIZ_CLIENT_ID = os.getenv("SUPERVIZ_CLIENT_ID")
SUPERVIZ_SECRET_KEY = os.getenv("SUPERVIZ_SECRET_KEY")
CHANNEL_NAME = "Realtime Plant 4.0"

def get_channel_info(channel_name):
    url = f"https://api.superviz.com/realtime/{channel_name}"
    headers = {
        "client_id": SUPERVIZ_CLIENT_ID,
        "secret": SUPERVIZ_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        channel_data = response.json()
        
        # Verificar se há eventos no canal
        events = channel_data.get("events", [])
        
        if events:
            # Pegar o último evento (mais recente)
            last_event = events[-1]
            
            # Acessar o payload do último evento
            last_payload = last_event.get("data", {}).get("payload", {})
            print(f"Payload mais recente: {channel_data}")
        else:
            print("Nenhum evento encontrado no canal.")
    else:
        print(f"Falha ao obter informações do canal: {response.status_code} - {response.text}")

# Exemplo de uso: Consultando as informações do canal
if __name__ == "__main__":
    get_channel_info(CHANNEL_NAME)
