import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg"

function App() {
  const [gameState, setgameState] = useState("start");
  const [NextState, setNextState] = useState("PostGame")
  const [showModal, setshowModal] = useState(false);
  const [HeaderMsg, setHeaderMsg] = useState("Welcome to Game")
  const [StateButtonText, setStBtnTxt] = useState("Game Start!")
  useEffect(()=>{ // for the animation
      setshowModal(true);
    },[]);



  useEffect(() => {
      if(gameState === "Start"){

      }else if (gameState === "PostGame") {
        Postgame().then((success) => {
          if (success) {
            setHeaderMsg("As First move, moving phase skipped.");
            setNextState(NextState) /// for If you are once failed, and come to success
            /// wait 2 seconds, how about button filling motion? with acceleration
          } else {
            setHeaderMsg("Failed to fetch, check your server");
            setNextState(gameState)
          }
        });
      }else if (gameState === "Moving"){
        Getboard()
        .then(({success, board})=>{
          if(success) {
            // let the board display!
            ///
            setHeaderMsg("moving phase, select opponent marbles to move")
            setStBtnTxt("Complete")
            
            
            
            setNextState("Addition")

          }
          else{
            //setHeaderMsg("Failed to fetch, check your server")
            setStBtnTxt("Try again")
            setNextState(gameState)
          }
        })

      }else if (gameState === "Addition"){

      }else{
        
      }
    }, [gameState]);

    return(
    <GameScreen
    StateButtonClick={()=>{setgameState(NextState)}}
    StateButtonText = {StateButtonText}
    HeaderMsg={HeaderMsg}

    
    
    // For the Start Screen
    showModal={showModal}
    onCloseModal={()=>{
      setshowModal(false)
    }}

    // board state update needed
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

function GameScreen({ StateButtonClick, showModal, onCloseModal, HeaderMsg, StateButtonText}){
  return (
    <div className = "div_all">
      <div className="flexbox">
        <div className="header-box">
          {HeaderMsg} <br></br>
        </div>
        <div className="game_button" onClick={StateButtonClick}>
          {StateButtonText}
        </div>
      </div>
      <div className="grid-box">
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
      </div>
      <Userguide 
      onCloseModal={onCloseModal}
      showModal={showModal}/>
    </div>
  )
}

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

async function Postgame() {
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

export default App;