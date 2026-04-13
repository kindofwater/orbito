from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/game", methods = ["POST"])
def game_start() :
    return {}