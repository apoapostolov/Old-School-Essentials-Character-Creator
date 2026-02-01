# Visual Implementation Guide - Complete UI/UX Recreation

## Table of Contents

1. [Visual Design System](#visual-design-system)
2. [Layout Architecture](#layout-architecture)
3. [Component Library](#component-library)
4. [Interaction Patterns](#interaction-patterns)
5. [Animation & Transitions](#animation--transitions)
6. [Responsive Design](#responsive-design)
7. [Accessibility Implementation](#accessibility-implementation)
8. [Visual States & Feedback](#visual-states--feedback)
9. [Color Psychology & Theme Mapping](#color-psychology--theme-mapping)
10. [Implementation Code Examples](#implementation-code-examples)

---

## Visual Design System

### Core Color Palette

```css
/* Primary Color Scheme - Dark Fantasy Theme */
:root {
  /* Background Colors */
  --bg-primary: #1f2937;          /* Main background - Dark blue-gray */
  --bg-secondary: #374151;        /* Card backgrounds - Medium gray */
  --bg-tertiary: #4b5563;         /* Elevated elements - Light gray */
  --bg-overlay: rgba(31, 41, 55, 0.95); /* Modal/dropdown overlays */
  
  /* Text Colors */
  --text-primary: #f9fafb;        /* Main text - Near white */
  --text-secondary: #d1d5db;      /* Secondary text - Light gray */
  --text-muted: #9ca3af;          /* Muted text - Medium gray */
  --text-disabled: #6b7280;       /* Disabled text - Darker gray */
  
  /* Accent Colors */
  --accent-primary: #fbbf24;      /* Gold/yellow - Primary actions */
  --accent-secondary: #3b82f6;    /* Blue - Secondary actions */
  --accent-tertiary: #8b5cf6;     /* Purple - Special features */
  
  /* Status Colors */
  --success: #10b981;             /* Green - Success states */
  --warning: #f59e0b;             /* Orange - Warning states */
  --error: #ef4444;               /* Red - Error states */
  --info: #06b6d4;                /* Cyan - Info states */
  
  /* Interactive States */
  --hover-overlay: rgba(251, 191, 36, 0.1);    /* Hover effects */
  --active-overlay: rgba(251, 191, 36, 0.2);   /* Active/pressed states */
  --focus-outline: rgba(251, 191, 36, 0.5);    /* Focus indicators */
  
  /* Border Colors */
  --border-subtle: rgba(75, 85, 99, 0.3);      /* Subtle borders */
  --border-default: rgba(107, 114, 128, 0.5);  /* Default borders */
  --border-strong: rgba(156, 163, 175, 0.8);   /* Strong borders */
}
```

### Typography System

```css
/* Font Family Stack */
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

/* Typography Scale */
.text-xs {    font-size: 0.75rem;  line-height: 1rem;    }  /* 12px */
.text-sm {    font-size: 0.875rem; line-height: 1.25rem; }  /* 14px */
.text-base {  font-size: 1rem;     line-height: 1.5rem;  }  /* 16px */
.text-lg {    font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */
.text-xl {    font-size: 1.25rem;  line-height: 1.75rem; }  /* 20px */
.text-2xl {   font-size: 1.5rem;   line-height: 2rem;    }  /* 24px */
.text-3xl {   font-size: 1.875rem; line-height: 2.25rem; }  /* 30px */
.text-4xl {   font-size: 2.25rem;  line-height: 2.5rem;  }  /* 36px */

/* Font Weights */
.font-light {     font-weight: 300; }
.font-normal {    font-weight: 400; }
.font-medium {    font-weight: 500; }
.font-semibold {  font-weight: 600; }
.font-bold {      font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### Spacing System

```css
/* Consistent spacing scale */
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### Border Radius System

```css
:root {
  --radius-sm: 0.125rem;   /* 2px - Small elements */
  --radius-md: 0.375rem;   /* 6px - Default radius */
  --radius-lg: 0.5rem;     /* 8px - Cards, buttons */
  --radius-xl: 0.75rem;    /* 12px - Large cards */
  --radius-2xl: 1rem;      /* 16px - Modals */
  --radius-full: 9999px;   /* Full circle */
}
```

---

## Layout Architecture

### Main Application Structure

```diagram
┌─────────────────────────────────────────┐
│                 Header                  │ ← 80px height
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │             │  │                 │   │
│  │  Tab Nav    │  │   Main Content  │   │ ← Flexible height
│  │  (Sidebar)  │  │   Area          │   │
│  │             │  │                 │   │
│  └─────────────┘  └─────────────────┘   │
│  200px (desktop)   Remaining width     │
│  Hidden (mobile)   Full width (mobile) │
└─────────────────────────────────────────┘
```

### Container System

```css
/* Main application container */
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary) 0%, #111827 100%);
  display: flex;
  flex-direction: column;
}

/* Content wrapper */
.content-wrapper {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: var(--space-6);
  padding: var(--space-4);
}

/* Responsive container queries */
@container (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: var(--space-4);
  }
}
```

### Grid Systems

```css
/* Character sheet grid */
.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  width: 100%;
}

/* Ability scores grid */
.abilities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

/* Equipment grid */
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}

/* Mobile adaptations */
@media (max-width: 640px) {
  .abilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .equipment-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Component Library

### 1. Button Components

#### Primary Button

```css
.btn-primary {
  /* Base styles */
  padding: var(--space-3) var(--space-6);
  background: linear-gradient(135deg, var(--accent-primary) 0%, #f59e0b 100%);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 0.875rem;
  
  /* Interactive states */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
  background: linear-gradient(135deg, #fcd34d 0%, var(--accent-primary) 100%);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(0);
  box-shadow: none;
}
```

#### Secondary Button

```css
.btn-secondary {
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--accent-primary);
  border: 2px solid var(--accent-primary);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 0.875rem;
  
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
}
```

#### Icon Button

```css
.btn-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-icon:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-primary);
  transform: scale(1.1);
}
```

### 2. Card Components

#### Base Card

```css
.card {
  background: var(--bg-secondary);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.1);
  transform: translateY(-2px);
}
```

#### Interactive Card (Selectable)

```css
.card-interactive {
  cursor: pointer;
  position: relative;
}

.card-interactive::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  background: var(--hover-overlay);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card-interactive:hover::before {
  opacity: 1;
}

.card-interactive.selected {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.3);
}

.card-interactive.selected::before {
  background: var(--active-overlay);
  opacity: 1;
}
```

#### Status Card

```css
.card-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.3);
}

.card-error {
  border-color: var(--error);
  background: rgba(239, 68, 68, 0.05);
}

.card-success {
  border-color: var(--success);
  background: rgba(16, 185, 129, 0.05);
}
```

### 3. Input Components

#### Text Input

```css
.input-text {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-primary);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.input-text:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.input-text::placeholder {
  color: var(--text-muted);
}
```

#### Number Input with Controls

```css
.input-number-container {
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.input-number {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  color: var(--text-primary);
  text-align: center;
  font-weight: 600;
}

.input-number-btn {
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: none;
  color: var(--accent-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.input-number-btn:hover {
  background: var(--bg-tertiary);
}

.input-number-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 4. Tab Navigation

#### Tab Container

```css
.tab-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: var(--space-2);
}

@media (max-width: 768px) {
  .tab-container {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    padding: var(--space-2);
    gap: var(--space-3);
  }
}
```

#### Tab Button

```css
.tab-button {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4);
  background: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tab-button.active {
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-weight: 600;
}

.tab-button.completed::after {
  content: '✓';
  position: absolute;
  right: var(--space-3);
  color: var(--success);
  font-weight: bold;
}

.tab-button.active.completed::after {
  color: var(--bg-primary);
}

/* Mobile tab styling */
@media (max-width: 768px) {
  .tab-button {
    flex-shrink: 0;
    min-width: 120px;
    text-align: center;
    font-size: 0.75rem;
  }
}
```

#### Tab Content

```css
.tab-content {
  flex: 1;
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
}

.tab-content-enter {
  opacity: 0;
  transform: translateX(20px);
}

.tab-content-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 5. Ability Score Display

```css
.ability-score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-4);
  background: var(--bg-secondary);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.ability-score-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.ability-score-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.ability-score-modifier {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-primary);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.ability-score-controls {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

/* State variations */
.ability-score-container.interactive {
  cursor: pointer;
}

.ability-score-container.interactive:hover {
  border-color: var(--accent-primary);
  background: var(--bg-tertiary);
}

.ability-score-container.below-requirement {
  border-color: var(--error);
  background: rgba(239, 68, 68, 0.05);
}

.ability-score-container.below-requirement .ability-score-value {
  color: var(--error);
}
```

### 6. Modal Components

#### Modal Overlay

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-overlay-enter {
  opacity: 0;
}

.modal-overlay-enter-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.modal-overlay-exit {
  opacity: 1;
}

.modal-overlay-exit-active {
  opacity: 0;
  transition: opacity 0.3s ease;
}
```

#### Modal Content

```css
.modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-content-enter {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-content-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all 0.15s ease;
}

.modal-close:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

---

## Interaction Patterns

### 1. Hover Effects

#### Elevation on Hover

```css
.elevate-on-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.elevate-on-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

#### Glow Effect

```css
.glow-on-hover {
  transition: all 0.3s ease;
}

.glow-on-hover:hover {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}
```

#### Scale Effect

```css
.scale-on-hover {
  transition: transform 0.2s ease;
}

.scale-on-hover:hover {
  transform: scale(1.05);
}
```

### 2. Click Interactions

#### Press Animation

```css
.press-effect {
  transition: transform 0.1s ease;
}

.press-effect:active {
  transform: scale(0.95);
}
```

#### Ripple Effect

```css
.ripple-container {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

### 3. Focus States

#### Standard Focus

```css
.focus-standard:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
}
```

#### Enhanced Focus

```css
.focus-enhanced:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 
    0 0 0 3px rgba(251, 191, 36, 0.3),
    0 4px 12px rgba(251, 191, 36, 0.15);
}
```

### 4. Loading States

#### Spinner Animation

```css
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-subtle);
  border-top: 2px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

#### Pulse Animation

```css
.loading-pulse {
  background: var(--bg-tertiary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    rgba(75, 85, 99, 0.5) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Animation & Transitions

### 1. Entrance Animations

#### Fade In

```css
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide In From Bottom

```css
.slide-in-bottom {
  animation: slideInBottom 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Scale In

```css
.scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 2. Transition Timing Functions

```css
:root {
  /* Standard easing curves */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom easing curves */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 3. Stagger Animations

```css
.stagger-container .stagger-item {
  animation: fadeInUp 0.5s ease-out;
  animation-fill-mode: both;
}

.stagger-container .stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-container .stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-container .stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-container .stagger-item:nth-child(4) { animation-delay: 0.4s; }
.stagger-container .stagger-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Responsive Design

### 1. Breakpoint System

```css
/* Mobile-first approach */
:root {
  --screen-sm: 640px;   /* Large mobile */
  --screen-md: 768px;   /* Tablet */
  --screen-lg: 1024px;  /* Desktop */
  --screen-xl: 1280px;  /* Large desktop */
  --screen-2xl: 1536px; /* Extra large */
}

/* Media query mixins */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 2. Layout Adaptations

#### Desktop Layout

```css
.layout-desktop {
  display: flex;
  gap: var(--space-6);
}

.sidebar-desktop {
  width: 200px;
  flex-shrink: 0;
}

.content-desktop {
  flex: 1;
}
```

#### Mobile Layout

```css
@media (max-width: 767px) {
  .layout-mobile {
    flex-direction: column;
  }
  
  .sidebar-mobile {
    width: 100%;
    order: 2;
  }
  
  .content-mobile {
    order: 1;
  }
}
```

### 3. Component Responsiveness

#### Responsive Cards

```css
.card-responsive {
  padding: var(--space-4);
}

@media (min-width: 640px) {
  .card-responsive {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .card-responsive {
    padding: var(--space-8);
  }
}
```

#### Responsive Typography

```css
.text-responsive-xl {
  font-size: 1.5rem;
}

@media (min-width: 640px) {
  .text-responsive-xl {
    font-size: 1.875rem;
  }
}

@media (min-width: 1024px) {
  .text-responsive-xl {
    font-size: 2.25rem;
  }
}
```

---

## Accessibility Implementation

### 1. Color Contrast

```css
/* Ensure WCAG AA compliance (4.5:1 ratio) */
.text-high-contrast {
  color: #ffffff;
  background: #1f2937;
}

.text-medium-contrast {
  color: #d1d5db;
  background: #374151;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card {
    border-width: 2px;
    border-color: var(--text-primary);
  }
  
  .btn-primary {
    border: 2px solid var(--bg-primary);
  }
}
```

### 2. Focus Management

```css
/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Focus trap for modals */
.focus-trap {
  outline: none;
}

.focus-trap:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### 3. Screen Reader Support

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Show on focus for skip links */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 4. Motion Preferences

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Provide alternative for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
    border: 2px solid var(--accent-primary);
  }
  
  .loading-spinner::after {
    content: '...';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

---

## Visual States & Feedback

### 1. Form Validation States

#### Success State

```css
.input-success {
  border-color: var(--success);
  background: rgba(16, 185, 129, 0.05);
}

.input-success:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.validation-success {
  color: var(--success);
  font-size: 0.875rem;
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.validation-success::before {
  content: '✓';
  font-weight: bold;
}
```

#### Error State

```css
.input-error {
  border-color: var(--error);
  background: rgba(239, 68, 68, 0.05);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.validation-error {
  color: var(--error);
  font-size: 0.875rem;
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.validation-error::before {
  content: '⚠';
  font-weight: bold;
}
```

### 2. Loading States

#### Button Loading

```css
.btn-loading {
  position: relative;
  color: transparent;
  cursor: wait;
}

.btn-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  border-radius: inherit;
}

.btn-loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1;
}
```

### 3. Toast Notifications

```css
.toast-container {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.toast {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 300px;
  animation: toastSlideIn 0.3s ease-out;
}

.toast-success {
  border-left: 4px solid var(--success);
}

.toast-error {
  border-left: 4px solid var(--error);
}

.toast-warning {
  border-left: 4px solid var(--warning);
}

.toast-info {
  border-left: 4px solid var(--info);
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%) translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}
```

---

## Color Psychology & Theme Mapping

### 1. Theme Configurations

#### Grimdark Theme

```css
.theme-grimdark {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --text-primary: #e5e5e5;
  --accent-primary: #8b4513;      /* Dark brown */
  --accent-secondary: #654321;    /* Darker brown */
  --success: #556b2f;             /* Dark olive green */
  --warning: #cd853f;             /* Peru */
  --error: #8b0000;               /* Dark red */
}
```

#### High Fantasy Theme

```css
.theme-high-fantasy {
  --bg-primary: #1e3a5f;
  --bg-secondary: #2d5aa0;
  --text-primary: #f0f8ff;
  --accent-primary: #ffd700;      /* Gold */
  --accent-secondary: #9370db;    /* Medium purple */
  --success: #32cd32;             /* Lime green */
  --warning: #ffa500;             /* Orange */
  --error: #dc143c;               /* Crimson */
}
```

#### Cyberpunk Theme

```css
.theme-cyberpunk {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a0033;
  --text-primary: #00ffff;
  --accent-primary: #ff00ff;      /* Magenta */
  --accent-secondary: #00ff00;    /* Lime */
  --success: #39ff14;             /* Neon green */
  --warning: #ffff00;             /* Yellow */
  --error: #ff073a;               /* Neon red */
}
```

### 2. Dynamic Theme Application

```css
/* Theme switching utility */
.theme-transition {
  transition: 
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  :root {
    /* Enhance dark colors */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
  }
}

/* Light mode adaptation */
@media (prefers-color-scheme: light) {
  .theme-auto {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --border-subtle: rgba(148, 163, 184, 0.3);
  }
}
```

---

## Implementation Code Examples

### 1. React Component Structure

```tsx
// Base component with full styling
interface AbilityScoreDisplayProps {
  ability: string;
  score: number;
  modifier: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  isInteractive: boolean;
  isBelowRequirement?: boolean;
}

export const AbilityScoreDisplay: React.FC<AbilityScoreDisplayProps> = ({
  ability,
  score,
  modifier,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
  isInteractive,
  isBelowRequirement = false
}) => {
  const containerClasses = [
    'ability-score-container',
    isInteractive && 'interactive',
    isBelowRequirement && 'below-requirement'
  ].filter(Boolean).join(' ');

  const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div className={containerClasses}>
      <div className="ability-score-label">{ability}</div>
      <div className="ability-score-value">{score}</div>
      <div className="ability-score-modifier">({modifierString})</div>
      
      {isInteractive && (
        <div className="ability-score-controls">
          <button
            className="btn-icon"
            onClick={onDecrement}
            disabled={!canDecrement}
            aria-label={`Decrease ${ability}`}
          >
            −
          </button>
          <button
            className="btn-icon"
            onClick={onIncrement}
            disabled={!canIncrement}
            aria-label={`Increase ${ability}`}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
```

### 2. Tab Navigation Implementation

```tsx
interface TabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    isCompleted: boolean;
    isDisabled?: boolean;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="tab-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={[
            'tab-button',
            activeTab === tab.id && 'active',
            tab.isCompleted && 'completed',
            tab.isDisabled && 'disabled'
          ].filter(Boolean).join(' ')}
          onClick={() => !tab.isDisabled && onTabChange(tab.id)}
          disabled={tab.isDisabled}
          aria-label={`${tab.label} tab${tab.isCompleted ? ' (completed)' : ''}`}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          <span className="tab-label">{tab.label}</span>
          {tab.isCompleted && <span className="completion-indicator">✓</span>}
        </button>
      ))}
    </div>
  );
};
```

### 3. Modal Implementation

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first focusable element
      const firstFocusable = document.querySelector('.modal-content [tabindex]:not([tabindex="-1"]), .modal-content button:not([disabled])') as HTMLElement;
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### 4. Animation Hook

```tsx
// Custom hook for entrance animations
export const useEntranceAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    className: isVisible ? 'fade-in' : 'opacity-0',
    style: {
      animationDelay: `${delay}ms`
    }
  };
};

// Usage in component
export const AnimatedCard: React.FC<{delay?: number; children: React.ReactNode}> = ({ 
  delay = 0, 
  children 
}) => {
  const animation = useEntranceAnimation(delay);

  return (
    <div className={`card ${animation.className}`} style={animation.style}>
      {children}
    </div>
  );
};
```

---

## Conclusion

This visual implementation guide provides a complete blueprint for recreating the OSE Character Roller's UI/UX in any RPG system. The modular CSS architecture, comprehensive component library, and detailed interaction patterns ensure pixel-perfect recreation while maintaining accessibility and responsiveness.

### Key Implementation Principles

1. **Consistent Design Language**: All components follow the same visual patterns
2. **Accessibility First**: WCAG AA compliance throughout
3. **Responsive by Default**: Mobile-first design approach
4. **Performance Optimized**: Efficient animations and transitions
5. **Theme Adaptable**: Easy color scheme customization
6. **User Experience Focused**: Intuitive interactions and clear feedback

Use this guide as a reference for implementing any tabletop RPG character creation tool with professional-grade UI/UX that matches the original's polish and usability.
