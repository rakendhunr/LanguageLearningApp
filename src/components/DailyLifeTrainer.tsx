import { useState } from 'react'
import type { DailyLifeTrainerProps } from '../types'
import { DAILY_LIFE_VOCAB } from '../data/vocabData'
import { speak, getEmojiForDailyLife } from '../utils/helpers'

export function DailyLifeTrainer({ onBack }: DailyLifeTrainerProps) {
  const pageSize = 5
  const [page, setPage] = useState(0)

  const totalItems = DAILY_LIFE_VOCAB.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = page * pageSize
  const end = Math.min(start + pageSize, totalItems)
  const itemsForPage = DAILY_LIFE_VOCAB.slice(start, end)

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
                <span className="trainer-emoji">{getEmojiForDailyLife(item.german)}</span>
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
