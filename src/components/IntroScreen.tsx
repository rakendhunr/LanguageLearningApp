import type { IntroScreenProps } from '../types'

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="intro-root">
      <div className="intro-card">
        <p className="intro-tag">German learning app</p>
        <h1 className="intro-title">Deutsch Buddy</h1>
        <p className="intro-subtitle">
          Learn German step by step with simple vocabulary practice and quick quizzes.
        </p>
        <button type="button" className="primary intro-start" onClick={onStart}>
          Start learning
        </button>
      </div>
    </div>
  )
}
