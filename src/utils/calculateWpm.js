const calculateWpm = ({ inputValue, elapsedTime }) => {
  const wordsTyped = inputValue.trim().split(' ').length
  const minutesElapsed = elapsedTime / 60
  const wpm = Math.round(wordsTyped / minutesElapsed)
  return wpm
}

export default calculateWpm
