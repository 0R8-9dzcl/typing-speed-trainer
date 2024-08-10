import { useState } from "react";
import "./App.css";
import TypingContainer from "../TypingContainer/TypingContainer";

function App() {
  const [typingSring, setTypingSring] = useState('мамыввв gfg')
  const [correctString, setCorrectString] = useState('мама мыла раму мама мыла раму мама мыла раму мама мыла раму')
  return (
    <>
    <header className="header">
      <h1 className="header__title">Typing Speed Trainer</h1>
    </header>
    <main>
      {/* <div className="writer">
        <p>м</p><p>а</p><p>м</p><p>а</p><p> </p><p>м</p><p>ы</p><p>л</p><p>а</p><p> </p><p>р</p><p>а</p><p>м</p><p>у</p><p> </p>
        <p>м</p><p>а</p><p>м</p><p>а</p><p> </p><p>м</p><p>ы</p><p>л</p><p>а</p><p> </p><p>р</p><p>а</p><p>м</p><p>у</p><p> </p>
        <p>м</p><p>а</p><p>м</p><p>а</p><p> </p><p>м</p><p>ы</p><p>л</p><p>а</p><p> </p><p>р</p><p>а</p><p>м</p><p>у</p><p> </p>
        <p>м</p><p>а</p><p>м</p><p>а</p><p> </p><p>м</p><p>ы</p><p>л</p><p>а</p><p> </p><p>р</p><p>а</p><p>м</p><p>у</p><p> </p>
      </div> */}
      <TypingContainer
        typingSring={typingSring}
        correctString={correctString}
      />
    </main>
    </>
  );
}

export default App;
