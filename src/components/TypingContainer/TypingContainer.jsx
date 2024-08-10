import './TypingContainer.css'
import Word from '../Word/Word'

const TypingContainer = (props) => {
  const { typingSring, correctString } = props
  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')
  return (
    <div className="typingContainer">
      {
        correctWordsArray.map((correctWord, index) => {
          const currentTypingWord = typingWordsArray[index] || ''
          return (
            <Word
              correctWord={correctWord}
              typingWord={currentTypingWord}
              isTypingWordIxist={Boolean(currentTypingWord)}
              isTypingWordLonger={currentTypingWord.length > correctWord.length}
              key={index}
            />
          )
      })
      }
    </div>
  )
}

export default TypingContainer