export type View =
  | 'overview'
  | 'vocab'
  | 'quiz'
  | 'vocab-personal-info'
  | 'vocab-daily-life'
  | 'vocab-housing'
  | 'vocab-food'
  | 'vocab-shopping'
  | 'vocab-work'
  | 'vocab-leisure'
  | 'vocab-health'
  | 'vocab-grammar'
  | 'vocab-travel'
  | 'vocab-restaurants'
  | 'vocab-clothing'
  | 'vocab-weather-nature'
  | 'vocab-appearance'
  | 'vocab-past-events'
  | 'vocab-planning-future'
  | 'vocab-problems-solutions'

export type VocabItem = {
  id: number
  german: string
  english: string
  article?: 'der' | 'die' | 'das'
  example?: string
}

export type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export type TopicGroup = {
  id: string
  name: string
  level: LevelId
}

export type QuizQuestion = {
  id: number
  prompt: string
  correctAnswer: string
  options: string[]
}

export type Level = {
  id: LevelId
  name: string
  description: string
}

export type UIConfig = {
  appTitle: string
  intro: {
    welcome: string
    description: string
    startButton: string
    description2: string
  }
  overview: {
    title: string
    selectLevel: string
  }
  vocabPractice: {
    title: string
    description: string
    selectopic: string
    back: string
  }
  personalInfo: {
    title: string
    subtitle: string
    contextLabel: string
  }
  dailyLife: {
    title: string
    subtitle: string
    examples: string
    contextLabel: string
  }
  genericTrainer: {
    contextLabel: string
    pronunciation: string
    youknowthis: string
    needMorePractice: string
  }
  quiz: {
    title: string
    description: string
    question: string
    yourAnswer: string
    submit: string
    nextQuestion: string
    correct: string
    incorrect: string
    correctAnswer: string
    yourCorrectAnswer: string
    finalScore: string
    questions: string
    backToOverview: string
    talkGerman: string
  }
  buttons: {
    back: string
    next: string
    submit: string
    start: string
  }
  pagination: {
    of: string
  }
}

// Component Props Types
export type IntroScreenProps = {
  onStart: () => void
}

export type OverviewProps = {
  onSelectLevel: (levelId: LevelId) => void
}

export type VocabPracticeProps = {
  onOpenPersonalInfo: () => void
  onOpenDailyLife: () => void
  onOpenHousing: () => void
  onOpenFood: () => void
  onOpenShopping: () => void
  onOpenWork: () => void
  onOpenLeisure: () => void
  onOpenHealth: () => void
  onOpenGrammar: () => void
  onOpenTravel: () => void
  onOpenRestaurants: () => void
  onOpenClothing: () => void
  onOpenWeatherNature: () => void
  onOpenAppearance: () => void
  onOpenPastEvents: () => void
  onOpenPlanningFuture: () => void
  onOpenProblemsSolutions: () => void
}

export type GenericTrainerProps = {
  vocab: VocabItem[]
  title: string
  subtitle: string
  contextExamplesMap?: Record<string, string[]>
  onBack: () => void
}

export type PersonalInfoTrainerProps = {
  onBack: () => void
}

export type DailyLifeTrainerProps = {
  onBack: () => void
}

export type MiniQuizProps = {
  onBack: () => void
  questions: QuizQuestion[]
}
