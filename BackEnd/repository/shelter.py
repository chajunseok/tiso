from fastapi import Depends
from repository.odm import ShelterInfoDocument
from database.mongo import get_mongo_client
from typing import List
import time

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
        
        
    def get_near_repository(self, user_location: List[float]) -> List[ShelterInfoDocument]:
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
        
        nearby_shelters_result = collection.find(query)
        mapping_list=[]
        #아래부분은 수동매핑에서 자동매핑으로 바꿔야한다.
        for shelter_query_result in nearby_shelters_result:
            temp_dict=shelter_query_result["properties"]
            temp_dict.update(shelter_query_result["geometry"])
            mapping_list.append(ShelterInfoDocument(data=temp_dict))
        return mapping_list
    
    def get_shelter_by_shelter_id(self,shelter_id:str) -> ShelterInfoDocument:
        db = self.client['admin']
        collection = db['shelter_geojson']
        query = {
            "properties._id": shelter_id
        }
        print(query)
        start = time.time()
        query_result = collection.find_one(query)
        end = time.time()
        print(f"shelter find one: {end - start:.5f} sec")
        print("result : ",query_result)

        if query_result != None:
            temp_dict=query_result["properties"]
            temp_dict.update(query_result["geometry"])
            return ShelterInfoDocument(data=temp_dict)
        return ShelterInfoDocument(data={})