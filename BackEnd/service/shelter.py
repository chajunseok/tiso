from fastapi import Depends
from repository.shelter import ShelterRepository
from typing import List

class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends()):
        self.shelter_repository=shelter_repository
        print("ShelterService init")
        
    async def get_near_service(self, user_location: List[float]) -> List[dict]:
        return await self.shelter_repository.get_near_repository(user_location)