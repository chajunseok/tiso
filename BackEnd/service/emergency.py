from fastapi import Depends, HTTPException
from repository.odm import PathDocument, ShelterInfoDocument
from util.algo import get_nearest_walkable_spot, get_nearest_walkable_spot_with_danger_area, get_short_path_by_astar_with_danger_area
from util.map import lat_lon_array_binary_search
from database.mapdb import MapDB, get_mapdb
from repository.path import PathRepository
from repository.shelter import ShelterRepository
from database.emergencydb import EmergencyDB, get_emergencydb 
from datetime import datetime
import time

class EmergencyService:
    def __init__(self,map_db: MapDB = Depends(get_mapdb),
                 emergencydb:EmergencyDB=Depends(get_emergencydb),
                 path_repository:PathRepository = Depends(),
                 shelter_repository:ShelterRepository = Depends()):
        self.emergency_db=emergencydb
        self.path_repository=path_repository
        self.map_db=map_db
        self.shelter_repository=shelter_repository
        print("EmergencyService init")
    
    def update_emergency_data(self,danger_area:dict[str,float])->None:
        self.emergency_db.status=True
        self.emergency_db.occur_time=datetime.now()
        self.emergency_db.danger_area.update(danger_area)

        return 
    
    def get_path_from_gps_to_nearest_shelter(self,latitude:float,longitude:float):
        #비상상황이 아니라면 예외처리
        if not self.emergency_db.is_emergency():
            raise HTTPException(status_code=402, detail="현재는 비상상황이 아닙니다.")

        mapped_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(latitude,longitude))
        
        if mapped_gps_index==(-1,-1):
            raise HTTPException(status_code=404, detail="대전에 위치하지 않은 사용자입니다.")
        mapped_gps_spot=(mapped_gps_index[0]*5,mapped_gps_index[1]*5)

        standard=200

        if any(self.emergency_db.danger_area):
            #위험지역이 존재한다면 위험지역과 겹치지 않는 nearest_walkable_spot을 찾아야한다.
            danger_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(self.emergency_db.danger_area["latitude"],
                                                                             self.emergency_db.danger_area["longitude"]))
            danger_mapped_gps_index=(danger_gps_index[0]*5,danger_gps_index[1]*5)

            nearest_walkable_spot=get_nearest_walkable_spot_with_danger_area(self.map_db.binary_map,
                                                                             standard,mapped_gps_spot,
                                                                             danger_mapped_gps_index,
                                                                             self.emergency_db.radius)
        else:
            #장애물이 없다면 바로 변환
            nearest_walkable_spot=get_nearest_walkable_spot(self.map_db.binary_map,standard,mapped_gps_spot)

        if nearest_walkable_spot==(-1,-1):
            raise HTTPException(status_code=404, detail=f"도보로부터 너무 멀리 떨어져 있습니다.도보로부터 {standard}m 이내로 이동해주세요.")
        
        nearest_walkable_mapped_gps=self.map_db.gps_mapping[nearest_walkable_spot[0]//5][nearest_walkable_spot[1]//5]
        print("nearest_walkable_mapped_gps:",nearest_walkable_mapped_gps)
        path_document : PathDocument=self.path_repository.get_nearest_shelter_path(
                                                    latitude=nearest_walkable_mapped_gps[0],
                                                    longitude=nearest_walkable_mapped_gps[1],
                                                    )
        if path_document.isEmpty():
            raise HTTPException(status_code=404, detail="현 위치에서 3km이내의 대피소가 존재하지 않습니다.")
        
        shelter_info : ShelterInfoDocument =self.shelter_repository.get_shelter_by_shelter_id(shelter_id=path_document.shelter_id)

        if shelter_info.isEmpty():
            raise HTTPException(status_code=404, detail="해당 대피소는 존재하지 않습니다.")
        
        if any(self.emergency_db.danger_area):
            start_time = time.time()
            #장애물이 있다면 장애물이 입혀진 맵에서 최단경로 찾고 그 경로로 업데이트
            path_document.path=[]
            shelter_mapped_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(shelter_info.coordinates[1],shelter_info.coordinates[0]))

            shelter_mapped_gps_spot=(shelter_mapped_gps_index[0]*5,shelter_mapped_gps_index[1]*5)

            #장애물과 겹치지 않는 대피소와 가자 가까운 도보를 찾아야한다.
            nearest_shelter_walkable_spot=get_nearest_walkable_spot_with_danger_area(self.map_db.binary_map,
                                                                             standard,shelter_mapped_gps_spot,
                                                                             danger_mapped_gps_index,
                                                                             self.emergency_db.radius)
    
            short_index_path,distance=get_short_path_by_astar_with_danger_area(self.map_db.binary_map,
                                                                        nearest_walkable_spot,              
                                                                        nearest_shelter_walkable_spot,
                                                                        standard,
                                                                        danger_mapped_gps_index,
                                                                        self.emergency_db.radius
                                                                        )                                     
            #만약 short_index가 빈배열이라면 갈 수 없는 곳이므로 다음 대피소에 대하여 다시 돌려야하는 로직 추가해야한다.
            short_gps_path=list(map(lambda point:tuple(reversed(self.map_db.gps_mapping[point[0]//5][point[1]//5])),short_index_path))
            exist_set=set()
            result_path=[]
            for point in short_gps_path:
                if point in exist_set:
                    continue
                exist_set.add(point)
                result_path.append(point)
            path_document.path=result_path
            path_document.distance=distance
            end_time = time.time()
            print("================tacking path end================")
            print(f"spend time for a_star path : {end_time - start_time:.5f} sec")
        path_document.path.insert(0,[longitude,latitude])
        path_document.path.append(shelter_info.coordinates)
        print(list(map(lambda x: list(reversed(x)),path_document.path)))

        return path_document