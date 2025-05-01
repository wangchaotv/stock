import React, { useState } from 'react';
import './App.css';
import Left from './Left';
import Right from './Right';

const params = new URLSearchParams(window.location.search);
const { code } = Object.fromEntries(params.entries());

function App() {
  const [stock1, setStock1] = useState(code);
  const [stock2, setStock2] = useState();

  return (
    <div id="app">
      <Left
        stock1={stock1}
        setStock1={setStock1}
        stock2={stock2}
        setStock2={setStock2}
      />
      <div id="right-container">
        <Right code={stock1} />
        {stock2 && <Right code={stock2} />}
      </div>
    </div>
  );
}

export default App;
