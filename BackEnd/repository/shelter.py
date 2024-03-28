from fastapi import Depends
from repository.odm import ShelterInfoDocument
from database.mongo import get_mongo_client
from typing import List


class ShelterRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("ShelterRepository init")
        
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
        for shelter_query_result in nearby_shelters_result:
            temp_dict=shelter_query_result["properties"]
            temp_dict.update(shelter_query_result["geometry"])
            mapping_list.append(ShelterInfoDocument(data=temp_dict))
        return mapping_list