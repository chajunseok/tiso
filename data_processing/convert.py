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

