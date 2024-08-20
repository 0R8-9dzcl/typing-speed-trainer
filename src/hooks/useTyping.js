import { useState, useCallback, useRef } from 'react'

const useTyping = () => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleChange = useCallback((event) => {
    const  newInputValue = event.target.value
    const lastValueLetter = inputValue.slice(-1)
    const isLastLettersEqual = newInputValue.slice(-1) === lastValueLetter
    const isLastLetterSpace = lastValueLetter === ' '
    const isDoubleSpace = isLastLettersEqual && isLastLetterSpace
    if (!isDoubleSpace) {
      setInputValue(newInputValue)
    } else {
      inputRef.current.value = inputValue
    }
  }, [inputValue])

  const resetInput = () => {
    setInputValue('')
    inputRef.current.value = ''
    setIsCompleted(false)
  }

  const handleFocus = () => {
    setIsInputFocused(true)
  }
  const handleBlur = () => {
    setIsInputFocused(false)
  }

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      handleFocus()
    }
  }, [inputRef])

  const completeTyping = useCallback(() => {
    setIsCompleted(true)
  }, [])

  return {
    inputRef,
    inputValue,
    handleChange,
    clearInput: resetInput,
    focusInput,
    isInputFocused,
    isCompleted,
    completeTyping,
    handleBlur,
  }
}

export default useTyping
