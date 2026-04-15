from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import uuid
import util

app = Flask(__name__)
CORS(app, supports_credentials=True)

games = {}
Error_log = []

# @app.route("/")
# def home():
#     return

@app.route("/game", methods=["POST"])
def game():
    try:
        session_id = str(uuid.uuid4())
        games[session_id] = {"board" : util.Board()}
        response = make_response(jsonify({"success" : True}))
    except:
        session_id = str(uuid.uuid4())
        games[session_id] = {"board" : util.Board()}
        response = make_response(jsonify({"success" : False}))
        print("There is *** Error in Post /game! and Logged")
        Error_log.append({"type" : "session_id_failure"})
    finally :
        response.set_cookie("session_id", session_id, samesite="None")
        return response

if __name__ == "__main__" :
    app.run(debug=True)
