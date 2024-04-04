from pymongo.mongo_client import MongoClient
from resource.logo import mongodb_logo
from typing import Optional

host = 'j10b308.p.ssafy.io'
port = 27017
username = 'seobobabo'
password = 'seobobabo'
uri = f"mongodb://{username}:{password}@{host}:{port}/"

class MongoDB:
    def __init__(self):
        self.client : Optional[MongoClient] = None

    def connect(self):
        print("==========================MongoDB=========================")
        print(mongodb_logo)
        self.client=MongoClient(uri)
        print("mongoDB 와 연결되었습니다.")
        print("==========================MongoDB=========================")
    
    def close(self):
        print("==========================MongoDB=========================")
        self.client.close()
        print("mongoDB연결이 해제되었습니다.")
        print("==========================MongoDB=========================")

mongodb = MongoDB()

def get_mongo_client():
    print("mongo_client 로딩")
    return mongodb.client

    