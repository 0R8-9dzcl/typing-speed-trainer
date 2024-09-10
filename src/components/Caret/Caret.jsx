const Caret = (props) => {
  const { caretPosition, isHidden, className } = props

  return (
    <div
      className={className}
      style={{
        left: caretPosition.left + 'px',
        top: caretPosition.top + 'px',
      }}
    ></div>
  )
}

export default Caret
