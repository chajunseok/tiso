from pymongo.mongo_client import MongoClient
import certifi

host = 'j10b308.p.ssafy.io'
port = 27017
username = 'seobobabo'
password = 'seobobabo'
uri = f"mongodb://{username}:{password}@{host}:{port}/"

class MongoDB:
    def __init__(self):
        self.client = None

    def connect(self):
        self.client=MongoClient(uri)
        print("DB 와 연결되었습니다.")
    
    def close(self):
        self.client.close()
        print("DB연결이 해제되었습니다.")

mongodb = MongoDB()

def get_mongo_client():
    return mongodb.client

    