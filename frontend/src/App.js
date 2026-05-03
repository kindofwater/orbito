import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Exp1 from "./1.gif"
import Exp2 from "./2.gif"
import Exp3 from "./3.gif"
import Toast from "./Toast"

let button_array = [1,2,3,7, 0, 6, 10, 11, 4, 5, 9, 15, 8, 12, 13, 14]

function App() {
  const fromRef= useRef(null)
  const ToRef = useRef(null)
  const Newarray = Array(16).fill(0);
  const [gameState, setgameState] = useState("Start");
  const [NextState, setNextState] = useState(null)
  const [showModal, setshowModal] = useState(false);
  const [HeaderMsg, setHeaderMsg] = useState("오르비토에 오신 것을 환영함!")
  const [Boardstate, setBrdState] = useState(Newarray)
  const [StateButtonText, setStBtnTxt] = useState("Game Start!")
  const [fixedIndex, setFixedIndex] = useState(null);
  // const [BtnAct, setBtnActive] = useState(true);
  const [clickMode, setClickMode] = useState("none");
  const [toast, setToast] = useState(null);
  const [Btnmisclickmsg, SetBMSCMsg] = useState(null);
  const [Animestate, SetAnimestate] = useState(false);
  const [turning, Setturn] = useState(1);


  useEffect(()=>{ // for the animation
      setshowModal(true);
    },[]);



  useEffect(() => {
      if(gameState === "Start"){
        setNextState("Post_Game")
      }else if (gameState === "Post_Game") {
        Post_Game({setToast}).then((success) => {
          if (success) {
            setNextState("Addition")
            setHeaderMsg("첫 턴이니까, 돌 옮기기는 스킵됨.");
            setStBtnTxt("ㅇㅋ")
            /// wait 2 seconds, how about button filling motion? with acceleration
          } else {
            setHeaderMsg("Failed to fetch, check your server");
            setNextState(gameState)
            setStBtnTxt("Try again")
          }
        });
      }else if (gameState === "Before_Moving"){
        SetAnimestate(false)
        setFixedIndex(null)
        Getboard({setToast})
        .then(({success, board, turn})=>{
          if(success) {
            // let the board display!
            ///
//             setBtnActive(false)
            SetBMSCMsg("상대 구슬을 고르셈!")
            setHeaderMsg(`옮기기 차례, 옮기고 싶은 상대 공을 고르셈, ${turn === 1 ? "백 차례임.":"흑 차례임."}`)
            setBrdState(board)
            setStBtnTxt("했음")             
            setNextState("WhereTo_Moving")
            setClickMode("Move")
            Setturn(turn)

          }
          else{
            setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }
        })
      }else if (gameState === "WhereTo_Moving"){
        fromRef.current = fixedIndex
        setFixedIndex(null)
//         setBtnActive(false)
        SetBMSCMsg("상대 거를 어디 놓을 지 고르셈!")
        setHeaderMsg(`ㅇㅋ, 이제 그 돌을 어디에 놓을지 고르셈`)
        setStBtnTxt("했음")
        setNextState("Moving_Confirm")
        setClickMode("Add")

      }else if (gameState === "Moving_Confirm"){
        ToRef.current = fixedIndex
        setClickMode("none")
        Post_Moving({ From: fromRef.current, To: ToRef.current, setToast })
        .then((success)=>{
          if(success){
            setgameState("Addition")
          }else{
            setHeaderMsg("Failed to fetch, check with your server")
            setStBtnTxt("Try again")
            setNextState("Before_Moving")
          }
        })
      }else if (gameState === "Addition"){
        
        setFixedIndex(null)
        Getboard({ setToast })
        .then(({success, board, turn})=>{
          if(success) {
            // let the board display!
            ///
            setHeaderMsg(`이제 님 구슬을 놓을 차례, 어디 둘 지 고르셈, ${turn === 1 ? "백 차례임.":"흑 차례임."}`)
//             setBtnActive(false)
            SetBMSCMsg("어디 둘지 먼저 골라야 할 거 아잉교!")
            setClickMode("Add")
            setNextState("Addition_confirm")
            setBrdState(board)
            setStBtnTxt("했음") /// we need to consider deactivate button
            //  till user select their place to put marble
            
            // Is it good to POST in here?
            // Nope I don't think so
          }
          else{
            setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }})
      }else if (gameState === "Addition_confirm"){
          setClickMode("none")
          Post_Addition({ fixedIndex, setToast })
          .then((success)=>{
            if(success){
              setgameState("Before_Button")
            }else{
              setHeaderMsg("Failed to fetch, check with your server")
              setStBtnTxt("Try again")
              setNextState(gameState)
            }
          })
      }else if (gameState === "Before_Button"){
        Getboard({ setToast })
        .then(({success, board})=>{
          if(success) {
            // let the board display!
            ///
            setHeaderMsg("ㅇㅋ, 이제 버튼을 누르겠음.")
            setNextState("Wincheck")
            setBrdState(board)
            setStBtnTxt("OK!") /// we need to consider deactivate button
            //  till user select their place to put marble
            
            // Is it good to POST in here?
            // Nope I don't think so
          }
          else{
            setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }
        })
        /// auto play
        ///GET
      }else if (gameState === "Wincheck"){
        Get_Win({ setToast })
        .then(({success, winner, Board})=>{
          if(success){

            //// 여기서 다음 보드 정보를 어떻게 넘기면, 이 div가 어느 좌표로 이동하게 해야함...
            SetAnimestate(true)
            setBrdState(Board)
            if(winner === 0){
              setHeaderMsg("계속 ㄱㄱ")
              setNextState("Before_Moving")
              setStBtnTxt("ㅇㅋ")
            }
            else if (winner === 1){

              setHeaderMsg("백 승!!!!!! ㅊㅋ")
              setNextState("Start")
              setStBtnTxt("Try again")
              panpare();
            }
            else if (winner === 2){
              setHeaderMsg("흑 승!!!! ㅊㅋ")
              setNextState("Start")
              setStBtnTxt("Try again")
              panpare();
            }
            else if (winner === 3){
              setHeaderMsg("비김, 다시 하실?")
              setNextState("Start")
              setStBtnTxt("Try again")
              panpare();
            }
          } else{
            setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }
        })
      }
      else{
        
      }
    }, [gameState]);

    return(
    <GameScreen
    StateButtonClick={()=>{
      if(gameState === "Before_Moving" || gameState === "WhereTo_Moving" 
        || gameState === "Addition"){
        if(fixedIndex !== null){
          setgameState(NextState)
        }
        else{
          setToast(Btnmisclickmsg)
        }
      }
      else{
        setgameState(NextState)
      }
    }}
    StateButtonText = {StateButtonText}
    HeaderMsg={HeaderMsg}
//    setBtnActive={setBtnActive}

    // Conditional Button Active
//    BtnAct={BtnAct}
    Animestate={Animestate}
    
    // For the Start Screen
    showModal={showModal}
    onCloseModal={()=>{setshowModal(false)}}
    // board state update needed
    Boardstate={Boardstate}
    fixedIndex={fixedIndex}
    setFixedIndex={setFixedIndex}
    clickMode={clickMode}
    turn = {turning}
    toast={toast}
    setToast={setToast}

    />)
  
}

