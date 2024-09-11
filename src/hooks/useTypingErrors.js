import { useCallback, useState } from 'react'

const useTypingErrors = (correctString, typingString) => {
  const [errors, setErrors] = useState({
    correct: 0,
    incorrect: 0,
    extra: 0,
    missed: 0,
  })

  const countErrors = useCallback(() => {
    const correctWordsArray = correctString.split(' ')
    const typingWordsArray = typingString.split(' ')

    let correctCount = 0
    let incorrectCount = 0
    let extraCount = 0
    let missedCount = 0

    typingWordsArray.forEach((typingWord, wordIndex) => {
      const correctWord = correctWordsArray[wordIndex] || ''
      const correctLetters = correctWord.split('')
      const typingLetters = typingWord.split('')

      correctLetters.forEach((letter, letterIndex) => {
        if (typingLetters[letterIndex] === letter) {
          correctCount++
        } else if (typingLetters[letterIndex]) {
          incorrectCount++
        }
      })

      if (wordIndex < typingWordsArray.length - 1) {
        if (typingLetters.length < correctLetters.length) {
          missedCount += correctLetters.length - typingLetters.length
        }
        if (typingLetters.length > correctLetters.length) {
          extraCount += typingLetters.length - correctLetters.length
        }
      }
    })

    setErrors({
      correct: correctCount,
      incorrect: incorrectCount,
      extra: extraCount,
      missed: missedCount,
    })
  }, [correctString, typingString])

  return { errors, countErrors }
}

export default useTypingErrors
