from fastapi import Depends
from database.mongo import get_mongo_client
from typing import List


class ShelterRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("ShelterRepository init")
        
    def get_shelter(self, user_location: List[float], code: str) -> List[dict]:
        db = self.client['admin']
        collection = db['shelter_geojson']
        
        query = {
            "$and": [
                {
                    "geometry": {
                        "$near": {
                            "$geometry": {
                                "type": "Point",
                                "coordinates": user_location  # 사용자 위치 [경도, 위도]
                            },
                            "$maxDistance": 3000  # 3km 이내의 거리
                        }
                    }
                },
                {
                    "properties.code": code  # 'properties.code'가 'S2'인 조건 추가
                }
            ]
        }
        
        shelters = collection.find(query)
        print(shelters[0])
        
        return shelters
        
        
    def get_near_repository(self, user_location: List[float]) -> List[dict]:
        db = self.client['admin']
        collection = db['shelter_geojson']
        
        query = {
            "geometry": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": user_location
                    },
                    "$maxDistance": 3000  # 미터 단위로 최대 거리 설정
                }
            }
        }
        
        nearby_shelters = collection.find(query)
    
        print(nearby_shelters[0])
        
        return nearby_shelters