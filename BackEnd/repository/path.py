from fastapi import Depends
from database.pathdb import get_path_client
from repository.odm import PathDocument
import time

class PathRepository:
    def __init__(self,path_client=Depends(get_path_client)):
        self.path_client=path_client
        print("PathRepository init")

    def get_path_info_by_shelter_id_and_gps(self,shelter_id : str , latitude: float, longitude: float)->PathDocument:
        db = self.path_client['shelters']  # 사용할 데이터베이스 이름으로 교체
        collection = db['path']
        
        query = {
                "shelter_id": shelter_id,  # 샤딩 키 조건
                "geometry.geometries": {  # 공간 쿼리 조건
                    "$elemMatch": {
                        "type": "Point",
                        "coordinates": [longitude,latitude]
                    }
                }
            }
        start = time.time()
        query_result = collection.find_one(query)
        end = time.time()
        print(f"path find one: {end - start:.5f} sec")
        # print(query_result)
        #아래부분은 수동매핑에서 자동매핑으로 바꿔야한다.
        if query_result != None:
            temp_dict={
                "shelter_id":shelter_id
            }
            temp_dict.update(query_result["geometry"]["geometries"][1])
            temp_dict.update(query_result["properties"])
            return PathDocument(data=temp_dict)
        return PathDocument(data={})
