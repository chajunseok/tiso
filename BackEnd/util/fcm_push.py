import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
import os
# 프로젝트에서 발급받은 토큰
cred_path = f"{os.getcwd()}/util/tiso-d135c-firebase-adminsdk-util1-47189378e4.json"
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# fcm 디바이스 토큰 (유저토큰)
registration_tokens = [
    'e7PWoj8QStGim3RYiBJKhI:APA91bGOQVPijGob_7XdBZODK0YwJbTv8p_c8nH4yA5QhqcJx7kcUBdnXHCpmyoq65MqkP1E2tu3vz7adyB5PIuexSwynGtgilf7rXeUdCriN8aSMZd8oI2nU_Vozc4_fk3-JUUbl94u',  # 첫 번째 사용자의 디바이스 토큰
    # 'di0lTaRRTpCMztW7VO8y7V:APA91bGs3-H5UmBITQwOgbKz2WuIExzzRcEXusvebK4qYbl2n4Vhi-rRclmh98MVv_vPDDAOXydh_XR0RIVGxXZEvkAKiUsUfDC6PJ3R8IOCGFF3zJgMRFGZUMe5edfYYepWA_A8GXye',  # 두 번째 사용자의 디바이스 토큰
    # 이하 추가 유저 토큰
]

for user_token in registration_tokens:
    message = messaging.Message(
        notification = messaging.Notification(
            title='재난상황 발생',
            body='재난상황이 발생했으므로 빠르게 대피하시기 바랍니다.'
        ),
        token=user_token
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)
    