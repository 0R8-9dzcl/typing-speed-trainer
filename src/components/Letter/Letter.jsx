import classNames from 'classnames'

const Letter = (props) => {
  const {
    correctLetter,
    typingLetter,
    isCorrectLetter,
    isTypingWordIxist,
    isTypingLetterIxist,
    letterStyles,
  } = props

  const letterClass = classNames({
    [letterStyles.letter]: true,
    [letterStyles.valid]: isTypingWordIxist && isCorrectLetter,
    [letterStyles.invalid]:
      isTypingWordIxist && isTypingLetterIxist && !isCorrectLetter,
  })

  const displayedLetter =
    !isCorrectLetter && isTypingLetterIxist ? typingLetter : correctLetter

  return <p className={letterClass}>{displayedLetter}</p>
}

export default Letter
