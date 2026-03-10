import { useState } from 'react'
import './App.css'
import type { View } from './types'
import {
  HOUSING_VOCAB,
  FOOD_VOCAB,
  SHOPPING_VOCAB,
  WORK_VOCAB,
  LEISURE_VOCAB,
  HEALTH_VOCAB,
  GRAMMAR_VOCAB,
  TRAVEL_VOCAB,
  RESTAURANTS_VOCAB,
  CLOTHING_VOCAB,
  WEATHER_NATURE_VOCAB,
  APPEARANCE_VOCAB,
  PAST_EVENTS_VOCAB,
  PLANNING_FUTURE_VOCAB,
  PROBLEMS_SOLUTIONS_VOCAB,
  HOUSING_CONTEXT_EXAMPLES,
  FOOD_CONTEXT_EXAMPLES,
  SHOPPING_CONTEXT_EXAMPLES,
  WORK_CONTEXT_EXAMPLES,
  LEISURE_CONTEXT_EXAMPLES,
  HEALTH_CONTEXT_EXAMPLES,
  GRAMMAR_CONTEXT_EXAMPLES,
  TRAVEL_CONTEXT_EXAMPLES,
  RESTAURANTS_CONTEXT_EXAMPLES,
  CLOTHING_CONTEXT_EXAMPLES,
  WEATHER_NATURE_CONTEXT_EXAMPLES,
  APPEARANCE_CONTEXT_EXAMPLES,
  PAST_EVENTS_CONTEXT_EXAMPLES,
  PLANNING_FUTURE_CONTEXT_EXAMPLES,
  PROBLEMS_SOLUTIONS_CONTEXT_EXAMPLES,
} from './data/vocabData'
import { IntroScreen } from './components/IntroScreen'
import { Overview } from './components/Overview'
import { VocabPractice } from './components/VocabPractice'
import { PersonalInfoTrainer } from './components/PersonalInfoTrainer'
import { DailyLifeTrainer } from './components/DailyLifeTrainer'
import { GenericTrainer } from './components/GenericTrainer'
import { MiniQuiz } from './components/MiniQuiz'

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
          className={view === 'vocab' || view === 'vocab-personal-info' || view === 'vocab-daily-life' || view === 'vocab-housing' || view === 'vocab-food' || view === 'vocab-shopping' || view === 'vocab-work' || view === 'vocab-leisure' || view === 'vocab-health' || view === 'vocab-grammar' || view === 'vocab-travel' || view === 'vocab-restaurants' || view === 'vocab-clothing' || view === 'vocab-weather-nature' || view === 'vocab-appearance' || view === 'vocab-past-events' || view === 'vocab-planning-future' || view === 'vocab-problems-solutions' ? 'tab active' : 'tab'}
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
            onOpenHousing={() => setView('vocab-housing')}
            onOpenFood={() => setView('vocab-food')}
            onOpenShopping={() => setView('vocab-shopping')}
            onOpenWork={() => setView('vocab-work')}
            onOpenLeisure={() => setView('vocab-leisure')}
            onOpenHealth={() => setView('vocab-health')}
            onOpenGrammar={() => setView('vocab-grammar')}
            onOpenTravel={() => setView('vocab-travel')}
            onOpenRestaurants={() => setView('vocab-restaurants')}
            onOpenClothing={() => setView('vocab-clothing')}
            onOpenWeatherNature={() => setView('vocab-weather-nature')}
            onOpenAppearance={() => setView('vocab-appearance')}
            onOpenPastEvents={() => setView('vocab-past-events')}
            onOpenPlanningFuture={() => setView('vocab-planning-future')}
            onOpenProblemsSolutions={() => setView('vocab-problems-solutions')}
          />
        )}
        {view === 'vocab-personal-info' && <PersonalInfoTrainer onBack={() => setView('vocab')} />}
        {view === 'vocab-travel' && <GenericTrainer vocab={TRAVEL_VOCAB} title="Travel & Transportation – step-by-step" subtitle="Master vocabulary for journeys, vehicles, and travel situations." contextExamplesMap={TRAVEL_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-restaurants' && <GenericTrainer vocab={RESTAURANTS_VOCAB} title="Restaurants & Dining – step-by-step" subtitle="Learn essential vocabulary for eating out and dining experiences." contextExamplesMap={RESTAURANTS_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-clothing' && <GenericTrainer vocab={CLOTHING_VOCAB} title="Clothes & Fashion – step-by-step" subtitle="Expand your fashion vocabulary and learn about clothing terms." contextExamplesMap={CLOTHING_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-weather-nature' && <GenericTrainer vocab={WEATHER_NATURE_VOCAB} title="Weather & Nature – step-by-step" subtitle="Discover vocabulary for weather, plants, and natural environments." contextExamplesMap={WEATHER_NATURE_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-appearance' && <GenericTrainer vocab={APPEARANCE_VOCAB} title="Appearance & Descriptions – step-by-step" subtitle="Learn words for describing people and physical characteristics." contextExamplesMap={APPEARANCE_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-past-events' && <GenericTrainer vocab={PAST_EVENTS_VOCAB} title="Past Events & Stories – step-by-step" subtitle="Master vocabulary for talking about past events and storytelling." contextExamplesMap={PAST_EVENTS_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-planning-future' && <GenericTrainer vocab={PLANNING_FUTURE_VOCAB} title="Planning & Future – step-by-step" subtitle="Learn words for discussing plans, hopes, and future intentions." contextExamplesMap={PLANNING_FUTURE_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-problems-solutions' && <GenericTrainer vocab={PROBLEMS_SOLUTIONS_VOCAB} title="Problems & Complaints – step-by-step" subtitle="Develop vocabulary for discussing problems and finding solutions." contextExamplesMap={PROBLEMS_SOLUTIONS_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-daily-life' && <DailyLifeTrainer onBack={() => setView('vocab')} />}
        {view === 'vocab-housing' && <GenericTrainer vocab={HOUSING_VOCAB} title="Housing & Home – step-by-step" subtitle="Learn vocabulary about homes, rooms, and furniture." contextExamplesMap={HOUSING_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-food' && <GenericTrainer vocab={FOOD_VOCAB} title="Food & Drink – step-by-step" subtitle="Explore German vocabulary for meals, food items, and beverages." contextExamplesMap={FOOD_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-shopping' && <GenericTrainer vocab={SHOPPING_VOCAB} title="Shopping & Services – step-by-step" subtitle="Learn words for shopping, money, and everyday services." contextExamplesMap={SHOPPING_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-work' && <GenericTrainer vocab={WORK_VOCAB} title="Work & Education – step-by-step" subtitle="Discover career and educational vocabulary in German." contextExamplesMap={WORK_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-leisure' && <GenericTrainer vocab={LEISURE_VOCAB} title="Leisure & Hobbies – step-by-step" subtitle="Learn words for sports, games, music, and fun activities." contextExamplesMap={LEISURE_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-health' && <GenericTrainer vocab={HEALTH_VOCAB} title="Health & Body – step-by-step" subtitle="Master vocabulary for body parts, health, and wellness." contextExamplesMap={HEALTH_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'vocab-grammar' && <GenericTrainer vocab={GRAMMAR_VOCAB} title="Essential Grammar Words – step-by-step" subtitle="Learn key grammatical terms and concepts in German." contextExamplesMap={GRAMMAR_CONTEXT_EXAMPLES} onBack={() => setView('vocab')} />}
        {view === 'quiz' && <MiniQuiz />}
      </main>

      <footer className="app-footer">
        <span>Designed to grow with your German learning journey.</span>
      </footer>
    </div>
  )
}

export default App
