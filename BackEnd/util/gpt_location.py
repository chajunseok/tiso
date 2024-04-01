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