function Userguide({onCloseModal, showModal}){
  if(showModal){
    return(<div className="overlay" onClick={onCloseModal}>
        <div className="modal-wrapper">
          <div className = "modal">
            <div className="section">
              <img src ={Exp1} alt="explain"></img>
              <p>이 게임은 가로, 세로, 대각 어디든 4줄을 먼저 만들면 이김 ㅇㅇ</p>
            </div>
            <div className="section">
              <img src ={Exp2} alt="explain"></img>
              <p>내 돌을 놓기 전에, 상대 돌이 있다면 턴마다 1개 다른 자리로 옮김</p>
            </div>
            <div className="section">
              <img src ={Exp3} alt="explain"></img>
              <p>내 돌을 놓으면, 가운데 버튼을 눌러 판을 회전 시켜야함. 
                <br></br><br></br>이 때 한줄이 완성되면 승리</p>
            </div>
          </div>
          <div className="press-start">Press anywhere to start</div>
        </div>
      </div>)
  }
  else{
    return(null)
  }
}

function GameScreen({ StateButtonClick, showModal, 
  onCloseModal, HeaderMsg, StateButtonText,
  Boardstate, fixedIndex, setFixedIndex, clickMode, toast, setToast, Animestate,
  turn,
  }){
  return (
    <div className = "div_all">
      <div className="flexbox">
        <div className="header-box">
          {HeaderMsg}
        </div>
        <div className="game_button" onClick={StateButtonClick}>
          {StateButtonText}
        </div>
      </div>

      <div className="grid-box">
        {[...Array(16)].map((_,i) => (
          <div key={`bg-${i}`} className="circle"></div>
        ))}
        <Balllayer 
        Boardstate={Boardstate}
        Animestate={Animestate}
        />
        {clickMode !== "none" && <Clicklayer
        Boardstate={Boardstate}
        fixedIndex={fixedIndex}
        setFixedIndex={setFixedIndex}
        clickMode={clickMode}
        turn={turn}
        />}
      </div>

      <Userguide 
      onCloseModal={onCloseModal}
      showModal={showModal}/>

      {toast !== null && (
        <Toast
          message = {toast}
          onClose = {() => setToast(null)}
          />
      )}
      </div>
      )
      }



