from fastapi import Depends
from database.mapdb import MapDB, get_mapdb
from schema.response import ShelterPathSchema
from repository.shelter import ShelterRepository
from typing import List
from util.map import lat_lon_array_binary_search
from util.algo import get_nearest_walkable_spot


class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends(),map_db : MapDB = Depends(get_mapdb)):
        self.shelter_repository=shelter_repository
        self.map_db=map_db
        print("ShelterService init")
        
    async def get_near_service(self, user_location: List[float], max_distance: int = 3000) -> List[dict]:
        return await self.shelter_repository.get_near_repository(user_location, max_distance)   