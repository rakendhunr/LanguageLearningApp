## Deutsch Buddy – German Learning App

This is a small but extensible React + TypeScript app built with Vite for learning German vocabulary.

The first version includes:

- **Overview**: short description of what the app does.
- **Vocabulary practice**: flashcard-style practice for a small set of German nouns (with articles and example sentences).
- **Quick quiz**: multiple-choice quiz where you pick the correct English translation for a German word.
<img width="1878" height="1018" alt="image" src="https://github.com/user-attachments/assets/8ca39601-7c82-4a5c-ac1b-f9bedf14f4a0" />
<img width="1836" height="1017" alt="image" src="https://github.com/user-attachments/assets/d8aff0e1-6ef6-4058-b986-1149289ce3f2" />
<img width="1861" height="1030" alt="image" src="https://github.com/user-attachments/assets/cb8b7c00-93eb-4971-b847-72f94273971a" />



The code is intentionally structured so you can grow it into a richer learning tool (e.g. by adding verbs, grammar drills, spaced repetition, user profiles, etc.).

### Getting started

- **Install dependencies**:

```bash
npm install
```

- **Run the dev server**:

```bash
npm run dev
```

Then open the printed URL in your browser (usually `http://localhost:5173`).

### Where to extend the app

- **Main layout and navigation**: `src/App.tsx`
- **Styling and layout**: `src/App.css` and `src/index.css`

Some concrete ideas for future improvements:

- Add more vocabulary groups (food, travel, family, etc.).
- Introduce difficulty levels (A1, A2, B1).
- Track progress and show how many words you’ve mastered.
- Add audio for pronunciation.
- Store user settings in local storage or a backend later on.