function Balllayer({ Boardstate, Animestate }) {
  return (
    <div className="ball-layer">
      {Boardstate.map((item, i) => {
        const marbleId = `marble-${Animestate ? button_array[i] : i}`;
        return (
          <div key={`container-${i}`} className="ball-container">
            {item !== 0 && (
              <motion.div
                key={marbleId}
                layout
                layoutId={marbleId}
                className={`small-ball-${item}`}
                transition={Animestate ? {
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                } : {duration : 0}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ClickUnit({ isfixed, onClick, clickMode }) {
  const [ishovered, setIshovered] = useState(false);

  return (
    <div
      className={`click ${clickMode} ${ishovered || isfixed ? "visible" : ""}`}
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
      onClick={onClick}
    ></div>
  );
}

function Clicklayer({Boardstate, fixedIndex, setFixedIndex, clickMode, turn}) {
  
  return (
    <div className="click-layer">
      {Boardstate.map((item, i) => (
        <ClickUnit
          key={`click-${i}`}
          isfixed={fixedIndex === i}
          clickMode={clickMode}
          onClick={() => {
            if(clickMode === "Move"){
              if(item === 3 - turn){
                setFixedIndex((prev) => (prev === i ? null : i))
              }
            }
            else{
              if(item === 0) {
                setFixedIndex((prev) => (prev === i ? null : i))
              }
            }
          }}
        />
      ))}
    </div>
  );
}

function panpare(){
  return null;
}

async function Post_Game({setToast}) {
  try {
  const res = await fetch("http://localhost:5000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if(!res.ok){
    setToast(`Failed to connect, Error code : ${res.status}`)
  }

  const data = await res.json();
  return data;}
  catch (error) {
    console.error("Failed to get data", error.message);

    if(error.message === "Failed to fetch"){
      setToast("Failed to connect server, contact Choi")
    }else{
      setToast("Unknown error found, I don't know too...")
    }
    return {"success":false,}
  }
}

async function Getboard({setToast}){
  try {
  const res = await fetch("http://localhost:5000/game", {
    method: "GET",
    credentials: "include",
  });

  if(!res.ok){
    setToast(`Failed to connect, Error code : ${res.status}`)
  }

  const data = await res.json();
  return data;}
  catch (error) {
    console.error("Failed to get data", error.message);

    if(error.message === "Failed to fetch"){
      setToast("Failed to connect server, contact Choi")
    }else{
      setToast("Unknown error found, I don't know too...")
    }
    return {"success":false,}
  }
}

async function Post_Addition({fixedIndex, setToast}){
  try {
    const res = await fetch("http://localhost:5000/addition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({index: fixedIndex}),
    credentials: "include",
  });

  if(!res.ok){
    setToast(`Failed to connect, Error code : ${res.status}`)
  }

  const data = await res.json();
  return data;}
  catch (error) {
    console.error("Failed to get data", error.message);

    if(error.message === "Failed to fetch"){
      setToast("Failed to connect server, contact Choi")
    }else{
      setToast("Unknown error found, I don't know too...")
    }
    return {"success":false,}
  }
}

async function Get_Win({setToast}){

  try {
    const res = await fetch("http://localhost:5000/wincheck", {
    method: "GET",
    credentials: "include",
  });

  if(!res.ok){
    setToast(`Failed to connect, Error code : ${res.status}`)
  }

  const data = await res.json();
  return data;}
  catch (error) {
    console.error("Failed to get data", error.message);

    if(error.message === "Failed to fetch"){
      setToast("Failed to connect server, contact Choi")
    }else{
      setToast("Unknown error found, I don't know too...")
    }
    return {"success":false,}
  }
}

async function Post_Moving({From, To, setToast}){
    try {
    const res = await fetch("http://localhost:5000/Moving", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({From: From, To: To}),
    credentials: "include",
  });

  if(!res.ok){
    setToast(`Failed to connect, Error code : ${res.status}`)
  }

  const data = await res.json();
  return data;}
  catch (error) {
    console.error("Failed to get data", error.message);

    if(error.message === "Failed to fetch"){
      setToast("Failed to connect server, contact Choi")
    }else{
      setToast("Unknown error found, I don't know too...")
    }
    return {"success":false,}
  }
}

export default App;

