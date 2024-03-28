from pymongo.mongo_client import MongoClient
from resource.logo import pathdb_logo
from typing import Optional

host = 'j10b308a.p.ssafy.io'
port = 60000
uri = f"mongodb://{host}:{port}/"

class PathDB:
    def __init__(self):
        self.client : Optional[MongoClient] = None

    def connect(self):
        print("==========================PathDB=========================")
        print(pathdb_logo)
        self.client=MongoClient(uri)
        print("PathDB 와 연결되었습니다.")
        print("==========================PathDB=========================")
    
    def close(self):
        print("==========================PathDB=========================")
        self.client.close()
        print("PathDB 해제되었습니다.")
        print("==========================PathDB=========================")

pathdb = PathDB()

def get_path_client():
    print("pathdb_client 로딩")
    return pathdb.client

    