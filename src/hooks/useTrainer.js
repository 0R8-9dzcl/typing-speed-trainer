import { useCallback, useEffect, useRef, useState } from 'react'

const useTrainer = (correctString, durationInSeconds = 30) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const [wpm, setWpm] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const timerRef = useRef()

  // работа с инпутом
  const handleChange = () => {
    const value = inputRef.current.value
    setInputValue(value)
    if (!isRunning) {
      setIsRunning(true)
      startTimer()
    }
    if (value.trim() === correctString.trim()) {
      completeTrainer()
    }
  }

  const focusInput = useCallback(() => {
    inputRef.current.focus()
  }, [])

  const clearInput = useCallback(() => {
    inputRef.current.value = ''
    setInputValue('')
  }, [])

  // таймер
  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  }, [])

  // подсчет WPM
  const handleFocus = () => {
    setIsInputFocused(true)
  }
  const handleBlur = () => {
    setIsInputFocused(false)
  }

  const calculateWpm = useCallback(() => {
    const wordsTyped = inputValue.trim().split(' ').length
    const minutesElapsed = (durationInSeconds - timeLeft) / 60
    setWpm(Math.round(wordsTyped / minutesElapsed))
  }, [inputValue, timeLeft, durationInSeconds])

  const completeTrainer = useCallback(() => {
    stopTimer()
    calculateWpm()
    setIsCompleted(true)
  }, [calculateWpm, stopTimer])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          completeTrainer()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [completeTrainer])

  useEffect(() => {
    if (isCompleted) {
      calculateWpm()
      handleBlur()
    }
  }, [isCompleted, calculateWpm])

  useEffect(() => {
    if (isInputFocused) {
      focusInput()
    }
  }, [focusInput, isInputFocused])

  const resetTrainer = useCallback(() => {
    stopTimer()
    clearInput()
    setTimeLeft(durationInSeconds)
    setWpm(0)
    setIsCompleted(false)
    handleFocus()
  }, [stopTimer, clearInput, durationInSeconds])

  return {
    inputRef,
    inputValue,
    handleChange,
    timeLeft,
    wpm,
    resetTrainer,
    isCompleted,
    isInputFocused,
  }
}

export default useTrainer
