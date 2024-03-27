from fastapi import Depends
from database.mapdb import MapDB, get_mapdb
from repository.shelter import ShelterRepository
from schema.response import ShelterPathSchema
from util.map import lat_lon_array_binary_search


class PathService:
    def __init__(self,shelter_repository:ShelterRepository = Depends(),map_db : MapDB = Depends(get_mapdb)):
        self.shelter_repository=shelter_repository
        self.map_db=map_db
        print("Path init")

    def get_path_from_gps_to_shelter(self,latitude:float,longitude:float,shelter_id:str)->ShelterPathSchema:
        mapped_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(latitude,longitude))
        print(mapped_gps_index)
        print(type(self.map_db.binary_map))
        print(type(self.map_db.gps_mapping))
        return ShelterPathSchema()