from fastapi import Depends
from schema.response import ShelterInfoSchema
from repository.odm import ShelterInfoDocument
from database.mapdb import MapDB, get_mapdb
from repository.shelter import ShelterRepository
from typing import List

class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends(),map_db : MapDB = Depends(get_mapdb)):
        self.shelter_repository=shelter_repository
        self.map_db=map_db
        print("ShelterService init")
        

    def get_near_service(self, user_location: List[float]) -> List[ShelterInfoDocument]:
        shelter_document_list :list[ShelterInfoDocument]= self.shelter_repository.get_near_repository(user_location)
        return shelter_document_list
        
    def get_shetlers_service(self, user_location: List[float], code: str) -> List[ShelterInfoSchema]:
        shelters_data = self.shelter_repository.get_shelter(user_location, code)
        return self.tranform_resp(shelters_data)
        
    
    def tranform_resp(self, shelters_data: List[dict]) -> List[ShelterInfoSchema]:
        shelters = [ShelterInfoSchema(
            shelterId=shelter['properties']['_id'],  # MongoDB의 _id는 ObjectId 타입이므로 문자열로 변환
            name=shelter['properties']['name'],
            address=shelter['properties']['address'],
            capacity=shelter['properties']['capacity'],
            latitude=shelter['geometry']['coordinates'][1],
            longitude=shelter['geometry']['coordinates'][0],
            type=shelter['properties']['code']
        ) for shelter in shelters_data]
        
        return shelters
        
        
