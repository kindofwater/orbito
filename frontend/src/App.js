import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import logo from "./logo.svg"

const root = createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  const [gameState, setgameState] = useState("start");
  const [showModal, setshowModal] = useState(false);
  useEffect(()=>{
      setshowModal(true);
    },[]);

  if(gameState === "start"){
    return(
      <StartScreen
      onGameStart={()=>{setgameState("First_try")}}
      showModal={showModal}
      onCloseModal={()=>setshowModal(false)}/>
    )
    
  }else if (gameState === "First_try"){
    Postgame();
  }
  else{
    return(
      <TestScreen/>
  );
  }
  
}

function StartScreen({ onGameStart, showModal, onCloseModal}){
  return (
    <div className = "div_all">
      <div className="flexbox">
        <div className="header-box">
          Maybe the message should change due to Server response, doesn't it? <br></br>
        </div>
        <div className="game_button" onClick={onGameStart}>
          game_start
        </div>
      </div>
      <div className="grid-box">
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
        <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
      </div>
      {showModal &&(<div className="overlay" onClick={onCloseModal}>
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
        </div>)}
    </div>
  )
}

function TestScreen(){
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
}

async function Postgame() {
  const res = await fetch("http://localhost:5000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
}

export default App;