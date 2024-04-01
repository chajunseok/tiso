import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

client_id = os.environ.get('client_id')
client_secret = os.environ.get('client_secret')

url = "http://tiso.run:8000/emergency"

def get_lat_lon(query):
    url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"
    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret
    }
    params = {"query": query}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        if result['addresses'] and len(result['addresses']) > 0:
            address = result['addresses'][0]
            lat, lon = address['y'], address['x']
            return lat, lon
        
    response = requests.post(url, json=json.dumps(result))
    return None, None
