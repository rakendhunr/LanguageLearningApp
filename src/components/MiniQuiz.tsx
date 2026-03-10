import { useState } from 'react'
import { VOCAB } from '../data/vocabData'
import { buildQuizQuestions } from '../utils/helpers'
import type { QuizQuestion } from '../types'

export function MiniQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuizQuestions(VOCAB))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = questions[currentIndex]

  const handleSelect = (option: string) => {
    if (selected || finished) return
    setSelected(option)
    if (option === current.correctAnswer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
    }
  }

  const handleRestart = () => {
    setQuestions(buildQuizQuestions(VOCAB))
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (!current) {
    return null
  }

  return (
    <section className="panel">
      <h2>Quick translation quiz</h2>
      <p className="panel-subtitle">Choose the correct English translation for the German word.</p>

      <div className="quiz-card">
        <p className="quiz-progress">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <p className="quiz-prompt">{current.prompt}</p>

        <div className="quiz-options">
          {current.options.map((option) => {
            const isSelected = option === selected
            const isCorrect = finished || (selected && option === current.correctAnswer)
            const isWrongSelection = selected && isSelected && option !== current.correctAnswer

            let className = 'quiz-option'
            if (isCorrect) className += ' quiz-option-correct'
            if (isWrongSelection) className += ' quiz-option-wrong'
            if (isSelected && !isWrongSelection && !isCorrect) className += ' quiz-option-selected'

            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => handleSelect(option)}
                disabled={Boolean(selected) || finished}
              >
                {option}
              </button>
            )
          })}
        </div>

        {!finished ? (
          <button type="button" className="primary wide" onClick={handleNext} disabled={!selected}>
            {currentIndex + 1 === questions.length ? 'Finish quiz' : 'Next question'}
          </button>
        ) : (
          <div className="quiz-summary">
            <p>
              You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
            </p>
            <button type="button" className="primary" onClick={handleRestart}>
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
