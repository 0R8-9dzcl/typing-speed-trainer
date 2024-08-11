import './TypingContainer.css'
import Word from '../Word/Word'
import Input from '../Input/Input'
import useTrainer from '../../hooks/useTrainer'

const TypingContainer = (props) => {
  const { correctString } = props

  const {
    inputRef,
    inputValue: typingSring,
    handleChange: onType,
    timeElapsed,
    wpm,
    resetTrainer,
    isCompleted,
    isInputFocused
  } = useTrainer(correctString);

  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')

  return (
    <div className="typingContainer">
      <Input
        inputRef={ inputRef }
        className="input"
        onChange={onType}
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