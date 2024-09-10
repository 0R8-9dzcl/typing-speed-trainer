import { useEffect } from 'react'

const Input = (props) => {
  const {
    className,
    onChange,
    inputRef,
    disabled: isInputDisabled,
    onBlur,
    onFocus,
  } = props

  const handlePreventDefault = (event) => {
    event.preventDefault()
  }
  const handleKeyDown = (event) => {
    const eventButtonCode = event.code
    const forbiddenButtonCodes = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]
    const isForbiddenButton = forbiddenButtonCodes.some(
      (forbiddenButtonCode) => forbiddenButtonCode === eventButtonCode,
    )
    if (isForbiddenButton) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    const inputElement = inputRef.current
    inputElement.addEventListener('selectstart', handlePreventDefault)
    inputElement.addEventListener('mousedown', handlePreventDefault)

    return () => {
      inputElement.removeEventListener('selectstart', handlePreventDefault)
      inputElement.removeEventListener('selectstart', handlePreventDefault)
    }
  }, [inputRef])
  return (
    <input
      type="text"
      className={className}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      onChange={onChange}
      ref={inputRef}
      disabled={isInputDisabled}
      onPaste={handlePreventDefault}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  )
}

export default Input
