import './Word.css'
import Letter from "../Letter/Letter"

const Word = (props) => {
	const { typingWord , correctWord, isTypingWordIxist, isTypingWordLonger } = props
  const correctLetterArray = correctWord.split('')
  const correctWordLength = correctWord.length
  return (
    <div className="word">
      {
        correctLetterArray.map((correctLetter, index) => (
          <Letter
            correctLetter={correctLetter}
            typingLetter={typingWord[index]}
            isTypingWordIxist={isTypingWordIxist}
            isTypingLetterIxist={Boolean(typingWord[index])}
            isCorrectLetter={typingWord[index] === correctWord[index]}
            key={index}
          />
        ))
      }
      {
        isTypingWordLonger &&
          <Letter
            correctLetter={''}
            typingLetter={typingWord.slice(correctWordLength)}
            isTypingWordIxist={isTypingWordIxist}
            isTypingLetterIxist={true}
            isCorrectLetter={false}
            key={correctWordLength}
          />
      }
    </div>
  )
}

export default Word
