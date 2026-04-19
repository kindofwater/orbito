from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import uuid
import util

app = Flask(__name__)
CORS(app, supports_credentials=True)

games = {}
Error_log = []

@app.route("/")
def home():
    return

@app.route("/game", methods=["POST"])
def game():
    try:
        session_id = str(uuid.uuid4())
        games[session_id] = util.Board()
        response = make_response(jsonify({"success" : True}))
        response.set_cookie("session_id", session_id, samesite="Lax") 
    except:
        session_id = str(uuid.uuid4())
        games[session_id] = util.Board()
        response = make_response(jsonify({"success" : False}))
        print("There is *** Error in Post /game! and Logged")
        Error_log.append({"type" : "sessionID_Addition_failure"})
    finally :
        return response


@app.route("/game", methods=["GET"])
def BoardCall():
    status = []
    try:
        session_id = request.cookies.get("session_id")
        target = games[session_id]
        for i in range(4) :
            for j in range(4) :
                status.append(target.get_Board(i,j))
        response= make_response(jsonify({"success" : True,
                                         "board" : status,}))
    except:
        session_id = request.cookies.get("session_id")
        target = games[session_id]
        response = make_response(jsonify({"success" : False}))
        print("There is *** Error in GET /game and Logged")
        Error_log.append({"type" : "SessionID_Finding_Failure"}) 
    finally:
        return response

if __name__ == "__main__" :
    app.run(debug=True)