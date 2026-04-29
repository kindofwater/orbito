from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import uuid
import util

import atexit

app = Flask(__name__)
CORS(app, supports_credentials=True)

games = {}
Error_log = []

def save_error_log():
    if Error_log:
        with open("error_log.txt", "w") as f:
            for log in Error_log:
                f.write(str(log) + "\n")
        print("Error log saved to error_log.txt")
    else:
        print("No errors to log.")

atexit.register(save_error_log)

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
        id = target.get_player_id()
        for i in range(4) :
            for j in range(4) :
                status.append(target.get_Board(i,j))
        success = True
    except Exception as e:
        success = False
        id = None
        print("There is *** Error in GET /game and Logged")
        Error_log.append({"type" : e}) 
    finally:
        response= make_response(jsonify({"success" : success,
                                         "board" : status,
                                         "turn" : id}))
        return response

@app.route("/addition", methods=["POST"])
def addition():
    data = request.get_json()
    index = data.get("index")
    session_id = request.cookies.get("session_id")
    index_col, index_row = index // 4, index % 4
    try :
        games[session_id].set_Board(index_col, index_row, 
                                    games.get(session_id).get_player_id())
        success = True
    except Exception as e:
        success = False
        print("There is *** Error in POST /addition and Logged")
        Error_log.append({"type" : e}) 
    finally :
        response = make_response(jsonify({"success" : success,}))
    
    return response

@app.route("/Moving", methods=["POST"])
def Moving():
    data = request.get_json()
    From, To = data.get("From"), data.get("To")
    session_id = request.cookies.get("session_id")
    From_col, From_row = From//4, From%4
    To_col, To_row = To//4, To%4
    try :
        games[session_id].set_Board(From_col, From_row, 0)
        games[session_id].set_Board(To_col, To_row, 
                                    3 - games.get(session_id).get_player_id())
        success = True
    except Exception as e:
        success = False
        print("There is *** Error in POST /Moving and Logged")
        Error_log.append({"type" : e}) 
    finally :
        response = make_response(jsonify({"success" : success,}))
    
    return response

@app.route("/wincheck", methods=["GET"])
def wincheck():
    session_id = request.cookies.get("session_id")
    status = []
    try :
        games[session_id].Button()
        winner = games[session_id].wincheck()
        games[session_id].change_player_id()
        success = True
    except Exception as e:
        success = False
        print("There is *** Error in POST /addition and Logged")
        Error_log.append({"type" : e}) 
    finally :
        for i in range(4) :
            for j in range(4) :
                status.append(games[session_id].get_Board(i,j))
        response = make_response(jsonify({"success" : success,
                                          "winner" : winner,
                                          "Board" : status}))
    return response
    # should change player_id 

if __name__ == "__main__" :
    app.run(debug=True)
    