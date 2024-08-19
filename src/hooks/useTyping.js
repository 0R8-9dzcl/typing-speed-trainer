import { useState, useCallback, useRef } from 'react'

const useTyping = () => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

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

  const completeTyping = useCallback(() => setIsCompleted(true), [])

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
