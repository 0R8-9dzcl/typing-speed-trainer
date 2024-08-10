import './Word.css'
import Letter from "../Letter/Letter"

const Word = (props) => {
	const { typingWord , correctWord, isTypingWordIxist, isTypingWordLonger } = props
  const correctLetterArray = correctWord.split('')
  return (
    <div className="word">
      {
        correctLetterArray.map((correctLetter, index) => (
          <Letter
            correctLetter={correctLetter}
            typingLetter={isTypingWordLonger ? typingWord.slice(index) : typingWord[index]}
            isTypingWordIxist={isTypingWordIxist}
            isTypingLetterIxist={Boolean(typingWord[index])}
            isCorrectLetter={typingWord[index] === correctWord[index]}
            key={index}
          />
        ))
      }
    </div>
  )
}

export default Word
