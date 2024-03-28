from fastapi import Depends
from repository.odm import PathDocument
from database.mongo import get_mongo_client


class PathRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("PathRepository init")

    def get_path_info_by_shelter_id_and_gps(self,shelter_id : str , gps : tuple[float,float])->PathDocument:
        print(shelter_id,gps)
        ## mongo get
        query_result={
            "id":"asd",
            "path" : [[1,2],[3,4],[4,5],[6,7]],
            "distance" : "55.19035785"
        }

        path_document=PathDocument(data=query_result)
        return path_document
