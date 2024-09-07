import { useState, useCallback, useEffect } from 'react'
import './TypingContainer.css'
import Word from '../Word/Word'
import Input from '../Input/Input'
import useTyping from '../../hooks/useTyping'
import useTimer from '../../hooks/useTimer'
import calculateWpm from '../../utils/calculateWpm'
import classNames from 'classnames'

const TypingContainer = ({ correctString }) => {
  const timerDuration = 30
  const [wpm, setWpm] = useState(0)

  const { timeLeft, startTimer, stopTimer, resetTimer, isRunning } =
    useTimer(timerDuration)

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
    handleFocus,
  } = useTyping()

  const typingWordsArray = typingSring.split(' ')
  const correctWordsArray = correctString.split(' ')
  const isNotShowFocus = !isInputFocused && !isCompleted
  const showButtonClass = classNames({
    focus: true,
    hidden: isCompleted || !isNotShowFocus,
  })
  const wordsClass = classNames({
    words: true,
    blured: isNotShowFocus,
    hidden: isCompleted,
  })
  const resultClass = classNames({
    result: true,
    hidden: !isCompleted,
  })

  const resetTrainer = () => {
    clearInput()
    stopTimer()
    resetTimer()
  }

  const completeTrainer = useCallback(() => {
    stopTimer()
    setWpm(
      calculateWpm({
        inputValue: typingSring,
        elapsedTime: timerDuration - timeLeft,
      }),
    )
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
    const isEmptyCorrectString = correctString.length < 1

    const isTypingLastWord =
      correctWordsArray.length === typingWordsArray.length
    const lastCorrecttWordsLength = correctWordsArray.at(-1).length
    const lastTypingWordsLength = correctWordsArray.at(-1).length
    const isLastWordsLengthEqual =
      lastCorrecttWordsLength === lastTypingWordsLength

    if (!isEmptyCorrectString && isTypingLastWord && isLastWordsLengthEqual) {
      completeTrainer()
    }
  }, [
    completeTrainer,
    correctString,
    correctWordsArray,
    typingSring,
    typingWordsArray,
    typingWordsArray.length,
  ])

  return (
    <div className="typingContainer">
      {!isCompleted && (
        <button type="button" onClick={resetTrainer}>
          Reset
        </button>
      )}
      <p className="timer">Time remaining: {timeLeft} seconds</p>
      <div className="wrap">
        <Input
          inputRef={inputRef}
          className="input"
          onChange={handleChangeInput}
          disabled={isCompleted}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <div className={wordsClass}>
          <div className="caret"></div>
          {correctWordsArray.map((correctWord, index) => {
            const currentTypingWord = typingWordsArray[index] || ''
            return (
              <Word
                correctWord={correctWord}
                typingWord={currentTypingWord}
                isTypingWordIxist={Boolean(currentTypingWord)}
                isTypingWordLonger={
                  currentTypingWord.length > correctWord.length
                }
                key={index}
              />
            )
          })}
        </div>
        <button type="button" className={showButtonClass} onClick={focusInput}>
          Click for focus
        </button>
        <div className={resultClass}>
          <p>WPM: {wpm}</p>
          <button type="button" onClick={resetTrainer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default TypingContainer
