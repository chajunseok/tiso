import math

def binary_search(numbers, key, index):
    left = 0
    right = len(numbers)-1
    while left <= right:
        mid = (left + right) // 2
        if key[index] == numbers[mid][index]:
            return mid
        elif key[index] < numbers[mid][index]:
            right = mid - 1
        elif key[index] > numbers[mid][index]:
            left = mid + 1
    if right == -1:
        return 0
    elif left == len(numbers):
        return len(numbers)-1
    else:
        right_number = numbers[left][index]
        left_number = numbers[right][index]
            
        right_abs = abs(key[index] - right_number)
        left_abs = abs(key[index] - left_number)
        if right_abs == left_abs:
            return left
        elif right_abs > left_abs: # next is closer
            return right
        elif right_abs < left_abs:
            return left

def linear_search(coord_list,key,start=None,end=None):
    min_distance=math.dist(coord_list[0][0],key)
    min_distance_index=(0,0)
    if start==None:
        start=0
    if end==None:
        end=len(coord_list)
    else:#end로 들어온 인자는 실제 인덱스이기 때문에 range연산에 넣어줄 땐 +1을 해야 그곳까지 본다
        end+=1
    for i in range(start,end):
        for j in range(len(coord_list[0])):
            cur_distance=math.dist(coord_list[i][j],key)
            if min_distance>cur_distance:
                min_distance=cur_distance
                min_distance_index=(i,j)
    return min_distance_index

