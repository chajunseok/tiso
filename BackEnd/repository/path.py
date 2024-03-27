from fastapi import Depends
from database.mongo import get_mongo_client


class PathRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("PathRepository init")

    def get_path_info_by_shelter_id_and_gps(shelter_id : str , gps : tuple[float,float]):
        pass
