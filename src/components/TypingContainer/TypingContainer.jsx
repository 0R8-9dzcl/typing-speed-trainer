import './TypingContainer.css'
import Word from '../Word/Word'

const TypingContainer = (props) => {
  const { typingSring, correctString } = props
  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')
  return (
    <div className="typingContainer">
      {
        correctWordsArray.map((correctWord, index) => (
          <Word
            correctWord={correctWord}
            typingWord={typingWordsArray[index] || ''}
            isTypingWordIxist={Boolean(typingWordsArray[index])}
            key={index}
          />

        ))
      }
    </div>
  )
}

export default TypingContainer