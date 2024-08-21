import { useState, useCallback, useEffect } from 'react'
import './TypingContainer.css'
import Word from '../Word/Word'
import Input from '../Input/Input'
import useTyping from '../../hooks/useTyping'
import useTimer from '../../hooks/useTimer'
import calculateWpm from '../../utils/calculateWpm'

const TypingContainer = ({ correctString }) => {
  const timerDuration = 30
  const [wpm, setWpm] = useState(0)

  const {
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
  } = useTimer(timerDuration)

  const {
    inputRef,
    inputValue: typingSring,
    handleChange: onType,
    focusInput,
    isInputFocused,
    isCompleted,
    clearInput,
    completeTyping,
    handleBlur,
    handleFocus
  } = useTyping()

  const resetTrainer = () => {
    clearInput()
    stopTimer()
    resetTimer()
  }

  const completeTrainer = useCallback(() => {
    stopTimer()
    setWpm(calculateWpm({
      inputValue: typingSring,
      elapsedTime: timerDuration - timeLeft,
    }))
    completeTyping()
  }, [completeTyping, stopTimer, timeLeft, typingSring])

  useEffect(() => {
    if (timeLeft === 0) {
      completeTrainer()
    }
  }, [timeLeft, completeTrainer])

  const handleChangeInput = (e) => {
    if (!isRunning) {
      startTimer()
    }

    onType(e)
  }

  useEffect(() => {
    const isEqualStrings = typingSring.trim() === correctString.trim()
    const isEmptyCorrectString = correctString.length < 1
    if (isEqualStrings && !isEmptyCorrectString) {
      completeTrainer()
    }
  }, [completeTrainer, correctString, typingSring])

  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')

  console.log(isInputFocused)

  return (
    <div className="typingContainer">
      {
        !isCompleted && (
          <button type="button" onClick={resetTrainer}>Reset</button>
        )
      }
      <p className='timer'>Time remaining: {timeLeft} seconds</p>
      {
        !isInputFocused && !isCompleted && (
          <button type="button" className="focus" onClick={focusInput}>Focus</button>
        )
      }
      <Input
        inputRef={inputRef}
        className="input"
        onChange={handleChangeInput}
        disabled={isCompleted}
        onBlur={handleBlur}
        onFocus={handleFocus}
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
        ) : (
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
