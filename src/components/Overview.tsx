export function Overview() {
  return (
    <section className="panel">
      <h2>Willkommen</h2>
      <p>
        This is a small but extensible app for learning German. Start with vocabulary flashcards or test yourself
        with a quick quiz.
      </p>
      <ul className="feature-list">
        <li>
          <strong>Vocab practice</strong> – see a word, then reveal its meaning and an example sentence.
        </li>
        <li>
          <strong>Mini quiz</strong> – pick the correct English translation for common German words.
        </li>
      </ul>
      <p className="hint">
        Tip: You can extend this later with verbs, grammar drills, spaced repetition, and more.
      </p>
    </section>
  )
}
