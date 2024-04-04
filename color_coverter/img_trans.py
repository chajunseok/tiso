import cv2
import numpy as np

x_min = 55941
y_min = 25643
x_max = 55975
y_max = 25675
    
arr = [x_min, x_max, y_min, y_max]

i = arr[0]
j = arr[2]

while (j < arr[3] + 1) :
    i = arr[0]
    while (i < arr[1] + 1):
        # 이미지 파일 읽어오기
        image = cv2.imread(f'images/total/{i}_{j}.png', cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        bgr = image[:,:,0:3]

        # BGR 형태로 국도 및 주요도로의 색깔 범위를 정의
        lower_yellow = np.array([236, 215, 146])
        upper_yellow = np.array([253, 240, 181])

        bgr_new = bgr.copy()
        # 정의한 색상 범위에 해당하는 부분을 하얀색으로 변경
        mask = cv2.inRange(image, lower_yellow, upper_yellow)
        bgr_new[mask != 0] = [255, 255, 255]

        # 결과 이미지 저장
        bgr_new = cv2.cvtColor(bgr_new, cv2.COLOR_RGB2BGR)
        cv2.imwrite(f'images/color/{i}_{j}.png', bgr_new)
        
        i += 1
        
    j += 1
