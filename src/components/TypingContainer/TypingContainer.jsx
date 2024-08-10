import './TypingContainer.css'
import Letter from "../Letter/Letter"

const TypingContainer = (props) => {
  const { typingSring, correctString } = props
  const correctLetterArray = correctString.split('')
  return (
    <div className="typingContainer">
      {
        correctLetterArray.map((correctLetter, index) => (
          <Letter
            correctLetter={correctLetter}
            isCorrectLetter={typingSring[index] === correctString[index]}
            key={index}
          />
        ))
      }
    </div>
  )
}

export default TypingContainer