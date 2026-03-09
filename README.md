# SecureKey - Password Generator

A premium-quality password generator web application built with React, TailwindCSS, and modern UI/UX principles.

## Features

- **Password Generator**: Create secure, random passwords with customizable options
- **Batch Generator**: Generate multiple passwords at once
- **Password History**: View and manage previously generated passwords
- **Settings**: Customize default behavior and preferences
- **Strength Meter**: Real-time password strength analysis with entropy calculation
- **Modern UI**: Black, white, and yellow design system with smooth animations

## Tech Stack

- React 18
- TailwindCSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router DOM (routing)
- Vite (build tool)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Features Overview

### Password Options
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9)
- Symbols (!@#$%^&*)
- Exclude similar characters (i, l, 1, L, o, 0, O)
- Length: 4-64 characters

### Security Features
- Cryptographically secure random generation using `crypto.getRandomValues()`
- Entropy calculation
- Password strength analysis
- Local storage for history (client-side only)

### User Experience
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications
- Copy to clipboard functionality
- Show/hide password toggle
- Auto-copy option

## Design System

### Colors
- Background: Black (#000000)
- Cards: Zinc-900 (#18181b)
- Borders: Zinc-700 (#3f3f46)
- Primary: Yellow-400 (#facc15)
- Text: White (#ffffff)

### Typography
- Font: System fonts with antialiasing
- Monospace for passwords

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── PasswordDisplay.jsx
│   ├── LengthSlider.jsx
│   ├── OptionsPanel.jsx
│   ├── StrengthMeter.jsx
│   ├── GenerateButton.jsx
│   └── ToastNotification.jsx
├── pages/
│   ├── Home.jsx
│   ├── BatchGenerator.jsx
│   ├── History.jsx
│   └── Settings.jsx
├── utils/
│   ├── passwordGenerator.js
│   ├── entropyCalculator.js
│   ├── strengthChecker.js
│   ├── clipboard.js
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## License

MIT
