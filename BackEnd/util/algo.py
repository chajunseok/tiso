
import heapq
import numpy as np
import math


x_offset=[0,0,1,-1,1,1,-1,-1]
y_offset=[1,-1,0,0,1,-1,1,-1]
INF = 1e8


#거리가 가장 가까운 walkable_spot 반환
def get_nearest_walkable_spot(map :list[list[int]],start:tuple):
    print("========ready for variables==========")
    w=len(map[0])
    h=len(map)
    distance=np.full_like(map,INF,dtype=np.float64)
    print("========ready for variables end==========")

    heap = []
    heapq.heappush(heap,(0,*start))
    distance[start[0]][start[1]]=np.float64(0)
    cnt = 0
    while heap:
        dist,x,y=heapq.heappop(heap)

        cnt += 1
        if cnt % 100000 == 0:
            print(cnt)
        if(map[x][y]==1):
            return (x,y)
        if distance[x][y] < dist:
            continue

        for i in range(8):
            nx=x_offset[i]+x
            ny=y_offset[i]+y
            if not (0 <= nx < h and 0 <= ny < w):
                continue
            next_distance=((nx-x)**2+(ny-y)**2)**(1/2)+dist
            if next_distance<distance[nx][ny]:
                distance[nx][ny]=np.float64(next_distance)
                heapq.heappush(heap,(next_distance,nx,ny))
    return (-1,-1)