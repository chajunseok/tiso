from selenium import webdriver

def screenshot(arr):
    i = arr[0]
    j = arr[2]
    
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("headless")
    chrome_options.add_argument("window-size=512x512")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("disable-gpu")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    while(j < arr[3] + 1):
        i = arr[0]
        while(i < arr[1] + 1):
            url = 'https://map.pstatic.net/nrb/styles/basic/1709196067/16/%s/%s@2x.png?mt=bg.ol.sw' % (str(i), str(j))
            driver.get(url)
            filename = './images/total/%s_%s.png' % (str(i), str(j))
            driver.save_screenshot(filename)
            print("save %s_%s.png" % (str(i), str(j)))
            
            i = i + 1
            
        j = j + 1

def start():
    x_min = 55941
    x_max = 55975
    y_min = 25643
    y_max = 25675
    
    # 이미지 타일의 x, y 시작점과 끝점
    arr = [x_min, x_max, y_min, y_max]
    screenshot(arr)

if __name__ == "__main__":
    start()