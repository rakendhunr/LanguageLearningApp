import { useState } from 'react'
import './App.css'

type View = 'overview' | 'vocab' | 'quiz' | 'vocab-personal-info' | 'vocab-daily-life'

type VocabItem = {
  id: number
  german: string
  english: string
  article?: 'der' | 'die' | 'das'
  example?: string
}

const PERSONAL_INFO_VOCAB: VocabItem[] = [
  { id: 1, german: 'Name', english: 'name', article: 'der', example: 'Wie ist dein Name?' },
  { id: 2, german: 'Vorname', english: 'first name', article: 'der', example: 'Mein Vorname ist Anna.' },
  { id: 3, german: 'Nachname', english: 'surname / last name', article: 'der', example: 'Wie ist Ihr Nachname?' },
  { id: 4, german: 'Adresse', english: 'address', article: 'die', example: 'Meine Adresse ist in Berlin.' },
  { id: 5, german: 'Straße', english: 'street', article: 'die', example: 'Ich wohne in der Hauptstraße.' },
  { id: 6, german: 'Hausnummer', english: 'house number', article: 'die', example: 'Die Hausnummer ist 12.' },
  { id: 7, german: 'Stadt', english: 'city', article: 'die', example: 'Ich wohne in der Stadt München.' },
  { id: 8, german: 'Land', english: 'country', article: 'das', example: 'Deutschland ist ein Land in Europa.' },
  { id: 9, german: 'Geburtsdatum', english: 'date of birth', article: 'das', example: 'Mein Geburtsdatum ist der 3. März.' },
  { id: 10, german: 'Geburtsort', english: 'place of birth', article: 'der', example: 'Mein Geburtsort ist Köln.' },
  { id: 11, german: 'Alter', english: 'age', article: 'das', example: 'Ich bin 25 Jahre alt.' },
  { id: 12, german: 'Nationalität', english: 'nationality', article: 'die', example: 'Meine Nationalität ist deutsch.' },
  { id: 13, german: 'Sprache', english: 'language', article: 'die', example: 'Ich spreche die deutsche Sprache.' },
  { id: 14, german: 'Telefonnummer', english: 'phone number', article: 'die', example: 'Wie ist Ihre Telefonnummer?' },
  { id: 15, german: 'Familienstand', english: 'marital status', article: 'der', example: 'Mein Familienstand ist ledig.' },
]
const DAILY_LIFE_VOCAB: VocabItem[] = [
  { id: 101, german: 'aufstehen', english: 'to get up', example: 'Ich stehe um sieben Uhr auf.' },
  { id: 102, german: 'frühstücken', english: 'to have breakfast', example: 'Ich frühstücke mit meiner Familie.' },
  { id: 103, german: 'arbeiten', english: 'to work', example: 'Ich arbeite von neun bis fünf.' },
  { id: 104, german: 'lernen', english: 'to study / learn', example: 'Ich lerne jeden Abend Deutsch.' },
  { id: 105, german: 'schlafen', english: 'to sleep', example: 'Ich schlafe meistens acht Stunden.' },
  { id: 106, german: 'kochen', english: 'to cook', example: 'Abends koche ich mit meiner Freundin.' },
  { id: 107, german: 'einkaufen', english: 'to go shopping (groceries)', example: 'Samstags kaufe ich im Supermarkt ein.' },
  { id: 108, german: 'zur Arbeit gehen', english: 'to go to work', example: 'Ich gehe mit dem Bus zur Arbeit.' },
  { id: 109, german: 'Pause machen', english: 'to take a break', example: 'Mittags mache ich eine kurze Pause.' },
  { id: 110, german: 'Mittagessen', english: 'lunch', article: 'das', example: 'Das Mittagessen ist um zwölf Uhr.' },
  { id: 111, german: 'Abendessen', english: 'dinner', article: 'das', example: 'Wir essen um 19 Uhr Abendessen.' },
  { id: 112, german: 'Zähne putzen', english: 'to brush teeth', example: 'Ich putze mir morgens die Zähne.' },
  { id: 113, german: 'sich duschen', english: 'to take a shower', example: 'Ich dusche jeden Morgen.' },
  { id: 114, german: 'Feierabend', english: 'end of the workday', article: 'der', example: 'Um 17 Uhr habe ich Feierabend.' },
  { id: 115, german: 'spazieren gehen', english: 'to go for a walk', example: 'Abends gehe ich oft spazieren.' },
]

