import personalInfoData from './personal-info.json'
import dailyLifeData from './daily-life.json'
import housingData from './housing.json'
import foodData from './food.json'
import shoppingData from './shopping.json'
import workData from './work.json'
import leisureData from './leisure.json'
import healthData from './health.json'
import grammarData from './grammar.json'
import contextExamplesData from './contextExamples.json'
import travelData from './a2-travel.json'
import restaurantsData from './a2-restaurants.json'
import clothingData from './a2-clothing.json'
import weatherNatureData from './a2-weather-nature.json'
import appearanceData from './a2-appearance.json'
import pastEventsData from './a2-past-events.json'
import planningFutureData from './a2-planning-future.json'
import problemsSolutionsData from './a2-problems-solutions.json'
import a2ContextExamplesData from './a2-contextExamples.json'

export type VocabItem = {
  id: number
  german: string
  english: string
  article?: 'der' | 'die' | 'das'
  example?: string
}

// A1 Vocabularies
export const PERSONAL_INFO_VOCAB: VocabItem[] = personalInfoData as VocabItem[]
export const DAILY_LIFE_VOCAB: VocabItem[] = dailyLifeData as VocabItem[]
export const HOUSING_VOCAB: VocabItem[] = housingData as VocabItem[]
export const FOOD_VOCAB: VocabItem[] = foodData as VocabItem[]
export const SHOPPING_VOCAB: VocabItem[] = shoppingData as VocabItem[]
export const WORK_VOCAB: VocabItem[] = workData as VocabItem[]
export const LEISURE_VOCAB: VocabItem[] = leisureData as VocabItem[]
export const HEALTH_VOCAB: VocabItem[] = healthData as VocabItem[]
export const GRAMMAR_VOCAB: VocabItem[] = grammarData as VocabItem[]

// A2 Vocabularies
export const TRAVEL_VOCAB: VocabItem[] = travelData as VocabItem[]
export const RESTAURANTS_VOCAB: VocabItem[] = restaurantsData as VocabItem[]
export const CLOTHING_VOCAB: VocabItem[] = clothingData as VocabItem[]
export const WEATHER_NATURE_VOCAB: VocabItem[] = weatherNatureData as VocabItem[]
export const APPEARANCE_VOCAB: VocabItem[] = appearanceData as VocabItem[]
export const PAST_EVENTS_VOCAB: VocabItem[] = pastEventsData as VocabItem[]
export const PLANNING_FUTURE_VOCAB: VocabItem[] = planningFutureData as VocabItem[]
export const PROBLEMS_SOLUTIONS_VOCAB: VocabItem[] = problemsSolutionsData as VocabItem[]

export const VOCAB: VocabItem[] = [
  ...PERSONAL_INFO_VOCAB,
  ...DAILY_LIFE_VOCAB,
  ...HOUSING_VOCAB,
  ...FOOD_VOCAB,
  ...SHOPPING_VOCAB,
  ...WORK_VOCAB,
  ...LEISURE_VOCAB,
  ...HEALTH_VOCAB,
  ...GRAMMAR_VOCAB,
  ...TRAVEL_VOCAB,
  ...RESTAURANTS_VOCAB,
  ...CLOTHING_VOCAB,
  ...WEATHER_NATURE_VOCAB,
  ...APPEARANCE_VOCAB,
  ...PAST_EVENTS_VOCAB,
  ...PLANNING_FUTURE_VOCAB,
  ...PROBLEMS_SOLUTIONS_VOCAB,
]

export const CONTEXT_EXAMPLES: Record<string, Record<string, string[]>> = contextExamplesData

export const HOUSING_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['housing']
export const FOOD_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['food']
export const SHOPPING_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['shopping']
export const WORK_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['work']
export const LEISURE_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['leisure']
export const HEALTH_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['health']
export const GRAMMAR_CONTEXT_EXAMPLES: Record<string, string[]> = CONTEXT_EXAMPLES['grammar']

// A2 Context Examples
export const A2_CONTEXT_EXAMPLES: Record<string, Record<string, string[]>> = a2ContextExamplesData

export const TRAVEL_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['travel']
export const RESTAURANTS_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['restaurants']
export const CLOTHING_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['clothing']
export const WEATHER_NATURE_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['weather-nature']
export const APPEARANCE_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['appearance']
export const PAST_EVENTS_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['past-events']
export const PLANNING_FUTURE_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['planning-future']
export const PROBLEMS_SOLUTIONS_CONTEXT_EXAMPLES: Record<string, string[]> = A2_CONTEXT_EXAMPLES['problems-solutions']
