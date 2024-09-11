import { useState, useCallback, useEffect, useRef } from 'react'
import styles from './TypingContainer.module.css'
import Word from '../Word/Word'
import Input from '../Input/Input'
import useTyping from '../../hooks/useTyping'
import useTimer from '../../hooks/useTimer'
import calculateWpm from '../../utils/calculateWpm'
import classNames from 'classnames'
import useCaret from '../../hooks/useCaret'
import Caret from '../Caret/Caret'
import Words from '../Words/Words'
import useTypingErrors from '../../hooks/useTypingErrors'

const TypingContainer = ({ correctString }) => {
  const timerDuration = 30
  const [wpm, setWpm] = useState(0)

  const { timeLeft, startTimer, stopTimer, resetTimer, isRunning } =
    useTimer(timerDuration)

  const {
    inputRef,
    inputValue: typingString,
    handleChange: onType,
    focusInput,
    isInputFocused,
    isCompleted,
    clearInput,
    completeTyping,
    handleBlur,
    handleFocus,
  } = useTyping()

  const typingWordsArray = typingString.split(' ')
  const correctWordsArray = correctString.split(' ')
  const isNotShowFocus = !isInputFocused && !isCompleted

  const showButtonClass = classNames({
    [styles.focus]: true,
    [styles.hidden]: isCompleted || !isNotShowFocus,
  })
  const wordsClass = classNames({
    [styles.words]: true,
    [styles.blured]: isNotShowFocus,
    [styles.hidden]: isCompleted,
  })
  const resultClass = classNames({
    [styles.result]: true,
    [styles.hidden]: !isCompleted,
  })

  const resetButtonClass = classNames({
    [styles.button]: true,
    [styles.hidden]: isCompleted,
  })

  const caretClassName = classNames({
    [styles.caret]: true,
    [styles.hidden]: !isInputFocused,
  })

  const letterStyles = {
    letter: styles.letter,
    valid: styles.valid,
    invalid: styles.invalid,
  }

  const wordsRef = useRef(null)
  const { caretPosition, resetPosition } = useCaret(
    wordsRef,
    typingString,
    letterStyles,
  )

  const resetTrainer = () => {
    clearInput()
    stopTimer()
    resetTimer()
    resetPosition()
    focusInput()
  }

  const { errors, countErrors } = useTypingErrors(correctString, typingString)

  const completeTrainer = useCallback(() => {
    stopTimer()
    countErrors()
    setWpm(
      calculateWpm({
        inputValue: typingString,
        elapsedTime: timerDuration - timeLeft,
      }),
    )
    completeTyping()
  }, [completeTyping, countErrors, stopTimer, timeLeft, typingString])

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
    const lastTypingWordsLength = typingWordsArray.at(-1).length
    const isLastWordsLengthEqual =
      lastCorrecttWordsLength === lastTypingWordsLength

    if (!isEmptyCorrectString && isTypingLastWord && isLastWordsLengthEqual) {
      completeTrainer()
    }
  }, [
    completeTrainer,
    correctString,
    correctWordsArray,
    typingString,
    typingWordsArray,
    typingWordsArray.length,
  ])

  return (
    <div className={styles.typingContainer}>
      <button className={resetButtonClass} type="button" onClick={resetTrainer}>
        Reset
      </button>
      <p>Time remaining: {timeLeft} seconds</p>
      <div className={styles.wrap}>
        <Input
          inputRef={inputRef}
          className={styles.input}
          onChange={handleChangeInput}
          disabled={isCompleted}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <Words wordsRef={wordsRef} className={wordsClass}>
          <Caret caretPosition={caretPosition} className={caretClassName} />
          {correctWordsArray.map((correctWord, index) => {
            const currentTypingWord = typingWordsArray[index] || ''
            return (
              <Word
                className={styles.word}
                letterStyles={letterStyles}
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
        </Words>
        <button type="button" className={showButtonClass} onClick={focusInput}>
          Click for focus
        </button>
        <div className={resultClass}>
          <p>WPM: {wpm}</p>
          <p>Correct: {errors.correct}</p>
          <p>Incorrect: {errors.incorrect}</p>
          <p>Extra: {errors.extra}</p>
          <p>Missed: {errors.missed}</p>
          <button type="button" onClick={resetTrainer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default TypingContainer
