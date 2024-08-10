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
      <TypingContainer
        typingSring={typingSring}
        correctString={correctString}
      />
    </main>
    </>
  );
}

export default App;
