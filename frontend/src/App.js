import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg"


function App() {
  const Newarray = Array(16).fill(0);
  const [gameState, setgameState] = useState("Start");
  const [NextState, setNextState] = useState(null)
  const [showModal, setshowModal] = useState(false);
  const [HeaderMsg, setHeaderMsg] = useState("Welcome to Game")
  const [Boardstate, setBrdState] = useState(Newarray)
  const [StateButtonText, setStBtnTxt] = useState("Game Start!")
  const [fixedIndex, setFixedIndex] = useState(null);
  const [BtnAct, setBtnActive] = useState(true);
  const [clickMode, setClickMode] = useState("none");

  useEffect(()=>{ // for the animation
      setshowModal(true);
    },[]);



  useEffect(() => {
      if(gameState === "Start"){
        setNextState("Post_Game")
      }else if (gameState === "Post_Game") {
        Post_Game().then((success) => {
          if (success) {
            setNextState("Addition")
            setHeaderMsg("As First move, moving phase skipped.");
            setStBtnTxt("OK")
            /// wait 2 seconds, how about button filling motion? with acceleration
          } else {
            setHeaderMsg("Failed to fetch, check your server");
            setNextState(gameState)
            setStBtnTxt("Try again")
          }
        });
      }else if (gameState === "Before_Moving"){
        Getboard()
        .then(({success, board, id})=>{
          if(success) {
            // let the board display!
            ///
            setBtnActive(false)
            setHeaderMsg(`moving phase, select opponent marbles to move, ${id === 1 ? "White.":"Black."}`)
            setBrdState(board)
            setStBtnTxt("Confirm")             
            setNextState("WhereTo_Moving")
            setClickMode("Move")

          }
          else{
            setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }
        })

      }else if (gameState === "WhereTo_Moving"){
        
      }
      else if (gameState === "Addition"){
        Getboard()
        .then(({success, board})=>{
          if(success) {
            // let the board display!
            ///
            setHeaderMsg("Addition phase, Select empty place to put marble")
            setClickMode("Add")
            setNextState("Addition_confirm")
            setBrdState(board)
            setStBtnTxt("Confirm") /// we need to consider deactivate button
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
          Post_Addition(fixedIndex)
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
        Getboard()
        .then(({success, board})=>{
          if(success) {
            // let the board display!
            ///
            setHeaderMsg("OK We'll push the button!")
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
        Get_Win()
        .then((winner, board)=>{
          if(winner === 0){
            setgameState("Before_Moving")
          }
          else if (winner === 1){
            setHeaderMsg("Congrat!!! Winner plyer white")
            setNextState("Start")
            setStBtnTxt("Try again")
            panpare();
          }
          else if (winner === 2){
            setHeaderMsg("Congrat!!! Winner plyer black")
            setNextState("Start")
            setStBtnTxt("Try again")
            panpare();
          }
        })
      }
      else{
        
      }
    }, [gameState]);

    return(
    <GameScreen
    StateButtonClick={()=>{setgameState(NextState)}}
    StateButtonText = {StateButtonText}
    HeaderMsg={HeaderMsg}
    setBtnActive={setBtnActive}

    // Conditional Button Active
    BtnAct={BtnAct}
    
    
    // For the Start Screen
    showModal={showModal}
    onCloseModal={()=>{setshowModal(false)}}
    // board state update needed
    Boardstate={Boardstate}
    fixedIndex={fixedIndex}
    setFixedIndex={setFixedIndex}
    clickMode={clickMode}

    />)
  
}

function Userguide({onCloseModal, showModal}){
  if(showModal){
    return(<div className="overlay" onClick={onCloseModal}>
        <div className = "modal">
          <div className="section">
            <img src ={logo} alt="explain"></img>
            <p>section 1</p>
          </div>
          <div className="section">
            <img src ={logo} alt="explain"></img>
            <p>section 2</p>
          </div>
          <div className="section">
            <img src ={logo} alt="explain"></img>
            <p>section 3</p>
          </div>
          
        </div>
        </div>)
  }
  else{
    return(null)
  }
}

function GameScreen({ StateButtonClick, showModal, 
  onCloseModal, HeaderMsg, StateButtonText,
  Boardstate, fixedIndex, setFixedIndex,
setBtnActive, BtnAct, clickMode}){
  return (
    <div className = "div_all">
      <div className="flexbox">
        <div className="header-box">
          {HeaderMsg}
        </div>
        {BtnAct && <div className="game_button" onClick={StateButtonClick}>
          {StateButtonText}
        </div>}
      </div>

      <div className="grid-box">
        {[...Array(16)].map((_,i) => (
          <div key={`bg-${i}`} className="circle"></div>
        ))}
        <Balllayer 
        Boardstate={Boardstate}
        />
        {clickMode !== "none" && <Clicklayer
        Boardstate={Boardstate}
        fixedIndex={fixedIndex}
        setFixedIndex={setFixedIndex}
        setBtnActive={setBtnActive}
        clickMode={clickMode}
        />}
      </div>

      <Userguide 
      onCloseModal={onCloseModal}
      showModal={showModal}/>
      </div>
      )
      }



function Balllayer({ Boardstate }){
return(
<div className="ball-layer">
{Boardstate.map((item, i) => (
  <div key={`ball-${i}`} className="ball-container">
    <div className={`small-ball-${item}`}></div>
  </div>))}</div>
)
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

function Clicklayer({Boardstate, fixedIndex, setFixedIndex, setBtnActive, clickMode}) {
  
  return (
    <div className="click-layer">
      {Boardstate.map((item, i) => (
        <ClickUnit
          key={`click-${i}`}
          isfixed={fixedIndex === i}
          clickMode={clickMode}
          onClick={() => {item === 0 && (setFixedIndex((prev) => (prev === i ? null : i)))
            setBtnActive(true)
          }}
        />
      ))}
    </div>
  );
}

function panpare(){
  return null;
}

async function Post_Game() {
  const res = await fetch("http://localhost:5000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function Getboard(){
  const res = await fetch("http://localhost:5000/game", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function Post_Addition(fixedIndex){
  const res = await fetch("http://localhost:5000/addition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: fixedIndex }),
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function Get_Win(){
  const res = await fetch("http://localhost:5000/wincheck", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default App;


/* function TestScreen(){
  return(<div className = "div_all">
      <div className="header-box">
        This is test page, I don't think it's supposed to pop up here.zz <br></br>
      </div>
      <div className="grid-box">
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
      </div>
    </div>)
} */
