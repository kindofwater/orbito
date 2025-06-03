// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="circle-container">
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className={`circle${selected === num ? ' selected' : ''}`}
          onClick={() => setSelected(num)}
        >
          {num}
        </div>
      ))}
      {selected && <div className="result">선택한 원: {selected}</div>}
    </div>
  );
}

export default App;