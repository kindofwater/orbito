from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Hello world"}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")

    return {"received": username}

if __name__ == "__main__" :
    app.run(debug=True)
