// FIX: Removed local Emotion interface and imported from types.ts
import type { Emotion } from './types';

export const EMOTIONS_CONFIG: Emotion[] = [
  {
    name: 'Defiance',
    prompt: 'The character\'s expression should be one of **Defiance**—a look that dares fate or foe. Set their jaw firmly and give their eyes a challenging glint.'
  },
  {
    name: 'Fear',
    prompt: 'The character\'s expression should be one of **Fear**. Make their eyes wide, caught in a moment of uncertainty or outright terror. Their posture should be tense.'
  },
  {
    name: 'Determination',
    prompt: 'The character\'s expression should be one of **Determination**. Give them a steeled jaw and a focused, unwavering gaze, as if they are facing a great challenge head-on.'
  },
  {
    name: 'Awe',
    prompt: 'The character\'s expression should be one of **Awe**. Their eyes should be widened with wonder, mouth slightly open, as if they are witnessing something truly magnificent or unbelievable.'
  },
  {
    name: 'Malice',
    prompt: 'The character\'s expression should be one of **Malice**. Give them a sly or cruel smirk and narrow their eyes, hinting at dark intentions or wicked thoughts.'
  },
  {
    name: 'Sorrow',
    prompt: 'The character\'s expression should be one of **Sorrow**. Their gaze should be downcast and heavy, with subtle signs of grief or sadness in their features, perhaps the hint of a tear.'
  },
  {
    name: 'Triumph',
    prompt: 'The character\'s expression should be one of pure **Triumph** or **Success**. Their face should be lit with a look of overwhelming joy and victory, with eyes bright and a wide, genuine smile.'
  },
  {
    name: 'Suspicion',
    prompt: 'The character\'s expression should be one of **Suspicion**. Give them a side-eye glance with narrowed eyes and pressed lips, as if they are doubtful or untrusting of what they see.'
  }
];