const VOCAB: VocabItem[] = [...PERSONAL_INFO_VOCAB, ...DAILY_LIFE_VOCAB]

type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

type TopicGroup = {
  id: string
  name: string
  level: LevelId
}

const LEVELS: LevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1']

const TOPIC_GROUPS: TopicGroup[] = [
  { id: 'a1-personal-info', name: 'Personal Information', level: 'A1' },
  { id: 'a1-daily-life', name: 'Daily Life & Routine', level: 'A1' },
  { id: 'a1-housing-home', name: 'Housing & Home', level: 'A1' },
  { id: 'a1-food-drink', name: 'Food & Drink', level: 'A1' },
  { id: 'a1-shopping-services', name: 'Shopping & Services', level: 'A1' },
  { id: 'a1-work-education', name: 'Work & Education', level: 'A1' },
  { id: 'a1-leisure-hobbies', name: 'Leisure & Hobbies', level: 'A1' },
  { id: 'a1-health-body', name: 'Health & Body', level: 'A1' },
  { id: 'a1-essential-grammar', name: 'Essential Grammar Words', level: 'A1' },
]

type QuizQuestion = {
  id: number
  prompt: string
  correctAnswer: string
  options: string[]
}

type IntroScreenProps = {
  onStart: () => void
}

type VocabPracticeProps = {
  onOpenPersonalInfo: () => void
  onOpenDailyLife: () => void
}

type PersonalInfoTrainerProps = {
  onBack: () => void
}

type DailyLifeTrainerProps = {
  onBack: () => void
}

function buildQuizQuestions(source: VocabItem[], count = 5): QuizQuestion[] {
  const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, Math.min(count, source.length))
  return shuffled.map((item, index) => {
    const distractors = [...source]
      .filter((other) => other.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((d) => d.english)

    const options = [...new Set([item.english, ...distractors])]
    options.sort(() => Math.random() - 0.5)

    return {
      id: index + 1,
      prompt: item.german,
      correctAnswer: item.english,
      options,
    }
  })
}

