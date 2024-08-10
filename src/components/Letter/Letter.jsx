import './Letter.css'
import classNames from 'classnames';

const Letter = (props) => {
	const { correctLetter, typingLetter, isCorrectLetter, isTypingWordIxist, isTypingLetterIxist } = props
  const letterClass = classNames({
    letter: true,
    valid: isTypingWordIxist && isCorrectLetter,
    invalid: isTypingWordIxist && isTypingLetterIxist && !isCorrectLetter
  })
  const displayedLetter = !isCorrectLetter && isTypingLetterIxist ? typingLetter : correctLetter
  return <p className={letterClass}>{displayedLetter}</p>
}

export default Letter
