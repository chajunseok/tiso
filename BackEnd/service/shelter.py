from fastapi import Depends
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
        
        
