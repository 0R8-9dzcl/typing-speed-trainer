import classNames from 'classnames'
import styles from './Caret.module.css'

const Caret = (props) => {
  const { caretPosition, isHidden } = props
  const caretClassName = classNames({
    [styles.caret]: true,
    [styles.hidden]: isHidden
  })

  return (
    <div
      className={caretClassName}
      style={{
        left: caretPosition.left + 'px',
        top: caretPosition.top + 'px',
      }}
    ></div>
  )
}

export default Caret
