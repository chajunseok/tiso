from pymongo.mongo_client import MongoClient
import certifi

host = 'j10b308.p.ssafy.io'
port = 27017
username = 'seobobabo'
password = 'seobobabo'
uri = f"mongodb://{username}:{password}@{host}:{port}/"

dbname = ''
client = MongoClient(uri)