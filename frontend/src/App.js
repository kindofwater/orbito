import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

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
      <div className = "div_all">
        <div className="overlay">
        <div className = "modal">
          Divide this to Third to set all the scripts. <br></br>
        </div></div>
      <div className="header-box">
        Maybe the message should change due to Server response, doesn't it? <br></br>
      </div>
      <div className="grid-box">
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
      </div>
    </div>
    )
    
  }
  else{
    return(
    <div className = "div_all">
      <div className="header-box">
        This is test page, I don't think it's supposed to pop up here.zz <br></br>
      </div>
      <div className="grid-box">
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
    <div className="circle"></div><div className="circle"></div><div className="circle"></div><div className="circle"></div>
      </div>
    </div>
  );
  }
  
}

export default App;