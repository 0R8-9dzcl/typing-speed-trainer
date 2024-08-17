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
    timeLeft,
    wpm,
    resetTrainer,
    isCompleted,
    isInputFocused
  } = useTrainer(correctString);

  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')
  return (
    <div className="typingContainer">
    {
      !isCompleted && <button type="button" onClick={resetTrainer}>Reset</button>
    }
    <p className='timer'>Time remaining: {timeLeft} seconds</p>
      <Input
        inputRef={ inputRef }
        className="input"
        onChange={onType}
        disabled={isCompleted}
      />
      {
        !isCompleted ? (
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
        ) :
        (
          <div className="results">
            <p>WPM: {wpm}</p>
            <button type="button" onClick={resetTrainer}>Reset</button>
          </div>
        )
      }
    </div>
  )
}

export default TypingContainer