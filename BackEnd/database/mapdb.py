import pickle
import os
import gc
import psutil
from resource.logo import mapdb_logo
import numpy as np
from typing import Optional

resource_dir=f"{os.getcwd()}/resource"
binary_map_zip_path = f"{resource_dir}/binary_map.zip"
gps_mapping_zip_path = f"{resource_dir}/gps_mapping.zip"
binary_map_path = f"{resource_dir}/binary_map.pkl"
gps_mapping_path = f"{resource_dir}/gps_mapping.pkl"

class mapDB:
    def __init__(self):
        self.binary_map : Optional[np.ndarray] = None
        self.gps_mapping : Optional[list] = None

    def load(self):
        print("==========================mapDB=========================")
        print(mapdb_logo)
        if not os.path.isfile(binary_map_zip_path):
            raise Exception("binary_map_zip_file is not exist!!!!")
        if not os.path.isfile(gps_mapping_zip_path):
            raise Exception("gps_mapping_zip_path is not exist!!")
        
        if not os.path.isfile(binary_map_path):
            print("이진맵의 압축을 해제중입니다.........")
            os.system("unzip "+binary_map_zip_path+" -d "+resource_dir)
            print("이진맵의 압축을 해제하였습니다.")

        if not os.path.isfile(gps_mapping_path):
            print("gps매핑의 압축을 해제중입니다.........")
            os.system("unzip "+gps_mapping_zip_path+" -d "+resource_dir)
            print("gps매핑의 압축을 해제하였습니다.")

        with open(binary_map_path, 'rb') as f:
            print("이진맵을 로딩중입니다........")
            self.binary_map = pickle.load(f)
            print("이진맵의 로딩이 완료되었습니다.")

        with open(gps_mapping_path, 'rb') as f:
            print("gps매핑을 로딩중입니다.......")
            self.gps_mapping = pickle.load(f)
            print("gps매핑의 로딩이 완료되었습니다.")
        print("==========================mapDB=========================")

    def close(self):
        print("==========================mapDB=========================")
        before_memory=psutil.virtual_memory().used/1000000
        del self.binary_map
        del self.gps_mapping
        gc.collect()
        after_memory=psutil.virtual_memory().used/1000000
        print("로드된 mapDB이 해제되었습니다.")
        print(f"{int(before_memory-after_memory)}MB was released")
        print("==========================mapDB=========================")

mapdb=mapDB()

def get_mapdb():
    return mapdb
    
