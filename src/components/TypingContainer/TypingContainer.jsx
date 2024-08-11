import './TypingContainer.css'
import Word from '../Word/Word'

const TypingContainer = (props) => {
  const { typingSring, correctString, onType } = props
  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')
  return (
    <div className="typingContainer">
    <input
      type="text"
      className="input"
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      onChange={onType}
      value={typingSring}
    />
    <div className="words">
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
    </div>
  )
}

export default TypingContainer