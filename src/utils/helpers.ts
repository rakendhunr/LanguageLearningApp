import type { VocabItem, QuizQuestion } from '../types'

export const speak = (text: string, rate = 1) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
}

export const getEmojiForPersonalInfo = (german: string): string => {
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

export const getEmojiForDailyLife = (german: string): string => {
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

export const getEmojiGeneric = (german: string): string => {
  const lower = german.toLowerCase()
  // Housing
  if (lower.includes('haus') || lower.includes('wohnung') || lower.includes('wohn')) return '🏠'
  if (lower.includes('zimmer')) return '🛏️'
  if (lower.includes('küche')) return '🍳'
  if (lower.includes('bad') || lower.includes('dusche')) return '🚿'
  if (lower.includes('fenster')) return '🪟'
  if (lower.includes('tür')) return '🚪'
  if (lower.includes('tisch') || lower.includes('stuhl') || lower.includes('sofa')) return '🪑'
  if (lower.includes('bett') || lower.includes('lampe')) return '💡'
  // Food
  if (lower.includes('brot')) return '🍞'
  if (lower.includes('käse')) return '🧀'
  if (lower.includes('milch')) return '🥛'
  if (lower.includes('ei')) return '🥚'
  if (lower.includes('fleisch')) return '🥩'
  if (lower.includes('fisch')) return '🐟'
  if (lower.includes('apfel') || lower.includes('obst')) return '🍎'
  if (lower.includes('orange')) return '🍊'
  if (lower.includes('salat')) return '🥗'
  if (lower.includes('suppe')) return '🍲'
  if (lower.includes('wasser')) return '💧'
  if (lower.includes('kaffee')) return '☕'
  if (lower.includes('tee')) return '🫖'
  if (lower.includes('bier')) return '🍺'
  if (lower.includes('restaurant')) return '🍽️'
  // Shopping
  if (lower.includes('supermarkt') || lower.includes('geschäft')) return '🏪'
  if (lower.includes('preis') || lower.includes('geld') || lower.includes('euro')) return '💰'
  if (lower.includes('kasse')) return '💳'
  if (lower.includes('kleid') || lower.includes('hemd') || lower.includes('hose')) return '👗'
  if (lower.includes('schuh')) return '👟'
  // Work & Education
  if (lower.includes('arbeit') || lower.includes('beruf')) return '💼'
  if (lower.includes('lehrer') || lower.includes('schule') || lower.includes('universität')) return '🎓'
  if (lower.includes('arzt')) return '⚕️'
  if (lower.includes('krankenschwester')) return '🏥'
  if (lower.includes('ingenieur')) return '🔧'
  if (lower.includes('büro')) return '🖊️'
  if (lower.includes('lektion') || lower.includes('prüfung')) return '📖'
  if (lower.includes('urlaub')) return '✈️'
  // Leisure
  if (lower.includes('sport') || lower.includes('fußball') || lower.includes('tennis')) return '⚽'
  if (lower.includes('schwimmen')) return '🏊'
  if (lower.includes('musik') || lower.includes('gitarre') || lower.includes('klavier')) return '🎸'
  if (lower.includes('buch')) return '📚'
  if (lower.includes('film') || lower.includes('kino')) return '🎬'
  if (lower.includes('spiel')) return '🎮'
  if (lower.includes('malen') || lower.includes('zeichnen')) return '🎨'
  if (lower.includes('reisen')) return '🌍'
  if (lower.includes('hobby')) return '🎯'
  // Health
  if (lower.includes('gesundheit') || lower.includes('krank')) return '❤️'
  if (lower.includes('kopf')) return '🧠'
  if (lower.includes('hals')) return '👂'
  if (lower.includes('herz')) return '💓'
  if (lower.includes('lunge')) return '🫁'
  if (lower.includes('arm') || lower.includes('bein')) return '💪'
  if (lower.includes('auge')) return '👁️'
  if (lower.includes('schmerz') || lower.includes('fieber')) return '🤒'
  if (lower.includes('husten') || lower.includes('schnupfen')) return '🤧'
  // Grammar
  if (lower.includes('artikel') || lower.includes('nomen') || lower.includes('verb')) return '📝'
  if (lower.includes('adjektiv')) return '✨'
  if (lower.includes('präposition') || lower.includes('konjunktion')) return '🔗'
  if (lower.includes('pronomen')) return '👤'
  if (lower.includes('satz') || lower.includes('frage') || lower.includes('antwort')) return '❓'
  if (lower.includes('wort')) return '🔤'
  return '🧠'
}

export const buildQuizQuestions = (source: VocabItem[], count = 5): QuizQuestion[] => {
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
