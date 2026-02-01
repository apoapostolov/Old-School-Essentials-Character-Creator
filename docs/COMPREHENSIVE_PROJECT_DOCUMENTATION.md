# OSE Character Roller - Comprehensive Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [Component Library](#component-library)
5. [State Management](#state-management)
6. [UI/UX Design System](#uiux-design-system)
7. [AI Integration](#ai-integration)
8. [PDF Generation](#pdf-generation)
9. [Game Mechanics Implementation](#game-mechanics-implementation)
10. [Theming System](#theming-system)
11. [Deployment & Build](#deployment--build)
12. [Adaptation Guide for Other Games](#adaptation-guide-for-other-games)
13. [Best Practices & Patterns](#best-practices--patterns)

---

## Project Overview

### What is OSE Character Roller?

The OSE Character Roller is a comprehensive web-based character creation tool for Old School Essentials (OSE) tabletop RPG. It provides:

- **Automated dice rolling** for ability scores
- **Class selection** with eligibility checking
- **Equipment management** with cost/weight tracking
- **AI-powered content generation** (names, traits, portraits, backstories)
- **PDF character sheet generation** with form filling
- **Progressive workflow** with tab-based navigation

### Key Features

- 🎲 **Smart Dice Rolling**: 3d6 ability score generation with point-buy adjustments
- 🏛️ **Multi-Class Support**: Basic, Demihuman, and Advanced class options
- 🎒 **Equipment Kits**: Pre-configured and customizable equipment sets
- 🎨 **AI Art Generation**: Character portraits with emotional variants
- 📝 **Dynamic PDF Export**: Automated character sheet filling
- 🌟 **Theme System**: Grimdark, High Fantasy, and Pulp Adventure themes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

---

## Technology Stack

### Core Framework

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "typescript": "~5.8.2"
}
```

### Build & Development Tools

```json
{
  "vite": "^6.2.0",
  "@vitejs/plugin-react": "^5.0.0",
  "@types/node": "^22.14.0"
}
```

### Key Libraries

```json
{
  "pdf-lib": "1.17.1",        // PDF manipulation and form filling
  "@google/genai": "latest"   // Google Generative AI integration
}
```

### Why These Choices?

- **React 18**: Modern hooks, concurrent features, excellent TypeScript support
- **Vite**: Lightning-fast development server, optimal bundling, modern ESM support
- **TypeScript**: Type safety, better IDE support, reduced runtime errors
- **pdf-lib**: Client-side PDF generation without server dependencies
- **Google GenAI**: State-of-the-art AI for content generation

---

## Architecture & Design Patterns

### Project Structure

```dir
ose-character-roller/
├── components/           # Reusable UI components
│   ├── AbilityScoreDisplay.tsx
│   ├── ClassCard.tsx
│   ├── TabButton.tsx
│   └── ...
├── hooks/               # Custom React hooks for state management
│   ├── useCharacterState.ts
│   ├── useEquipmentState.ts
│   └── useUIState.ts
├── utils/               # Utility modules
│   ├── aiGeneration.ts
│   ├── pdfGeneration.ts
│   └── tabManagement.ts
├── data/                # Game data and configuration
│   ├── class-data.ts
│   ├── item-data.ts
│   ├── equipment-kits.ts
│   └── ...
├── types.ts             # TypeScript type definitions
├── constants.ts         # Game constants and enums
└── App.tsx             # Main application component
```

### Design Patterns Used

#### 1. Custom Hooks Pattern

**Purpose**: Separate business logic from UI components

```typescript
// Example: useCharacterState.ts
export interface CharacterState {
  scores: AbilityScores | null;
  selectedClass: ClassInfo | null;
  characterLevel: number;
  // ... other state
}

export interface CharacterActions {
  rollStats: () => void;
  selectClass: (classInfo: ClassInfo) => void;
  changeLevel: (level: number) => void;
  // ... other actions
}

export function useCharacterState(): [CharacterState, CharacterActions] {
  // Implementation details...
}
```

#### 2. Utility Modules Pattern

**Purpose**: Organize complex functionality into focused modules

```typescript
// Example: aiGeneration.ts
export interface CharacterContext {
  selectedClass: ClassInfo;
  gender?: 'male' | 'female';
  theme: Theme;
  characterTraits?: CharacterTraits;
}

export async function generateCharacterName(context: CharacterContext): Promise<string> {
  // AI generation logic...
}
```

#### 3. Data-Driven Configuration

**Purpose**: Make game rules configurable and maintainable

```typescript
// Example: class-data.ts
export const CLASSES: ClassInfo[] = [
  {
    name: "Fighter",
    group: "Basic",
    requirements: { strength: 9 },
    hitDie: 8,
    features: {
      combatOptions: true,
      weaponMastery: true
    }
  }
  // ... more classes
];
```

---

## Component Library

### Core UI Components

#### 1. AbilityScoreDisplay

**Purpose**: Interactive ability score management with increment/decrement

```typescript
interface AbilityScoreDisplayProps {
  ability: Ability;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  isInteractive: boolean;
  isBelowBase: boolean;
}
```

**Key Features**:

- Visual feedback for score changes
- Accessibility support (ARIA labels)
- Conditional interaction based on game rules
- Color coding for below-base scores

#### 2. ClassCard

**Purpose**: Display class information with eligibility checking

```typescript
interface ClassCardProps {
  classInfo: ClassInfo;
  scores: AbilityScores | null;
  onSelect: (classInfo: ClassInfo) => void;
  isSelected: boolean;
}
```

**Key Features**:

- Requirement validation with visual feedback
- Hit die and save information display
- Selection state management
- Responsive design

#### 3. TabButton

**Purpose**: Navigation with completion tracking

```typescript
interface TabButtonProps {
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
```

**Key Features**:

- Visual completion indicators
- Accessibility compliance
- Hover and focus states
- Responsive text (mobile/desktop)

### Complex Components

#### 1. ManageTab

**Purpose**: Character progression and equipment management

- Level management with automatic roll generation
- Equipment kit selection with affordability checking
- Spell selection for magical classes
- Weight and cost calculations
- Attack bonus and AC display

#### 2. FinalTouchesTab

**Purpose**: AI-powered character enhancement

- Name and trait generation
- Portrait creation with theme support
- Emotional portrait variants
- Backstory generation
- Theme selection system

---

## State Management

### Hook-Based Architecture

#### 1. useCharacterState

**Manages**: Core character data

```typescript
const [characterState, characterActions] = useCharacterState();

// State includes:
// - Ability scores (base + adjusted)
// - Selected class and level
// - HP and money rolls
// - Roll history

// Actions include:
// - rollStats(), selectClass(), changeLevel()
// - incrementAbility(), decrementAbility()
// - resetCharacterProgress()
```

#### 2. useEquipmentState

**Manages**: Equipment and inventory

```typescript
const [equipmentState, equipmentActions] = useEquipmentState();

// State includes:
// - Selected equipment kits
// - Custom items
// - Known spells
// - Cost and weight totals

// Actions include:
// - selectKit(), addCustomItem(), removeItem()
// - setKnownSpells(), resetEquipment()
```

#### 3. useUIState

**Manages**: User interface state

```typescript
const [uiState, uiActions] = useUIState();

// State includes:
// - Active tab and completed tabs
// - Modal states and loading states
// - Toast messages

// Actions include:
// - setActiveTab(), markTabCompleted()
// - showModal(), hideModal()
// - showToast()
```

### State Flow Patterns

#### 1. Dependency Chain

```map
Ability Scores → Class Selection → Level Management → Equipment → Final Touches
```

#### 2. Progress Tracking

- Each tab validates its completion requirements
- Progress is visually indicated in navigation
- State resets appropriately when dependencies change

#### 3. Error Handling

- Graceful degradation for AI failures
- User-friendly error messages
- Retry mechanisms for network requests

---

## UI/UX Design System

### Visual Theme

```css
/* Color Palette */
:root {
  --bg-primary: #1f2937;      /* Dark gray background */
  --bg-secondary: #374151;    /* Lighter gray for cards */
  --text-primary: #f9fafb;    /* Light text */
  --text-secondary: #d1d5db;  /* Muted text */
  --accent-primary: #fbbf24;  /* Gold/yellow accents */
  --accent-secondary: #3b82f6; /* Blue accents */
  --success: #10b981;         /* Green for success */
  --warning: #f59e0b;         /* Orange for warnings */
  --error: #ef4444;           /* Red for errors */
}
```

### Typography System

```css
/* Font Hierarchy */
.text-4xl { font-size: 2.25rem; }  /* Main headings */
.text-3xl { font-size: 1.875rem; } /* Section headings */
.text-2xl { font-size: 1.5rem; }   /* Subsection headings */
.text-xl { font-size: 1.25rem; }   /* Card titles */
.text-lg { font-size: 1.125rem; }  /* Important text */
.text-base { font-size: 1rem; }    /* Body text */
.text-sm { font-size: 0.875rem; }  /* Secondary text */
```

### Component Styling Patterns

#### 1. Interactive Elements

```css
/* Button Base Pattern */
.btn-base {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  transform: scale(1);
}

.btn-base:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-base:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(1);
}
```

#### 2. Card Components

```css
/* Card Pattern */
.card {
  background: rgba(55, 65, 81, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.15);
}
```

### Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px+ (mobile) */
/* sm: 640px+ (large mobile) */
/* md: 768px+ (tablet) */
/* lg: 1024px+ (desktop) */
/* xl: 1280px+ (large desktop) */
```

### Accessibility Features

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant color ratios
- **Screen Reader Support**: Semantic HTML structure
- **Focus Indicators**: Clear focus states for navigation

---

## AI Integration

### Google Generative AI Implementation

#### 1. Setup and Configuration

```typescript
import { GoogleGenAI } from '@google/genai';

// Initialize AI client
const ai = new GoogleGenAI({ 
  apiKey: process.env.API_KEY 
});
```

#### 2. Content Generation Patterns

##### Name Generation

```typescript
export async function generateCharacterName(context: CharacterContext): Promise<string> {
  const { selectedClass, gender, theme } = context;
  
  const prompt = `Generate a single, unique character name suitable for a ${gender} ${selectedClass.name} in a ${theme} setting. Provide the name in JSON format with a single key: "name".`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: { name: { type: Type.STRING } },
      },
    },
  });

  const result = JSON.parse(response.text.trim());
  return result.name;
}
```

##### Portrait Generation

```typescript
export async function generateCharacterPortrait(context: CharacterContext): Promise<string> {
  const prompt = `Generate a character portrait based on:
    - Class: ${context.selectedClass.name}
    - Gender: ${context.gender || 'unspecified'}
    - Theme: ${getThemeConfig(context.theme).portrait}
    - Ability Scores: ${formatAbilityScores(context.scores)}
    
    Style: Full-body portrait, 9:16 aspect ratio`;

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '9:16',
      outputMimeType: 'image/png',
    },
  });

  return `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
}
```

#### 3. Error Handling and Retry Logic

```typescript
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  throw new Error('Unexpected error in retry logic');
}
```

#### 4. Prompt Engineering Best Practices

- **Structured Output**: Use JSON schemas for consistent responses
- **Context Awareness**: Include relevant character details in prompts
- **Theme Integration**: Adjust language and style based on selected theme
- **Constraint Specification**: Clearly define output requirements

---

## PDF Generation

### pdf-lib Integration

#### 1. PDF Template System

```typescript
// Template selection based on character class
const spellcasterClasses = ['Magic-User', 'Cleric', 'Drow', 'Elf', 'Illusionist'];
const templatePath = spellcasterClasses.includes(classInfo.name)
  ? '/sheet/sheet_magicuser.pdf'
  : '/sheet/sheet.pdf';
```

#### 2. Form Field Mapping

```typescript
// PDF field configuration
export const PDF_FIELD_MAP = {
  // Character basics
  characterName: 'Character Name 2',
  characterClass: 'Class 2',
  characterLevel: 'Level 2',
  
  // Ability scores
  strength: 'STR 2',
  dexterity: 'DEX 2',
  constitution: 'CON 2',
  intelligence: 'INT 2',
  wisdom: 'WIS 2',
  charisma: 'CHA 2',
  
  // Combat stats
  hitPoints: 'Hit Points 2',
  armorClass: 'Armor Class 2',
  attackBonus: 'Attack Bonus 2',
  
  // Equipment
  equipment: 'Equipment 2',
  
  // Movement and skills
  overlandMovement: 'Overland Movement 2',
  listenAtDoor: 'Listen at Door 2',
  openStuckDoor: 'Open Stuck Door 2',
  findSecretDoor: 'Find Secret Door 2',
  findRoomTrap: 'Find Room Trap 2',
  
  // Class features
  abilitiesSkillsWeapons: 'Abilities, Skills, Weapons 2'
} as const;
```

#### 3. Dynamic Field Population

```typescript
export function generatePDFFormFields(
  classInfo: ClassInfo,
  scores: AbilityScores,
  characterName: string,
  characterLevel: number,
  hitPoints: number,
  equipmentItems: string[],
  equipmentWeight: number,
  movementSpeed: number
): Record<string, string | boolean> {
  const fields: Record<string, string | boolean> = {};
  
  // Basic character information
  fields[PDF_FIELD_MAP.characterName] = characterName;
  fields[PDF_FIELD_MAP.characterClass] = classInfo.name;
  fields[PDF_FIELD_MAP.characterLevel] = characterLevel.toString();
  
  // Ability scores with modifiers
  fields[PDF_FIELD_MAP.strength] = `${scores.Strength} (${getModifierString(scores.Strength)})`;
  
  // Dynamic skill calculation
  fields[PDF_FIELD_MAP.listenAtDoor] = getSkillValue(classInfo, 'listenAtDoor', characterLevel).toString();
  
  // Equipment formatting
  fields[PDF_FIELD_MAP.equipment] = formatEquipmentList(equipmentItems);
  
  // Class features compilation
  fields[PDF_FIELD_MAP.abilitiesSkillsWeapons] = formatClassFeatures(classInfo, characterLevel);
  
  return fields;
}
```

#### 4. Class Features Integration

```typescript
function formatClassFeatures(classInfo: ClassInfo, level: number): string {
  const availableFeatures = CLASS_FEATURES_DATA[classInfo.name]?.filter(
    feature => feature.level <= level
  ) || [];
  
  return availableFeatures
    .map(feature => `**${feature.name}**: ${feature.description}`)
    .join('\n');
}
```

---

## Game Mechanics Implementation

### Dice Rolling System

```typescript
// Basic dice rolling
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

// 3d6 ability score generation
export function rollAbilityScore(): number {
  return rollDie(6) + rollDie(6) + rollDie(6);
}

// Complex HP rolling with class-specific dice
export function generateHpRollForLevel(classInfo: ClassInfo): HpRollResult {
  const roll = rollDie(classInfo.hitDie);
  const isMaxRoll = roll === classInfo.hitDie;
  
  return {
    roll,
    isMaxRoll,
    explanation: `Rolled ${roll} on d${classInfo.hitDie}${isMaxRoll ? ' (MAX!)' : ''}`
  };
}
```

### Ability Score Modifiers

```typescript
export function getModifier(score: number): number {
  if (score >= 18) return 3;
  if (score >= 16) return 2;
  if (score >= 13) return 1;
  if (score >= 9) return 0;
  if (score >= 6) return -1;
  if (score >= 4) return -2;
  return -3;
}

export function getModifierString(score: number): string {
  const modifier = getModifier(score);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}
```

### Equipment and Encumbrance

```typescript
export function calculateEncumbrance(weight: number, strength: number): {
  category: 'Unencumbered' | 'Lightly Encumbered' | 'Heavily Encumbered';
  speedPenalty: number;
  carryingCapacity: number;
} {
  const capacity = getCarryingCapacity(strength);
  const lightThreshold = capacity / 3;
  const heavyThreshold = (capacity * 2) / 3;
  
  if (weight <= lightThreshold) {
    return { category: 'Unencumbered', speedPenalty: 0, carryingCapacity: capacity };
  } else if (weight <= heavyThreshold) {
    return { category: 'Lightly Encumbered', speedPenalty: 10, carryingCapacity: capacity };
  } else {
    return { category: 'Heavily Encumbered', speedPenalty: 20, carryingCapacity: capacity };
  }
}
```

### Class Requirements Validation

```typescript
export function validateClassRequirements(
  classInfo: ClassInfo, 
  scores: AbilityScores
): { eligible: boolean; missingRequirements: string[] } {
  const missingRequirements: string[] = [];
  
  Object.entries(classInfo.requirements).forEach(([ability, minScore]) => {
    if (scores[ability as Ability] < minScore) {
      missingRequirements.push(`${ability}: ${minScore} (has ${scores[ability as Ability]})`);
    }
  });
  
  return {
    eligible: missingRequirements.length === 0,
    missingRequirements
  };
}
```

---

## Theming System

### Theme Configuration

```typescript
export interface ThemeConfig {
  name: {
    promptDescription: string;
  };
  traits: {
    promptDescription: string;
  };
  portrait: {
    theme: string;
    setting: string;
    atmosphere: string;
    visualStyle: string;
    additionalDetails: string;
  };
  backstory: {
    stylePrompt: string;
  };
}

export const THEMES: Record<Theme, ThemeConfig> = {
  'Grimdark': {
    name: {
      promptDescription: "in a gritty, dark fantasy world of hardship and survival"
    },
    traits: {
      promptDescription: "reflecting the harsh realities of a grimdark world"
    },
    portrait: {
      theme: "Dark fantasy, grimdark",
      setting: "Bleak, war-torn landscape or shadowy dungeon",
      atmosphere: "Ominous, foreboding, harsh lighting",
      visualStyle: "Realistic, weathered, battle-scarred",
      additionalDetails: "Emphasize survival gear, practical clothing, signs of hardship"
    },
    backstory: {
      stylePrompt: "The style must be gritty, dark, and grounded, reflecting a bleak world of hardship and survival. Emphasize harsh realities, moral ambiguities, and the constant struggle for existence. The tone should be somber and cynical."
    }
  },
  // ... other themes
};
```

### Theme Application

```typescript
// Applied in AI generation
export function generateThemeAwareContent(theme: Theme, contentType: string): string {
  const themeConfig = THEMES[theme];
  
  switch (contentType) {
    case 'portrait':
      return buildPortraitPrompt(themeConfig.portrait);
    case 'backstory':
      return buildBackstoryPrompt(themeConfig.backstory);
    default:
      return '';
  }
}
```

---

## Deployment & Build

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ai-vendor': ['@google/genai'],
          'pdf-vendor': ['pdf-lib']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
```

### Build Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Static Asset Management

- **Development**: Assets served from project root
- **Production**: Assets must be in `public/` folder to be included in build
- **PDF Templates**: Stored in `public/sheet/` for universal access

### Environment Variables

```env
# .env.local
API_KEY=your_google_ai_api_key_here
```

---

## Adaptation Guide for Other Games

### 1. Game System Adaptation Checklist

#### A. Core Mechanics Replacement

```typescript
// Replace ability score system
export enum CustomAbility {
  Might = 'Might',
  Agility = 'Agility',
  Intellect = 'Intellect',
  // ... your game's abilities
}

// Replace dice rolling system
export function rollCustomDice(): number {
  // Your game's dice mechanics
  return rollDie(20) + rollDie(20); // Example: 2d20 system
}
```

#### B. Class System Adaptation

```typescript
// Define your game's classes/careers/archetypes
export interface CustomClassInfo {
  name: string;
  group: string;
  requirements: Record<string, number>;
  specialAbilities: string[];
  startingEquipment: string[];
  // ... other class-specific properties
}

export const CUSTOM_CLASSES: CustomClassInfo[] = [
  {
    name: "Space Marine",
    group: "Military",
    requirements: { might: 12, agility: 10 },
    specialAbilities: ["Combat Training", "Equipment Mastery"],
    startingEquipment: ["Pulse Rifle", "Combat Armor"]
  }
  // ... more classes
];
```

#### C. Equipment System Adaptation

```typescript
// Adapt item categories and properties
export interface CustomItem {
  name: string;
  category: 'Weapon' | 'Armor' | 'Tech' | 'Consumable';
  cost: number;
  weight: number;
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  // ... game-specific properties
}
```

### 2. Theme System Customization

#### A. Create Game-Appropriate Themes

```typescript
export const CUSTOM_THEMES: Record<string, ThemeConfig> = {
  'Cyberpunk': {
    name: {
      promptDescription: "in a high-tech, low-life cyberpunk megacity"
    },
    portrait: {
      theme: "Cyberpunk, neon-lit",
      setting: "Urban sprawl, neon signs, rain-slicked streets",
      atmosphere: "Moody, atmospheric, neon lighting",
      visualStyle: "Sleek, augmented, street fashion",
      additionalDetails: "Cybernetic implants, holographic displays, urban decay"
    }
  },
  'Space Opera': {
    name: {
      promptDescription: "in an epic space-faring civilization"
    },
    portrait: {
      theme: "Space opera, grand science fiction",
      setting: "Starship bridge, alien world, space station",
      atmosphere: "Epic, adventurous, cosmic scale",
      visualStyle: "Sleek uniforms, advanced technology, diverse aliens",
      additionalDetails: "Energy weapons, communicators, insignia of rank"
    }
  }
};
```

### 3. AI Prompt Adaptation

#### A. Game-Specific Content Generation

```typescript
export async function generateSciFiCharacterName(context: CustomCharacterContext): Promise<string> {
  const prompt = `Generate a character name appropriate for a ${context.species} ${context.profession} in a ${context.theme} setting. Consider:
    - Species: ${context.species}
    - Profession: ${context.profession}
    - Home World: ${context.homeWorld}
    - Cultural Background: ${context.culture}
    
    Provide the name in JSON format with keys: "firstName", "lastName", "callSign"`;
  
  // ... AI generation logic
}
```

### 4. PDF Template Adaptation

#### A. Create Custom Character Sheets

- Design PDF forms using Adobe Acrobat or similar tools
- Name form fields consistently (e.g., "Character_Name", "Level", etc.)
- Update PDF_FIELD_MAP to match your form field names
- Test form filling with your specific layout

#### B. Field Mapping Example

```typescript
export const CUSTOM_PDF_FIELD_MAP = {
  characterName: 'Character_Name_Field',
  species: 'Species_Field',
  profession: 'Profession_Class_Field',
  homeworld: 'Homeworld_Field',
  // ... map all your form fields
} as const;
```

### 5. UI Component Adaptation

#### A. Rebrand Component Text

```typescript
// Replace game-specific terminology
const GAME_TERMINOLOGY = {
  abilityScores: "Attributes",
  classes: "Professions",
  level: "Rank",
  hitPoints: "Health Points",
  equipment: "Gear"
};
```

#### B. Visual Theme Updates

```css
/* Update color scheme for your game */
:root {
  --bg-primary: #0a0a0a;        /* Space black */
  --bg-secondary: #1a1a2e;      /* Dark blue */
  --accent-primary: #00d4ff;    /* Cyan */
  --accent-secondary: #ff006e;   /* Magenta */
}
```

### 6. Game Rules Implementation

#### A. Replace Calculation Logic

```typescript
// Example: Different health calculation
export function calculateCustomHealth(
  constitution: number,
  profession: CustomClassInfo,
  level: number
): number {
  const baseHealth = profession.healthBase;
  const constitutionBonus = getCustomModifier(constitution);
  const levelBonus = (level - 1) * profession.healthPerLevel;
  
  return baseHealth + constitutionBonus + levelBonus;
}
```

#### B. Custom Skill Systems

```typescript
// Example: Skill-based system instead of class-based
export interface SkillSet {
  combat: number;
  technical: number;
  social: number;
  survival: number;
}

export function calculateSkillPoints(
  intelligence: number,
  level: number
): number {
  return (getCustomModifier(intelligence) + 2) * level;
}
```

---

## Best Practices & Patterns

### 1. Code Organization

#### A. Separation of Concerns

- **Components**: Pure UI, minimal business logic
- **Hooks**: State management and side effects
- **Utils**: Pure functions, calculations, transformations
- **Data**: Static game data and configuration

#### B. File Naming Conventions

- **Components**: PascalCase (e.g., `CharacterCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useCharacterState.ts`)
- **Utils**: camelCase (e.g., `gameCalculations.ts`)
- **Data**: kebab-case (e.g., `class-data.ts`)

#### C. Import Organization

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { GoogleGenAI } from '@google/genai';

// 3. Internal imports (types first, then utilities, then components)
import type { CharacterState, ClassInfo } from './types';
import { calculateModifier } from './utils';
import { AbilityScoreDisplay } from './components/AbilityScoreDisplay';
```

### 2. State Management Best Practices

#### A. Hook Design Principles

- **Single Responsibility**: Each hook manages one domain
- **Immutable Updates**: Use functional state updates
- **Derived State**: Calculate values instead of storing them
- **Error Boundaries**: Graceful error handling

#### B. State Update Patterns

```typescript
// ✅ Good: Functional update
setScores(prevScores => ({
  ...prevScores,
  [ability]: newValue
}));

// ❌ Bad: Direct mutation
scores[ability] = newValue;
setScores(scores);
```

### 3. TypeScript Best Practices

#### A. Strong Typing

```typescript
// ✅ Good: Specific types
interface AbilityScores {
  [Ability.Strength]: number;
  [Ability.Dexterity]: number;
  // ... etc
}

// ❌ Bad: Generic types
interface AbilityScores {
  [key: string]: number;
}
```

#### B. Type Guards

```typescript
export function isClassInfo(obj: any): obj is ClassInfo {
  return obj && 
         typeof obj.name === 'string' && 
         typeof obj.hitDie === 'number' &&
         obj.requirements && 
         typeof obj.requirements === 'object';
}
```

### 4. Performance Optimization

#### A. Memoization

```typescript
// Expensive calculations
const derivedValue = useMemo(() => {
  return expensiveCalculation(dependencies);
}, [dependencies]);

// Callback stability
const handleClick = useCallback((id: string) => {
  // handler logic
}, [dependencies]);
```

#### B. Component Optimization

```typescript
// Prevent unnecessary re-renders
const OptimizedComponent = React.memo(({
  data,
  onAction
}: ComponentProps) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison logic if needed
  return prevProps.data.id === nextProps.data.id;
});
```

### 5. Error Handling Patterns

#### A. Graceful Degradation

```typescript
export function withFallback<T>(
  operation: () => T,
  fallback: T,
  errorHandler?: (error: Error) => void
): T {
  try {
    return operation();
  } catch (error) {
    errorHandler?.(error as Error);
    return fallback;
  }
}
```

#### B. User-Friendly Error Messages

```typescript
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('network')) {
      return 'Network connection issue. Please check your internet connection.';
    }
    if (error.message.includes('API')) {
      return 'Service temporarily unavailable. Please try again later.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
```

### 6. Testing Considerations

#### A. Testable Component Structure

```typescript
// ✅ Good: Pure components, easy to test
export const CharacterCard = ({
  character,
  onSelect,
  isSelected
}: CharacterCardProps) => {
  // Pure rendering logic
};

// ✅ Good: Testable utility functions
export function calculateModifier(score: number): number {
  // Pure calculation
}
```

#### B. Mock-Friendly API Design

```typescript
// ✅ Good: Dependency injection
export function createAIService(apiKey: string) {
  return {
    generateName: (context: CharacterContext) => { /* ... */ },
    generatePortrait: (context: CharacterContext) => { /* ... */ }
  };
}
```

---

## Conclusion

This OSE Character Roller represents a complete, production-ready character creation system that can be adapted for virtually any tabletop RPG. The modular architecture, comprehensive documentation, and clear separation of concerns make it an excellent foundation for similar projects.

### Key Takeaways for Adaptation

1. **Start with the data layer**: Define your game's classes, items, and rules
2. **Adapt the calculation layer**: Implement your game's specific mechanics
3. **Customize the UI layer**: Update terminology and visual themes
4. **Configure the AI layer**: Create appropriate prompts for your setting
5. **Design the PDF layer**: Create character sheets that match your system

The patterns and practices documented here provide a solid foundation for creating sophisticated, user-friendly character creation tools for any tabletop RPG system.
