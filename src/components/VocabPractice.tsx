import { useState } from 'react'
import type { VocabPracticeProps, LevelId } from '../types'
import topics from '../data/topics.json'

export function VocabPractice({
  onOpenPersonalInfo,
  onOpenDailyLife,
  onOpenHousing,
  onOpenFood,
  onOpenShopping,
  onOpenWork,
  onOpenLeisure,
  onOpenHealth,
  onOpenGrammar,
  onOpenTravel,
  onOpenRestaurants,
  onOpenClothing,
  onOpenWeatherNature,
  onOpenAppearance,
  onOpenPastEvents,
  onOpenPlanningFuture,
  onOpenProblemsSolutions,
}: VocabPracticeProps) {
  const [activeLevel, setActiveLevel] = useState<LevelId>('A1')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('a1-personal-info')

  const LEVELS: LevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1']
  const TOPIC_GROUPS = topics

  const topicsForLevel = TOPIC_GROUPS.filter((topic) => topic.level === activeLevel)

  const onOpenHandlers: Record<string, () => void> = {
    'a1-personal-info': onOpenPersonalInfo,
    'a1-daily-life': onOpenDailyLife,
    'a1-housing-home': onOpenHousing,
    'a1-food-drink': onOpenFood,
    'a1-shopping-services': onOpenShopping,
    'a1-work-education': onOpenWork,
    'a1-leisure-hobbies': onOpenLeisure,
    'a1-health-body': onOpenHealth,
    'a1-essential-grammar': onOpenGrammar,
    'a2-travel': onOpenTravel,
    'a2-restaurants': onOpenRestaurants,
    'a2-clothing': onOpenClothing,
    'a2-weather-nature': onOpenWeatherNature,
    'a2-appearance': onOpenAppearance,
    'a2-past-events': onOpenPastEvents,
    'a2-planning-future': onOpenPlanningFuture,
    'a2-problems-solutions': onOpenProblemsSolutions,
  }

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

      {activeLevel === 'A2' && (
        <p className="hint">
          A2 builds on your A1 knowledge with more complex conversations and expanded vocabulary. Topics cover practical
          real-world situations at an elementary proficiency level.
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
                const handler = onOpenHandlers[topic.id]
                if (handler) {
                  handler()
                }
              }}
            >
              <h3 className="topic-title">{topic.name}</h3>
              <p className="topic-status">
                {topic.id === 'a1-personal-info'
                  ? 'Click to view key words and phrases about yourself.'
                  : 'Click to learn essential vocabulary for this topic.'}
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
