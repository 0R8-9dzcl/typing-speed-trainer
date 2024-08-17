import './Input.css'

const Input = (props) => {
  const { className, onChange, inputRef, disabled } = props
  return (
    <input
      type="text"
      className={className}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      onChange={onChange}
      ref={inputRef}
      disabled={disabled}
    />
  )
}

export default Input
