from fastapi import Depends
from database.mongo import get_mongo_client
from typing import List


class ShelterRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("ShelterRepository init")
        
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
        
        # 쿼리 실행
        nearby_shelters = collection.find(query)
        
        return list(nearby_shelters)