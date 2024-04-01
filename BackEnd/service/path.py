from fastapi import Depends
from repository.shelter import ShelterRepository
from repository.path import PathRepository
from util.algo import get_nearest_walkable_spot
from repository.odm import PathDocument, ShelterInfoDocument
from database.mapdb import MapDB, get_mapdb
from util.map import lat_lon_array_binary_search
from fastapi import HTTPException
from bson.objectid import ObjectId
import time
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_KEY = os.getenv('NAVER_CLIENT_KEY')
SECRET_KEY = os.getenv('NAVER_SECRET_KEY')

class PathService:
    def __init__(self,path_repository:PathRepository = Depends(),shelter_repository:ShelterRepository = Depends(),map_db: MapDB = Depends(get_mapdb)):
        self.path_repository=path_repository
        self.map_db=map_db
        self.shelter_repository=shelter_repository
        print("PathService init")

    async def get_path_from_gps_to_shelter(self,latitude:float,longitude:float,shelter_id:str)->PathDocument:
        mapped_gps_index=lat_lon_array_binary_search(self.map_db.gps_mapping,(latitude,longitude))
        
        if mapped_gps_index==(-1,-1):
            raise HTTPException(status_code=404, detail="대전에 위치하지 않은 사용자입니다.")

        start = time.time()
        #gps매핑배열은 지도배열을 5배 축소한것입니다.
        mapped_gps_index=(mapped_gps_index[0]*5,mapped_gps_index[1]*5)

        standard=100    

        nearest_walkable_spot=get_nearest_walkable_spot(self.map_db.binary_map,standard,mapped_gps_index)
        end = time.time()
        print(f"gps mapping and find nearest walkable spot: {end - start:.5f} sec")

        if nearest_walkable_spot==(-1,-1):
            raise HTTPException(status_code=404, detail=f"도보로부터 너무 멀리 떨어져 있습니다.도보로부터 {standard}m 이내로 이동해주세요.")
        
        shelter_info : ShelterInfoDocument =self.shelter_repository.get_shelter_by_shelter_id(shelter_id=shelter_id)

        if shelter_info.isEmpty():
            raise HTTPException(status_code=404, detail="해당 대피소는 존재하지 않습니다.")
            
        nearest_walkable_mapped_gps=self.map_db.gps_mapping[nearest_walkable_spot[0]//5][nearest_walkable_spot[1]//5]
        
        path_document : PathDocument =self.path_repository.get_path_info_by_shelter_id_and_gps(
                                                                                                shelter_id=shelter_id ,
                                                                                                latitude=nearest_walkable_mapped_gps[0],
                                                                                                longitude=nearest_walkable_mapped_gps[1],
                                                                                            )
        
        if path_document.isEmpty():
            shelter_lng = shelter_info.coordinates[0]
            shelter_lat = shelter_info.coordinates[1]
            
            # print(latitude, longitude, shelter_lat, shelter_lng)
            # await self.naver_service(latitude, longitude, shelter_lat, shelter_lng)
            path, distance = await self.naver_service(latitude, longitude, shelter_lat, shelter_lng)
            return PathDocument(data={"_id":ObjectId(shelter_id),
                                "shelter_id":shelter_id,
                                "path":path,
                                "start":[latitude, longitude],
                                "distance":float(distance)}
                                )
            
            # raise HTTPException(status_code=404, detail="현 위치에서 3km이내의 대피소가 존재하지 않습니다.")
        path_document.path.insert(0,[longitude,latitude])
        path_document.path.append(shelter_info.coordinates)
        return path_document
    
    
    async def naver_service(self, s_lat: float, s_lng: float, e_lat: float, e_lng: float):
        url_path =f"https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start={s_lng},{s_lat}&goal={e_lng},{e_lat}"
        url_req = url_path.replace(",", "%2C").replace("|", "%7C")
        
        async with httpx.AsyncClient() as client:
                headers = {
                "X-NCP-APIGW-API-KEY-ID": CLIENT_KEY,
                "X-NCP-APIGW-API-KEY": SECRET_KEY
                }
                try:
                        response = await client.get(url_req, headers=headers)
                        response.raise_for_status()
                        resp_data = response.json()
                        # print(resp_data)
                        path = resp_data['route']['traoptimal'][0]['path']
                        distance = resp_data['route']['traoptimal'][0]['summary']['distance']
                        print(path)
                        return path, distance
                
                except httpx.HTTPStatusError as exc:
                # 서버에서 4XX나 5XX 응답을 반환했을 때 예외 처리
                        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))