import requests
from dotenv import load_dotenv
import os

load_dotenv()

client_id = os.environ.get('client_id')
client_secret = os.environ.get('client_secret')


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
    return None, None

##### 테스트용 ######
region = "장안면 독정리 677 공장"
result = get_lat_lon(region)
print(result)