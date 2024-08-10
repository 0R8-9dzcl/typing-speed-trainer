import './Letter.css'
import classNames from 'classnames';

const Letter = (props) => {
	const { correctLetter, isCorrectLetter } = props
  const letterClass = classNames({
    letter: true,
    valid: isCorrectLetter,
    invalid: !isCorrectLetter
  })
  return <p className={letterClass}>{correctLetter}</p>
}

export default Letter
