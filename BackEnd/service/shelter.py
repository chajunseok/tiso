from fastapi import Depends
from database.mapdb import MapDB, get_mapdb
from schema.response import ShelterPathSchema
from repository.shelter import ShelterRepository
from schema.response import ShelterInfoSchema
from typing import List

class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends(),map_db : MapDB = Depends(get_mapdb)):
        self.shelter_repository=shelter_repository
        self.map_db=map_db
        print("ShelterService init")
        
    def get_near_service(self, user_location: List[float]) -> List[ShelterInfoSchema]:
        shelters_data = self.shelter_repository.get_near_repository(user_location)
        
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
        
        
