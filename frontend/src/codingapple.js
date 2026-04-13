// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [postName,setpostName] = useState(['남자 코트 추천', '몰라여기어디야', '엉엉엉']);
  const [like, setLike] = useState(0);
  function Namechange() {
    const newPostName = [...postName];
    newPostName[0] = '여자 코트 추천';
    setpostName(newPostName);
  }

  return (
    <div className="App">
      <div className="black-Nav">
        <h4>
          블로그임
        </h4>
      </div>
      <div className="list">
        <h4 className="1">{postName[0]}
          <span onClick={() => { setLike(like + 1); }}>💕</span>{like}
          <button className="change_button" onClick={Namechange}>Title Change</button>
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ postName[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ postName[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <Modal></Modal>
    </div>
  );
}

function Modal(){
  return(
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  );
}

export default App;