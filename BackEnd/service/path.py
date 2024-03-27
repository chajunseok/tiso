from fastapi import Depends
from repository.path import PathRepository
from util.algo import get_nearest_walkable_spot, test_get_nearest_walkable_spot
from repository.orm import ShelterPath
from database.mapdb import MapDB, get_mapdb
from repository.shelter import ShelterRepository
from util.map import lat_lon_array_binary_search
from fastapi import HTTPException

import math
import time


class PathService:
    def __init__(self,path_repository:PathRepository = Depends(),map_db : MapDB = Depends(get_mapdb)):
        self.path_repository=path_repository
        self.map_db=map_db
        print("PathService init")

    def get_path_from_gps_to_shelter(self,latitude:float,longitude:float,shelter_id:str)->ShelterPath:
        mapped_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(latitude,longitude))
        
        if mapped_gps_index==(-1,-1):
            raise HTTPException(status_code=404, detail="대전에 위치하지 않은 사용자입니다.")

        #gps매핑배열은 지도배열을 5배 축소한것입니다.
        mapped_gps_index=(mapped_gps_index[0]*5,mapped_gps_index[1]*5)

        standard=500    

        nearest_walkable_spot=get_nearest_walkable_spot(self.map_db.binary_map,standard,mapped_gps_index)

        if nearest_walkable_spot==(-1,-1):
            raise HTTPException(status_code=404, detail="도보로부터 너무 멀리 떨어져 있습니다.")
        
        nearest_walkable_mapped_gps=(nearest_walkable_spot[0]//5,nearest_walkable_spot[1]//5)
        shelter_path=self.path_repository.get_path_info_by_shelter_id_and_gps(shelter_id , nearest_walkable_mapped_gps)
        return shelter_path