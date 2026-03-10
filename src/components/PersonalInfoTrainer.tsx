import { useState } from 'react'
import type { PersonalInfoTrainerProps } from '../types'
import { PERSONAL_INFO_VOCAB } from '../data/vocabData'
import { speak, getEmojiForPersonalInfo } from '../utils/helpers'

export function PersonalInfoTrainer({ onBack }: PersonalInfoTrainerProps) {
  const pageSize = 5
  const [page, setPage] = useState(0)

  const totalItems = PERSONAL_INFO_VOCAB.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = page * pageSize
  const end = Math.min(start + pageSize, totalItems)
  const itemsForPage = PERSONAL_INFO_VOCAB.slice(start, end)

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
                <span className="trainer-emoji">{getEmojiForPersonalInfo(item.german)}</span>
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
