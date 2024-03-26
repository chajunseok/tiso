from fastapi import Depends
from database.mongo import get_mongo_client


class ShelterRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("ShelterRepository init")