function IntroScreen({ onStart }: IntroScreenProps) {
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

function Overview() {
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

function VocabPractice({ onOpenPersonalInfo }: VocabPracticeProps) {
  const [activeLevel, setActiveLevel] = useState<LevelId>('A1')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('a1-personal-info')

  const topicsForLevel = TOPIC_GROUPS.filter((topic) => topic.level === activeLevel)

  return (
    <section className="panel vocab-panel">
      <h2>Vocabulary by level</h2>
      <p className="panel-subtitle">
        Choose your level, then pick a topic. We will add detailed vocabulary lists into each topic next.
      </p>

      <div className="level-row">
        {LEVELS.map((level) => {
          const firstTopicForLevel = TOPIC_GROUPS.find((topic) => topic.level === level)
          return (
            <button
              key={level}
              type="button"
              className={activeLevel === level ? 'level-pill active' : 'level-pill'}
              onClick={() => {
                setActiveLevel(level)
                setSelectedTopicId(firstTopicForLevel?.id ?? null)
              }}
            >
              {level}
            </button>
          )
        })}
      </div>

      {activeLevel === 'A1' && (
        <p className="hint">
          A1 focuses on everyday situations and simple sentences. These topics are a good starting point if you are
          just beginning German.
        </p>
      )}

      <div className="topic-grid">
        {topicsForLevel.length > 0 ? (
          topicsForLevel.map((topic) => (
            <article
              key={topic.id}
              className={selectedTopicId === topic.id ? 'topic-card active' : 'topic-card'}
              onClick={() => {
                setSelectedTopicId(topic.id)
                if (topic.id === 'a1-personal-info') {
                  onOpenPersonalInfo()
                } else if (topic.id === 'a1-daily-life') {
                  onOpenDailyLife()
                }
              }}
            >
              <h3 className="topic-title">{topic.name}</h3>
              <p className="topic-status">
                {topic.id === 'a1-personal-info'
                  ? 'Click to view key words and phrases about yourself.'
                  : 'Vocabulary for this topic will appear here soon.'}
              </p>
            </article>
          ))
        ) : (
          <p className="hint">Topics for {activeLevel} are coming soon.</p>
        )}
      </div>
    </section>
  )
}

function PersonalInfoTrainer({ onBack }: PersonalInfoTrainerProps) {
  const pageSize = 5
  const [page, setPage] = useState(0)

  const totalItems = PERSONAL_INFO_VOCAB.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = page * pageSize
  const end = Math.min(start + pageSize, totalItems)
  const itemsForPage = PERSONAL_INFO_VOCAB.slice(start, end)

  const speak = (text: string, rate = 1) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = rate
    window.speechSynthesis.speak(utterance)
  }

  const getEmoji = (german: string) => {
    const lower = german.toLowerCase()
    if (lower.includes('name')) return '🪪'
    if (lower.includes('adresse') || lower.includes('straße') || lower.includes('hausnummer')) return '🏠'
    if (lower.includes('stadt')) return '🏙️'
    if (lower.includes('land')) return '🌍'
    if (lower.includes('geburtsdatum') || lower.includes('geburtsort')) return '🎂'
    if (lower.includes('alter')) return '⌛'
    if (lower.includes('nationalität')) return '🗺️'
    if (lower.includes('sprache')) return '💬'
    if (lower.includes('telefon')) return '📞'
    if (lower.includes('familienstand')) return '👨‍👩‍👦'
    return '🧠'
  }

  return (
    <section className="panel trainer-panel">
      <button type="button" className="trainer-back" onClick={onBack}>
        ← Back to A1 topics
      </button>

      <h2>Personal Information – step-by-step</h2>
      <p className="panel-subtitle">
        Learn a few key words at a time. Listen to the pronunciation, read the meaning, and repeat out loud.
      </p>

      <div className="trainer-list">
        {itemsForPage.map((item) => {
          const contextExamples: string[] = (() => {
            switch (item.german) {
              case 'Name':
                return ['Ich heiße Lara.', 'Mein Name ist Tom Müller.']
              case 'Vorname':
                return ['Mein Vorname ist Lara.', 'Wie ist dein Vorname?']
              case 'Nachname':
                return ['Wie ist Ihr Nachname?', 'Mein Nachname ist Schneider.']
              case 'Adresse':
                return ['Meine Adresse ist Bahnhofstraße 10.', 'Können Sie Ihre Adresse bitte wiederholen?']
              case 'Straße':
                return ['Ich wohne in der Parkstraße.', 'In welcher Straße wohnen Sie?']
              case 'Hausnummer':
                return ['Die Hausnummer ist 24b.', 'Wie ist deine Hausnummer?']
              case 'Stadt':
                return ['Ich wohne in der Stadt Leipzig.', 'In welcher Stadt wohnen Sie?']
              case 'Land':
                return ['Ich komme aus dem Land Deutschland.', 'In welchem Land wohnen Sie jetzt?']
              case 'Geburtsdatum':
                return ['Mein Geburtsdatum ist der 5. Juli 1998.', 'Bitte tragen Sie Ihr Geburtsdatum ein.']
              case 'Geburtsort':
                return ['Mein Geburtsort ist Wien.', 'Wo ist Ihr Geburtsort?']
              case 'Alter':
                return ['Ich bin 30 Jahre alt.', 'Wie alt sind Sie?']
              case 'Nationalität':
                return ['Meine Nationalität ist indisch.', 'Welche Nationalität haben Sie?']
              case 'Sprache':
                return ['Ich spreche Deutsch und Englisch.', 'Welche Sprache sprichst du zu Hause?']
              case 'Telefonnummer':
                return ['Meine Telefonnummer ist 0176 123456.', 'Wie ist Ihre Telefonnummer?']
              case 'Familienstand':
                return ['Mein Familienstand ist verheiratet.', 'Sind Sie ledig oder verheiratet?']
              default:
                return []
            }
          })()

          return (
            <article key={item.id} className="trainer-card">
              <div className="trainer-image" aria-hidden="true">
                <span className="trainer-emoji">{getEmoji(item.german)}</span>
              </div>
              <div className="trainer-main">
                <div className="trainer-word-row">
                  {item.article && <span className="vocab-article">{item.article}</span>}
                  <span className="trainer-german">{item.german}</span>
                </div>
                <div className="trainer-english">{item.english}</div>
                {item.example && <div className="trainer-example">{item.example}</div>}

                <div className="trainer-actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      speak(item.german)
                    }}
                  >
                    ▶ Pronounce word
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      speak(item.german, 0.7)
                    }}
                  >
                    ▶ Slow & clear
                  </button>
                </div>
              </div>
              {contextExamples.length > 0 && (
                <div className="trainer-context">
                  <p className="trainer-context-label">In context</p>
                  <ul className="trainer-context-list">
                    {contextExamples.map((ex, index) => (
                      <li key={index}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="trainer-pagination">
        <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Previous
        </button>
        <span className="trainer-page-indicator">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </section>
  )
}

function DailyLifeTrainer({ onBack }: DailyLifeTrainerProps) {
  const pageSize = 5
  const [page, setPage] = useState(0)

  const totalItems = DAILY_LIFE_VOCAB.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = page * pageSize
  const end = Math.min(start + pageSize, totalItems)
  const itemsForPage = DAILY_LIFE_VOCAB.slice(start, end)

  const speak = (text: string, rate = 1) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = rate
    window.speechSynthesis.speak(utterance)
  }

  const getEmoji = (german: string) => {
    const lower = german.toLowerCase()
    if (lower.includes('aufstehen')) return '⏰'
    if (lower.includes('frühstück')) return '🥐'
    if (lower.includes('arbeiten') || lower.includes('arbeit')) return '💼'
    if (lower.includes('lernen')) return '📚'
    if (lower.includes('schlafen')) return '🛏️'
    if (lower.includes('kochen')) return '🍳'
    if (lower.includes('einkaufen')) return '🛒'
    if (lower.includes('pause')) return '☕'
    if (lower.includes('mittag')) return '🍽️'
    if (lower.includes('abendessen')) return '🍲'
    if (lower.includes('zähne')) return '🪥'
    if (lower.includes('duschen')) return '🚿'
    if (lower.includes('feierabend')) return '🎉'
    if (lower.includes('spazieren')) return '🚶'
    return '🧠'
  }

  return (
    <section className="panel trainer-panel">
      <button type="button" className="trainer-back" onClick={onBack}>
        ← Back to A1 topics
      </button>

      <h2>Daily Life & Routine – step-by-step</h2>
      <p className="panel-subtitle">
        Learn useful verbs and words for your everyday routine. Listen, repeat, and connect them to your own day.
      </p>

      <div className="trainer-list">
        {itemsForPage.map((item) => {
          const contextExamples: string[] = (() => {
            switch (item.german) {
              case 'aufstehen':
                return ['Ich stehe werktags um sechs Uhr auf.', 'Wann stehst du am Wochenende auf?']
              case 'frühstücken':
                return ['Ich frühstücke um halb acht.', 'Wir frühstücken zusammen in der Küche.']
              case 'arbeiten':
                return ['Ich arbeite in einem Büro.', 'Mein Bruder arbeitet in einer Schule.']
              case 'lernen':
                return ['Ich lerne jeden Tag eine Stunde Deutsch.', 'Lisa lernt für die Prüfung.']
              case 'schlafen':
                return ['Ich schlafe acht Stunden pro Nacht.', 'Die Kinder schlafen schon.']
              case 'kochen':
                return ['Heute koche ich Pasta.', 'Wer kocht heute das Abendessen?']
              case 'einkaufen':
                return ['Ich kaufe am Samstag ein.', 'Wir gehen im Supermarkt einkaufen.']
              case 'zur Arbeit gehen':
                return ['Ich gehe zu Fuß zur Arbeit.', 'Sie fährt mit dem Auto zur Arbeit.']
              case 'Pause machen':
                return ['Ich mache um zwölf Uhr Pause.', 'Wir machen eine kurze Kaffeepause.']
              case 'Mittagessen':
                return ['Das Mittagessen ist lecker.', 'Wir haben eine halbe Stunde Mittagessen.']
              case 'Abendessen':
                return ['Zum Abendessen gibt es Suppe.', 'Wir essen spät Abendessen.']
              case 'Zähne putzen':
                return ['Ich putze mir abends die Zähne.', 'Die Kinder putzen ihre Zähne nach dem Essen.']
              case 'sich duschen':
                return ['Ich dusche nach dem Sport.', 'Morgens dusche ich kurz.']
              case 'Feierabend':
                return ['Um 18 Uhr habe ich Feierabend.', 'Nach Feierabend treffe ich Freunde.']
              case 'spazieren gehen':
                return ['Wir gehen nach dem Essen spazieren.', 'Am Sonntag gehe ich im Park spazieren.']
              default:
                return []
            }
          })()

          return (
            <article key={item.id} className="trainer-card">
              <div className="trainer-image" aria-hidden="true">
                <span className="trainer-emoji">{getEmoji(item.german)}</span>
              </div>
              <div className="trainer-main">
                <div className="trainer-word-row">
                  {item.article && <span className="vocab-article">{item.article}</span>}
                  <span className="trainer-german">{item.german}</span>
                </div>
                <div className="trainer-english">{item.english}</div>
                {item.example && <div className="trainer-example">{item.example}</div>}

                <div className="trainer-actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      speak(item.german)
                    }}
                  >
                    ▶ Pronounce word
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      speak(item.german, 0.7)
                    }}
                  >
                    ▶ Slow & clear
                  </button>
                </div>
              </div>
              {contextExamples.length > 0 && (
                <div className="trainer-context">
                  <p className="trainer-context-label">In context</p>
                  <ul className="trainer-context-list">
                    {contextExamples.map((ex, index) => (
                      <li key={index}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="trainer-pagination">
        <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Previous
        </button>
        <span className="trainer-page-indicator">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </section>
  )
}

function MiniQuiz() {
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

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [view, setView] = useState<View>('overview')

  if (!hasStarted) {
    return <IntroScreen onStart={() => setHasStarted(true)} />
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Deutsch Buddy</h1>
        <p className="tagline">Build your German step by step.</p>
      </header>

      <nav className="tabs">
        <button
          type="button"
          className={view === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setView('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          className={view === 'vocab' || view === 'vocab-personal-info' || view === 'vocab-daily-life' ? 'tab active' : 'tab'}
          onClick={() => setView('vocab')}
        >
          Vocab
        </button>
        <button
          type="button"
          className={view === 'quiz' ? 'tab active' : 'tab'}
          onClick={() => setView('quiz')}
        >
          Quiz
        </button>
      </nav>

      <main className="app-main">
        {view === 'overview' && <Overview />}
        {view === 'vocab' && (
          <VocabPractice
            onOpenPersonalInfo={() => setView('vocab-personal-info')}
            onOpenDailyLife={() => setView('vocab-daily-life')}
          />
        )}
        {view === 'vocab-personal-info' && <PersonalInfoTrainer onBack={() => setView('vocab')} />}
        {view === 'vocab-daily-life' && <DailyLifeTrainer onBack={() => setView('vocab')} />}
        {view === 'quiz' && <MiniQuiz />}
      </main>

      <footer className="app-footer">
        <span>Designed to grow with your German learning journey.</span>
      </footer>
    </div>
  )
}

export default App
