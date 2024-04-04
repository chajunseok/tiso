from dotenv import load_dotenv
import os
import requests
from database import client
import csv
import json

# .env 파일 로드
load_dotenv()

# 환경변수 사용
api_key = os.getenv('serviceKey')

# 지진 옥외 대피소 api 데이터 json 으로 정적화
def eq_data():
    num = 1
    shelters = []
    
    while True:
        endpoint = 'http://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake4/getArea4List?serviceKey={}&pageNo={}&numOfRows=100&type=json&ctprvn_nm=%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C'.format(api_key, num)
        resp = requests.get(endpoint, verify=False)
        data = resp.json()
        
        if 'RESULT' in data:
            print("end of data")
            break
        
        if 'EarthquakeOutdoorsShelter' in data:
            rows = data['EarthquakeOutdoorsShelter'][1]['row']
            for row in rows:
                new_item = {
                    'name' : row['vt_acmdfclty_nm'],
                    'address' : row['dtl_adres'],
                    'capacity' : row['vt_acmd_psbl_nmpr'], 
                    'lat' : float(row['ycord']),
                    'lng' : float(row['xcord']),
                    'code' : 'S1'   # shelter code - 지진옥외대피소
                }
                shelters.append(new_item)
        
        num += 1
        
    return shelters

# 민방위대피소 저장
def read_csv(filepath):
    data = []
    with open(filepath, mode='r', encoding='EUC-KR') as file:
        reader = csv.DictReader(file)
        for row in reader:
            new_item = {
                    'name' : row['시설명'],
                    'address' : row['도로명전체주소'],
                    'capacity' : int(row['최대수용인원']),
                    'lat' : float(row['위도(EPSG4326)']),
                    'lng' : float(row['경도(EPSG4326)']),
                    'code' : 'S2'    # shelter code - 민방위대피소
                }
            
            data.append(new_item)
            
    return data

# 무더위쉼터
def weather_shelters():
    num = 1
    shelters = []

    # 행정기관표준코드    
    with open('regionCode.json', 'r', encoding='utf-8') as f:
        region_data = json.load(f)
        
    region_codes = region_data['regionCode']

    # 행정기관표준코드 별 무더위 쉼터
    for area in region_codes :
        num = 1
        while True:
            endpoint = 'http://apis.data.go.kr/1741000/HeatWaveShelter3/getHeatWaveShelterList3?serviceKey={}&pageNo={}&numOfRows=100&type=json&year=2023&areaCd={}'.format(api_key, num, area)
            resp = requests.get(endpoint, verify=False)
            data = resp.json()
            
            if 'RESULT' in data:
                print(area)
                print( ": end of data")
                break
            
            if 'HeatWaveShelter' in data:
                rows = data['HeatWaveShelter'][1]['row']
                for row in rows:
                    new_item = {
                        'name' : row['restname'],
                        'address' : row['restaddr'],
                        'capacity' : row['usePsblNmpr'],
                        'lat' : row['la'],
                        'lng' : row['lo'],
                        'code' : 'S3'    # shelter code - 무더위쉼터
                    }
                    shelters.append(new_item)
            
            num += 1
            
    return shelters


def save_data(data):
    # mongoDB DB name
    db = client['admin']
    # mongoDB DB collection
    collection = db['shelters']
    
    collection.insert_many(data)
    print("save success")
    

if __name__ == '__main__':
    shelters = eq_data()
    print(shelters[0])
    save_data(shelters)