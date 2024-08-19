import { useCallback, useRef, useState } from 'react'

const useTimer = (initialTime = 60) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef()

  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current)
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
  }, [isRunning])

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    setTimeLeft(initialTime)
    setIsRunning(false)
  }, [initialTime])

  return {
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
  }
}

export default useTimer
