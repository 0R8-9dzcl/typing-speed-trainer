const Words = (props) => {
  const { wordsRef, className, children } = props

  return (
    <div className={className} ref={wordsRef}>
      {children}
    </div>
  )
}

export default Words
