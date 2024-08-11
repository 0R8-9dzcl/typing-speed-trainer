import { useCallback, useEffect, useRef, useState } from 'react'

const useTrainer = (correctString, durationInSeconds = 30) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const [timeElapsed, setTimeElapsed] = useState(0)
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
    inputRef.current.focus();
  }, []);

  const clearInput = useCallback(() => {
    inputRef.current.value = '';
    setInputValue('');
  }, []);

  const completeTrainer = () => {
    stopTimer()
    calculateWpm()
    setIsCompleted(true)
  }

  // таймер
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => {
        if (prevTime + 1 >= durationInSeconds) {
          completeTrainer()
        }
        return prevTime + 1
      })
    }, 1000)
  }

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  }, [])

  // подсчет WPM
  const handleFocus = () => {
    setIsInputFocused(true);
  }
  const handleBlur = () => {
    setIsInputFocused(false);
  }

  const calculateWpm = useCallback(() => {
    const wordsTyped = inputValue.trim().split(' ').length;
    const minutesElapsed = timeElapsed / 60;
    setWpm(Math.round(wordsTyped / minutesElapsed));
  }, [inputValue, timeElapsed]);

  useEffect(() => {
    if (isCompleted) {
      calculateWpm()
      handleBlur();
    }
  }, [isCompleted, calculateWpm])

  useEffect(() => {
    if (isInputFocused) {
      focusInput()
    }
  }, [focusInput, isInputFocused])

  const resetTrainer = useCallback(() => {
    stopTimer();
    clearInput();
    setTimeElapsed(0);
    setWpm(0);
    setIsCompleted(false);
    handleFocus()
  }, [stopTimer, clearInput]);

  return {
    inputRef,
    inputValue,
    handleChange,
    timeElapsed,
    wpm,
    resetTrainer,
    isCompleted,
    isInputFocused
  }
}

export default useTrainer
