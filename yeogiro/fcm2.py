import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging

# 프로젝트에서 발급받은 토큰
cred_path = "tiso-d135c-firebase-adminsdk-util1-cb19867e3d.json"
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# fcm 디바이스 토큰 (유저토큰)
registration_token = 'e7PWoj8QStGim3RYiBJKhI:APA91bGOQVPijGob_7XdBZODK0YwJbTv8p_c8nH4yA5QhqcJx7kcUBdnXHCpmyoq65MqkP1E2tu3vz7adyB5PIuexSwynGtgilf7rXeUdCriN8aSMZd8oI2nU_Vozc4_fk3-JUUbl94u'
message = messaging.Message(
    notification = messaging.Notification(
        title='ㅠㅡㅠ',
        body='ㅠㅠ'
    ),
    token=registration_token,
)

response = messaging.send(message)
print('Successfully sent message:', response)