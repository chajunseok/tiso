import numpy as np
import pathlib
from prepare_maps import get_binary_map, get_coordinate_gps_mapping, get_shelter_index
from pre_processing import make_binary_txt_from_image
import os
from djMap import get_short_path_by_dijkstra
import time
import pickle
import multiprocessing
import subprocess


INF = 1e8

def createFolder(directorys: list):
    try:
        for directory in directorys:
            if not os.path.exists(directory):
                os.makedirs(directory)
    except OSError:
        print("Error: Creating directory. " + directory)

image_dir = f"{os.getcwd()}/maps"
binary_dir = f"{os.getcwd()}/binarys"
path_dir = f"{os.getcwd()}/path"
union_binary_map_dir=f"{os.getcwd()}/union_binary_map"
walkable_spot_dir=f"{os.getcwd()}/walkable_spot"

def make_short_path(binary_map,gps_mapping_list,walkable_spot_np_list,shelter_id,start):
    start_time = time.time()
    path_map,distance=get_short_path_by_dijkstra(binary_map,start)

    end_time = time.time()
    print(f"dj spend time for extract path_map : {end_time - start_time:.5f} sec")

    print(f"================{start} tacking path start================")
    start_time = time.time()
    result=dict()
    for end in walkable_spot_np_list:
        if (start==end).all():
            continue
        start_to_end_distance = distance[end[0]][end[1]].item()
        if start_to_end_distance == INF:
            continue
        short_path = []
        cur_x_y = end
        while not (start==cur_x_y).all():
            short_path.append(cur_x_y)
            x, y = cur_x_y
            cur_x_y = path_map[x][y]
        short_path.append(start)
        (end_lat,end_long)=gps_mapping_list[end[0]//5][end[1]//5]

        # 위도 경도로 저장
        short_path=list(map(lambda point:tuple(gps_mapping_list[point[0]//5][point[1]//5]),short_path))
        exist_set=set()
        insert_short_path=[]
        for point in short_path:
            if point in exist_set:
                continue
            exist_set.add(point)
            insert_short_path.append(point)

        result[f"{end_lat}_{end_long}_to_{shelter_id}"]={
            "path":insert_short_path,
            "distance":start_to_end_distance
        }
    end_time = time.time()
    print("================tacking path end================")
    print(f"spend time for tacking path : {end_time - start_time:.5f} sec")

    with open(f"{path_dir}/{shelter_id}.pkl", 'wb') as f:
        pickle.dump(result, f)

