import pickle
import os

resource_dir=f"{os.getcwd()}/resource"
binary_map_zip_path = f"{resource_dir}/binary_map.zip"
gps_mapping_zip_path = f"{resource_dir}/gps_mapping.zip"
binary_map_path = f"{resource_dir}/binary_map.pkl"
gps_mapping_path = f"{resource_dir}/gps_mapping.pkl"

print(binary_map_zip_path)
class mapDB:
    def __init__(self):
        self.binary_map=None
        self.gps_mapping=None

    def load(self):
        print("==========================mapDB=========================")
        print("""
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣶⣶⣾⣿⣿⣿⣿⣿⣶⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⠿⠛⠋⠉⠁⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠿⣿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⢟⣩⣤⣤⣴⣶⣶⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⡅⠀⣼⣿⠿⠟⠛⠩⠤⠄⠀⠀⠀⢀⣴⣾⠿⣷⣤⣀⣴⣆⣀⣹⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⠟⣩⣬⡉⠁⠀⠀⠀⠀⠀⠀⠀⠀⢠⢶⡄⢀⣍⣉⣉⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⣿⣧⣠⣿⡿⢷⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣵⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡿⠟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣶⣿⠟⠋⠻⣿⣿⣿⣿⣉⣙⣿⡏⠹⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣛⣥⣶⣾⣄⠋⠈⠃⠙⠻⢿⣿⣿⣄⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⡏⢁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢻⣿⣿⣾⡟⠛⢿⣿⣿⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣧⡀⠛⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⢻⣿⣿⠏⠀⠈⣿⣿⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⡏⢳⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣁⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣟⡁⠀⠀⠀⠘⣿⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣷⢰⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠛⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠸⣿⡎⠹⣿⣿⣿⣿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⢰⣿⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢻⣿⡄⢹⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⢠⣿⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⣿⡄⢻⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠟⣰⠆⠀⠀⢠⣿⡟⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣮⣿⣿⣿⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⠃⠀⠋⠀⠀⣴⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⡿⠟⠁⠀⠀⠀⣠⣾⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⣠⣴⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣶⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣶⣿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠿⠿⢿⣿⣿⣿⣿⡿⠿⠿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        """)
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
            self.binary_map = pickle.load(f)
            print("gps매핑의 로딩이 완료되었습니다.")
        print("==========================mapDB=========================")

    def close(self):
        pass

mapdb=mapDB()

def get_mapdb():
    return mapdb
    
