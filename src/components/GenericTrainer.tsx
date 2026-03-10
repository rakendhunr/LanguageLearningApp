import { useState } from 'react'
import type { GenericTrainerProps } from '../types'
import { speak, getEmojiGeneric } from '../utils/helpers'

export function GenericTrainer({ vocab, title, subtitle, contextExamplesMap = {}, onBack }: GenericTrainerProps) {
  const pageSize = 5
  const [page, setPage] = useState(0)

  const totalItems = vocab.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = page * pageSize
  const end = Math.min(start + pageSize, totalItems)
  const itemsForPage = vocab.slice(start, end)

  return (
    <section className="panel trainer-panel">
      <button type="button" className="trainer-back" onClick={onBack}>
        ← Back to A1 topics
      </button>

      <h2>{title}</h2>
      <p className="panel-subtitle">{subtitle}</p>

      <div className="trainer-list">
        {itemsForPage.map((item) => {
          const contextExamples = contextExamplesMap[item.german] || []
          return (
            <article key={item.id} className="trainer-card">
              <div className="trainer-image" aria-hidden="true">
                <span className="trainer-emoji">{getEmojiGeneric(item.german)}</span>
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
