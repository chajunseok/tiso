from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key= os.environ.get('api_key'))

def analyze_text(input):
    response = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": f"'{input}'에서 대괄호 안에있는 것은 제외하고 위치만 추출해서 나열해줘"}],
        max_tokens=300
    )

    return response.choices[0].message.content

text = '[긴급] 금일 06:40경 장안면 독정리 677 공장에서 화재발생, 연기가 다량 발생하는 중이니 안전에 주의하여 주시기 바랍니다. [화성시]'
result = analyze_text(text)
print(result)