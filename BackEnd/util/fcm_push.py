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
    'eUJ8PLuuS3OI0fzbc9UWbE:APA91bHNbUTTRPnBdl0dNB7YxAAmnvXAaDbr4S8jzJPzJmhPCOmxatslw1TDDQqmIyGM-r1L1X148a6r0grsRc3jDk30MuzWa4P5YEQqLTvWXgxFzwLAJCVeP3qiaT4Cq1s258Lo9MgZ',  # 첫 번째 사용자의 디바이스 토큰
    # 'di0lTaRRTpCMztW7VO8y7V:APA91bGs3-H5UmBITQwOgbKz2WuIExzzRcEXusvebK4qYbl2n4Vhi-rRclmh98MVv_vPDDAOXydh_XR0RIVGxXZEvkAKiUsUfDC6PJ3R8IOCGFF3zJgMRFGZUMe5edfYYepWA_A8GXye',  # 두 번째 사용자의 디바이스 토큰
    # 이하 추가 유저 토큰
]

def alarm(test_title,test_body):
    for user_token in registration_tokens:
        message = messaging.Message(
            notification = messaging.Notification(
                title=test_title,
                body=test_body
            ),
            token=user_token
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)
    