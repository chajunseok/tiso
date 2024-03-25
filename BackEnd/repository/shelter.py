from fastapi import Depends
from pymongo import MongoClient
from database.mongo import get_client

class ShelterRepository:
    def __init__(self,client:MongoClient=Depends(get_client)):
        self.client=client
        print("ShelterRepository init")
