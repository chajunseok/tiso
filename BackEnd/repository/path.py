from fastapi import Depends
from pymongo import MongoClient
from database.pathdb import get_path_client
from repository.odm import PathDocument
import time

class PathRepository:
    def __init__(self,path_client : MongoClient =Depends(get_path_client)):
        self.path_client=path_client
        print("PathRepository init")

    def get_path_info_by_shelter_id_and_gps(self,shelter_id : str , latitude: float, longitude: float)->PathDocument:
        db = self.path_client['shelters']  # 사용할 데이터베이스 이름으로 교체
        collection = db['path']
        
        query = {
                "shelter_id": shelter_id,  # 샤딩 키 조건
                "start":[longitude,latitude]
            }
        start = time.time()
        query_result = collection.find_one(query)
        print(query_result)
        end = time.time()
        print(f"path find one: {end - start:.5f} sec")
    
        #아래부분은 수동매핑에서 자동매핑으로 바꿔야한다.
        if query_result != None:
            return PathDocument(data=query_result)
        return PathDocument(data={})

    def get_nearest_shelter_path(self, latitude: float, longitude: float)->PathDocument:
        db = self.path_client['shelters']  # 사용할 데이터베이스 이름으로 교체
        collection = db['path']
        
        #갈 수 있는 대피소 중에서 경로길이가 가장 짧은 경로 하나만 뽑아오기
        query = [
            { "$match":{"start": [longitude, latitude]}},
            { "$sort":{  "distance": 1 } }
        ]

        start = time.time()
        query_result =list(collection.aggregate(query))
        end = time.time()
        print(f"path find nearest one: {end - start:.5f} sec")
        #아래부분은 수동매핑에서 자동매핑으로 바꿔야한다.
        if len(query_result)!=0:
            return PathDocument(data=query_result[0])
        return PathDocument(data={})