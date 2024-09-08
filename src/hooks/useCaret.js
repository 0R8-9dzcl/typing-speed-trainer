import { useState, useEffect, useCallback } from 'react'

const defaultCaretPosition = { left: 1, top: 0 }

const useCaret = (wordsRef, words) => {
  const [caretPosition, setCaretPosition] = useState(defaultCaretPosition)

  const findLastTypedLetter = (wordsArray) => {
    for (let i = wordsArray.length - 1; i >= 0; i--) {
      const letters = Array.from(wordsArray[i].children)
      for (let j = letters.length - 1; j >= 0; j--) {
        const letter = letters[j]
        if (letter.classList.contains('valid') || letter.classList.contains('invalid')) {
          return letter
        }
      }
    }
    return null
  }

  const getElementPosition = (element) => {
    const { top, left, right } = element.getBoundingClientRect()

    return { top, left, right }
  }

  const moveCaretToNextWord = useCallback(
    (lastValidLetter) => {
      const nextLetter = lastValidLetter.parentElement.nextElementSibling
      if (nextLetter) {
        const letterPosition = getElementPosition(nextLetter)
        const wordsPosition = getElementPosition(wordsRef.current)

        setCaretPosition({
          left: letterPosition.left - wordsPosition.left - 1,
          top: letterPosition.top - wordsPosition.top,
        })
      }
    },
    [wordsRef],
  )

  const moveCaretAfterLastTypedLetter = useCallback(
    (lastValidLetter) => {
      const letterPosition = getElementPosition(lastValidLetter)
      const wordsPosition = getElementPosition(wordsRef.current)

      setCaretPosition({
        left: letterPosition.right - wordsPosition.left - 1,
        top: letterPosition.top - wordsPosition.top,
      })
    },
    [wordsRef],
  )

  const resetPosition = () => {
    setCaretPosition(defaultCaretPosition)
  }

  useEffect(() => {
    if (!wordsRef.current || words.length === 0) {
      resetPosition()
      return
    }

    const wordsArray = Array.from(wordsRef.current.children)
    const lastChar = words[words.length - 1]
    const isLastCharSpace = lastChar === ' '

    const lastTypedLetter = findLastTypedLetter(wordsArray)

    if (isLastCharSpace) {
      moveCaretToNextWord(lastTypedLetter)
    } else {
      moveCaretAfterLastTypedLetter(lastTypedLetter)
    }
  }, [moveCaretAfterLastTypedLetter, moveCaretToNextWord, words, wordsRef])

  return { caretPosition, resetPosition }
}

export default useCaret
