from fastapi import Depends
from database.mongo import get_mongo_client
from typing import List

class TipsRepository:
    def __init__(self,mongo_client=Depends(get_mongo_client)):
        self.client=mongo_client
        print("TipsRepository init")
        
    def get_tips(self, code: str) -> List[dict] :
        db = self.client['test']
        collection = db['tips']
        
        result = collection.find({"code": code})
        return result
        