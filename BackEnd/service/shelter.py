from fastapi import Depends
from schema.response import ShelterPathSchema
from repository.shelter import ShelterRepository
from typing import List

class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends()):
        self.shelter_repository=shelter_repository
        print("ShelterService init")
        
    async def get_near_service(self, user_location: List[float], max_distance: int = 3000) -> List[dict]:
        return await self.shelter_repository.get_near_repository(user_location, max_distance)
    
    def get_path_from_gps_to_shelter(self,latitude:float,longitude:float,shetler_id:str)->ShelterPathSchema:
        

        return ShelterPathSchema()