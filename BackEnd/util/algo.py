
import heapq
import numpy as np
import math


x_offset=[0,0,1,-1,1,1,-1,-1]
y_offset=[1,-1,0,0,1,-1,1,-1]
INF = 1e8


#거리가 가장 가까운 walkable_spot 반환
def get_nearest_walkable_spot(map :np.ndarray,standard:int,start:tuple[int,int]) -> tuple[int,int]:
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

def get_nearest_walkable_spot_with_danger_area(map :np.ndarray,
                                               standard:int,
                                               start:tuple[int,int],
                                               danger_spot:tuple[int,int],
                                               danger_area_standard:int) -> tuple[int,int]:
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
        #갈수 있는 곳이 장애물의 범위를 벗어났을때
        if(map[x][y]==1 and math.dist((x,y),danger_spot)>danger_area_standard ):
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


# https://meticulousdev.tistory.com/entry/PYTHON-%ED%83%80%EC%9E%85-%ED%9E%8C%ED%8A%B8%EC%97%90%EC%84%9C-List%EC%99%80-list%EC%9D%98-%EC%B0%A8%EC%9D%B4
def get_short_path_by_astar_with_danger_area(
    map :np.ndarray, start: tuple[int,int], end: tuple[int,int],standard:int,danger_spot:tuple[int,int],danger_area_standard:int
) -> tuple[list[list[int,int]],float]:
    start=np.array(start,dtype=np.int64)
    end=np.array(end,dtype=np.int64)

    print(f"start:{start},end:{end}")
    print("========ready for variables==========")
    point_x_up=min(start[0],end[0])
    point_x_down=max(start[0],end[0])
    point_y_left=min(start[1],end[1])
    point_y_right=max(start[1],end[1])
    print(f"point_x_up:{point_x_up}")
    print(f"point_x_down:{point_x_down}")
    print(f"point_y_left:{point_y_left}")
    print(f"point_y_right:{point_y_right}")
    x_up=max(point_x_up-standard,0)
    x_down=min(point_x_down+standard,len(map))
    y_left=max(point_y_left-standard,0)
    y_right=min(point_y_right+standard,len(map[0]))

    print(f"x_up:{x_up}")
    print(f"x_down:{x_down}")
    print(f"y_left:{y_left}")
    print(f"y_right:{y_right}")
    
    h=x_down-x_up
    w=y_right-y_left

    print(f"h:{h},w:{w}")

    heuristic_cost : np.ndarray = np.full((h,w),INF,dtype=np.float64)
    total_cost_list : np.ndarray = np.full((h,w),INF,dtype=np.float64)
    path_map : np.ndarray= np.zeros((h,w,2),dtype=np.int64)

    for i in range(h):
        for j in range(w):
            if map[i+x_up][j+y_left]==1:
                heuristic_cost[i][j] = np.float64(round(get_euclidean_distance((i+x_up, j+y_left), end), 3))
    print("========ready for variables end==========")
    heap = []
    next_distance = 0
    total_cost_list[start[0]-x_up][start[1]-y_left]=np.float64(heuristic_cost[start[0]-x_up][start[1]-y_left]+next_distance)
    heapq.heappush(
        heap, (total_cost_list[start[0]-x_up][start[1]-y_left], *start)
    )
    cnt = 1
    while heap and not ((heap[0][1:]) == end).all():
        total_cost, x, y = heapq.heappop(heap)
        # Total Cost 에서 휴리스틱 코스트를 빼면 시작 지점에서 현재 지점까지의 실제 거리를 구할 수 있음
        if total_cost_list[x-x_up][y-y_left] < total_cost:  # 기존에 있는 거리보다 길다면, 볼 필요도 없음
            continue
        depth = total_cost - heuristic_cost[x-x_up][y-y_left]
        cnt += 1
        if cnt % 1000 == 0:
            print(cnt)
        # 유효한 인접 노드가 있으면 코스트를 계산해 힙에 넣는다.
        for i in range(8):
            nx = x + x_offset[i]
            ny = y + y_offset[i]
            next_distance = depth + ((nx - x) ** 2 + (ny - y) ** 2) ** (1 / 2)
            #분할지역에서 벗어나거나 벽이라면 끝
            if not (x_up <= nx < x_down and y_left <= ny < y_right) or map[nx][ny]==0:
                continue
            #위험지역안에 있다면 끝
            if math.dist((nx,ny),danger_spot)<danger_area_standard:
                continue
            total_cost=next_distance+heuristic_cost[nx-x_up][ny-y_left]
            #현재의 총 비용보다 절감할 수 있다면 그쪽으로 진행
            if total_cost < total_cost_list[nx-x_up][ny-y_left]:
                total_cost_list[nx-x_up][ny-y_left] = np.float64(total_cost)
                path_map[nx-x_up][ny-y_left] = (np.int64(x), np.int64(y))
                heapq.heappush(heap, (total_cost, nx, ny))
    short_path = []
    if total_cost_list[end[0]-x_up][end[1]-y_left].item()==INF:
        return (short_path, INF)
    distance = (total_cost_list[end[0]-x_up][end[1]-y_left] - heuristic_cost[end[0]-x_up][end[1]-y_left]).item()
    cur_x_y = end
    while not (cur_x_y == start).all():
        short_path.append(cur_x_y.tolist())
        x, y = cur_x_y
        cur_x_y = path_map[x-x_up][y-y_left]
    short_path.append(start.tolist())
    short_path.reverse()
    return (short_path, distance)


def get_euclidean_distance(pq1: int, pq2: int):
    p1, q1 = pq1
    p2, q2 = pq2

    return math.sqrt((p1 - p2) ** 2 + (q1 - q2) ** 2)