
import heapq
import numpy as np
import math


x_offset=[0,0,1,-1,1,1,-1,-1]
y_offset=[1,-1,0,0,1,-1,1,-1]
INF = 1e8


#거리가 가장 가까운 walkable_spot 반환
def test_get_nearest_walkable_spot(map :np.ndarray,standard:int,start:tuple[int,int]) -> tuple[float,float]:
    print("========ready for variables==========")
    print(map.shape)
    #partial area의 영역 정하기
    x_up=max(start[0]-standard,0)
    x_down=min(start[0]+standard,len(map))
    y_left=max(start[1]-standard,0)
    y_right=min(start[1]+standard,len(map[0]))
    h=x_down-x_up
    w=y_right-y_left
    distance=np.full((h,w),INF,dtype=np.float64)
    print("========ready for variables end==========")
    heap = []
    heapq.heappush(heap,(0,*start))
    distance[start[0]-x_up][start[1]-y_left]=np.float64(0)
    cnt = 0
    while heap:
        dist,x,y=heapq.heappop(heap)

        cnt += 1
        if cnt % 100000 == 0:
            print(cnt)
        if(map[x][y]==1):
            return (x,y)
        if distance[x-x_up][y-y_left] < dist:
            continue

        for i in range(8):
            nx=x_offset[i]+x
            ny=y_offset[i]+y
            if not (x_up <= nx < x_down and y_left <= ny < y_right):
                continue
            next_distance=((nx-x)**2+(ny-y)**2)**(1/2)+dist
            if next_distance<distance[nx-x_up][ny-y_left]:
                distance[nx-x_up][ny-y_left]=np.float64(next_distance)
                heapq.heappush(heap,(next_distance,nx,ny))
    return (-1,-1)