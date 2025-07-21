from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/select', methods=['POST'])
def select():
    data = request.json
    print(f"클릭한 위치: 행={data['row']}, 열={data['col']}")
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(port=5000)