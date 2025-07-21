from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#https://youtu.be/03r7sloAyOY?si=Ztc2Vl3CZQnn_iks

#input 종류마다 app.route하여 경로 설정
#input 종류 확실히 하고 그것만 react에서 받아오면 될듯

#cloud 어디에 올릴지 고민해봐야할듯
@app.route('/api/select', methods=['POST'])
def select():
    data = request.json
    print(f"클릭한 위치: 행={data['row']}, 열={data['col']}")
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(port=5000)
