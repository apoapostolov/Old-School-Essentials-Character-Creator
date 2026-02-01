# OSE Character Roller - Ability Score Visual System

This document explains how the OSE Character Roller transforms numerical ability scores into rich visual descriptions for AI-powered character portrait generation, creating Midjourney-style prompts that produce detailed and accurate character artwork.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Ability Score Descriptors Structure](#ability-score-descriptors-structure)
3. [Visual Translation Process](#visual-translation-process)
4. [Portrait Prompt Generation](#portrait-prompt-generation)
5. [Integration with AI Image Generation](#integration-with-ai-image-generation)
6. [Example Transformations](#example-transformations)
7. [Technical Implementation](#technical-implementation)
8. [Adaptation Guidelines](#adaptation-guidelines)

---

## System Overview

The OSE Character Roller employs a sophisticated visual descriptor system that converts abstract ability scores (numbers from 1-20) into concrete, Midjourney-compatible visual descriptions. This system bridges the gap between game mechanics and visual representation, enabling AI image generators to create accurate character portraits that reflect a character's mechanical capabilities.

### Core Philosophy

- **Mechanical Accuracy**: Visual descriptions directly correspond to numerical ability scores
- **Artistic Compatibility**: Descriptions are crafted for AI image generation systems
- **Narrative Coherence**: Visual traits support character storytelling
- **Scalable Granularity**: Different score ranges produce distinctly different visual outputs

### Key Components

1. **Ability Score Descriptors**: Predefined visual descriptions for each ability score range
2. **Score-to-Description Mapping**: Algorithmic conversion of numbers to text
3. **Prompt Integration**: Seamless incorporation into AI image generation prompts
4. **Multi-Ability Synthesis**: Combining all six abilities into coherent visual profiles

---

## Ability Score Descriptors Structure

### Data Model

```typescript
export interface AbilityScoreDescriptor {
  min: number;        // Minimum score for this descriptor
  max: number;        // Maximum score for this descriptor  
  description: string; // Visual description text
}
```

### Ability Coverage

The system covers all six traditional D&D abilities with detailed visual descriptors:

#### Strength - Physical Power & Build
```typescript
[Ability.Strength]: [
  { min: 1, max: 1, description: 'frail, emaciated limbs, collapsed posture' },
  { min: 2, max: 3, description: 'shaky, thin frame, aided stance' },
  { min: 4, max: 5, description: 'slender, weak posture, struggling lift' },
  { min: 6, max: 7, description: 'strained, pushing with effort' },
  { min: 8, max: 9, description: 'tired arms, hesitant lift' },
  { min: 10, max: 11, description: 'average build, brief lift, neutral stance' },
  { min: 12, max: 13, description: 'solid build carrying a heavy load' },
  { min: 14, max: 15, description: 'toned, single-arm bearing weight' },
  { min: 16, max: 17, description: 'muscular, ripping wood, strong grip' },
  { min: 18, max: 19, description: 'burly, powerful, work-animal strength' },
  { min: 20, max: 20, description: 'colossal, Herculean muscles, heroic lift' },
]
```

#### Dexterity - Agility & Grace
```typescript
[Ability.Dexterity]: [
  { min: 1, max: 1, description: 'immobile, rigid limbs, unable to move' },
  { min: 2, max: 3, description: 'slow, pained movements, unsteady gait' },
  { min: 4, max: 5, description: 'stiff, awkward posture, limited reach' },
  { min: 6, max: 7, description: 'clumsy, off-balance, fumbling hands' },
  { min: 8, max: 9, description: 'slight stumble, hesitant step' },
  { min: 10, max: 11, description: 'nimble enough to catch a small object' },
  { min: 12, max: 13, description: 'steady aim, poised stance' },
  { min: 14, max: 15, description: 'agile, ready to dodge, focused eyes' },
  { min: 16, max: 17, description: 'light-footed, springing motion' },
  { min: 18, max: 19, description: 'graceful, fluid motion, precise hands' },
  { min: 20, max: 20, description: 'blur of movement, balletic reflexes' },
]
```

#### Constitution - Health & Vitality
```typescript
[Ability.Constitution]: [
  { min: 1, max: 1, description: 'sallow, frail skin, labored breathing' },
  { min: 2, max: 3, description: 'fragile bones, hunched, vulnerable' },
  { min: 4, max: 5, description: 'bruised, tender, easily wounded' },
  { min: 6, max: 7, description: 'pale, sickly, prone to illness' },
  { min: 8, max: 9, description: 'winded, flushed, breathy' },
  { min: 10, max: 11, description: 'normal health, occasional cough' },
  { min: 12, max: 13, description: 'sturdy, quick recovery, resilient' },
  { min: 14, max: 15, description: 'robust, steady stamina, long-working' },
  { min: 16, max: 17, description: 'unyielding, sleepless endurance' },
  { min: 18, max: 19, description: 'hardy, vital, barely fatigued' },
  { min: 20, max: 20, description: 'indestructible aura, tireless physiology' },
]
```

#### Intelligence - Mental Acuity & Expression
```typescript
[Ability.Intelligence]: [
  { min: 1, max: 1, description: 'animal gaze, instinctive reactions' },
  { min: 2, max: 3, description: 'distracted, primal expression' },
  { min: 4, max: 5, description: 'wordless, confused gestures' },
  { min: 6, max: 7, description: 'foggy thought, lost focus' },
  { min: 8, max: 9, description: 'puzzled look, mispronouncing words' },
  { min: 10, max: 11, description: 'practical, observant, plain expression' },
  { min: 12, max: 13, description: 'thoughtful, attentive, calculating gaze' },
  { min: 14, max: 15, description: 'quick-witted, curious, focused eyes' },
  { min: 16, max: 17, description: 'inventive, analytical posture' },
  { min: 18, max: 19, description: 'scholarly, knowing eyes, book props' },
  { min: 20, max: 20, description: 'genius aura, visionary stare' },
]
```

#### Wisdom - Perception & Intuition
```typescript
[Ability.Wisdom]: [
  { min: 1, max: 1, description: 'dazed, vacant stare' },
  { min: 2, max: 3, description: 'oblivious, overlooking details' },
  { min: 4, max: 5, description: 'absent-minded, impulsive posture' },
  { min: 6, max: 7, description: 'uncertain, poor-judgment expression' },
  { min: 8, max: 9, description: 'hesitant, misses context' },
  { min: 10, max: 11, description: 'calm, reasonable expression' },
  { min: 12, max: 13, description: 'empathetic, aware of emotions' },
  { min: 14, max: 15, description: 'perceptive, intuitive posture' },
  { min: 16, max: 17, description: 'wise demeanor, grounded presence' },
  { min: 18, max: 19, description: 'seer-like, quietly observant' },
  { min: 20, max: 20, description: 'near-prescient, contemplative aura' },
]
```

#### Charisma - Presence & Leadership
```typescript
[Ability.Charisma]: [
  { min: 1, max: 1, description: 'off-putting, alien features, repellent aura' },
  { min: 2, max: 3, description: 'subdued, indecisive, follower posture' },
  { min: 4, max: 5, description: 'awkward social posture' },
  { min: 6, max: 7, description: 'reserved, unengaging expression' },
  { min: 8, max: 9, description: 'dull smile, awkward presence' },
  { min: 10, max: 11, description: 'polished, polite smile' },
  { min: 12, max: 13, description: 'engaging, interesting glint' },
  { min: 14, max: 15, description: 'confident, commanding presence' },
  { min: 16, max: 17, description: 'magnetic, eloquent, respected' },
  { min: 18, max: 19, description: 'charismatic, captivating, crowd-drawing' },
  { min: 20, max: 20, description: 'radiant, iconic leader, commanding gaze' },
]
```

### Descriptor Design Principles

#### Visual Specificity
Each descriptor provides concrete, visual language that AI image generators can interpret:
- **"muscular, ripping wood, strong grip"** vs. abstract **"very strong"**
- **"graceful, fluid motion, precise hands"** vs. generic **"agile"**
- **"scholarly, knowing eyes, book props"** vs. simple **"intelligent"**

#### Progressive Scaling
Descriptors follow logical progression from weakness to exceptional ability:
- **Strength 1**: "frail, emaciated limbs" → **Strength 20**: "colossal, Herculean muscles"
- **Dexterity 1**: "immobile, rigid limbs" → **Dexterity 20**: "blur of movement, balletic reflexes"
- **Charisma 1**: "off-putting, alien features" → **Charisma 20**: "radiant, iconic leader"

#### AI-Friendly Language
Descriptors use terms that work well with image generation AI:
- **Physical Attributes**: "muscular", "slender", "robust", "graceful"
- **Posture & Stance**: "poised", "hunched", "commanding", "hesitant"
- **Facial Expressions**: "calculating gaze", "confident smile", "vacant stare"
- **Environmental Context**: "carrying a heavy load", "ready to dodge", "book props"

---

## Visual Translation Process

### Score-to-Description Algorithm

```typescript
const getAbilityScoreDescriptorsString = (scores: AbilityScores): string => {
    const descriptions = ABILITIES.map(ability => {
        const score = scores[ability];
        const descriptor = ABILITY_SCORE_DESCRIPTORS[ability].find(
            d => score >= d.min && score <= d.max
        );
        return descriptor ? descriptor.description : '';
    });
    return descriptions.filter(Boolean).join(', ');
};
```

### Translation Steps

1. **Score Lookup**: For each ability, find the matching descriptor range
2. **Description Extraction**: Retrieve the visual description text
3. **Synthesis**: Combine all ability descriptions into a single coherent string
4. **Integration**: Embed the combined description into the portrait prompt

### Example Translation

**Input Ability Scores:**
- Strength: 16
- Dexterity: 12
- Constitution: 14
- Intelligence: 10
- Wisdom: 15
- Charisma: 8

**Generated Description String:**
```
"muscular, ripping wood, strong grip, steady aim, poised stance, robust, steady stamina, long-working, practical, observant, plain expression, perceptive, intuitive posture, dull smile, awkward presence"
```

---

## Portrait Prompt Generation

### Integration Context

The ability score descriptors are embedded within a comprehensive portrait prompt that includes:

```typescript
export const getPortraitPrompt = (
    selectedClass: ClassInfo, 
    scores: AbilityScores, 
    gender: 'male' | 'female' | null, 
    theme: Theme, 
    characterTraits: CharacterTraits | null,
    level: number,
    secondarySkills: string[] | null,
    equipmentItems: Item[],
    lifeStandard: string | null,
    lifestyleDetails: Lifestyle | null,
    allThemes: Record<string, ThemeConfig>,
    race: Race | null
): string => {
    const abilityScoreDescriptors = getAbilityScoreDescriptorsString(scores);
    
    return `Generate a character portrait based on the following information.
    
**Physical & Mental Profile:** The character's abilities give them the following traits: ${abilityScoreDescriptors}.
    
[... additional prompt sections ...]
    
**Final Interpretation:** Interpret these physical and mental traits to influence the character's appearance. For example, a character described as frail should have a thin build, while a charismatic one might have a confident expression.`;
};
```

### Prompt Structure

The complete portrait prompt includes multiple contextual layers:

1. **Character Identity**
   - Race and physical description
   - Class and professional appearance
   - Gender specification

2. **Power Level Context**
   - Character level and title
   - Experience indication
   - Career stage representation

3. **Physical & Mental Profile** ⭐
   - **Ability score visual descriptors** (primary focus)
   - Direct translation of mechanical stats to visual traits

4. **Character Traits**
   - Positive physical traits
   - Positive mental traits
   - Character flaws

5. **Background Influence**
   - Secondary profession impact
   - Lifestyle and social standing
   - Equipment and gear

6. **Art Style Instructions**
   - Theme-specific visual style
   - Setting and atmosphere
   - Technical specifications (9:16 aspect ratio, full-body)

### Example Complete Prompt

```
Generate a character portrait based on the following information.

**Race:** Human
**Class & Level:** Level 3/9 Fighter with the title "Veteran"
**Gender:** Male

**Title & Power Level:** This character is a Level 3/9 Fighter with the title "Veteran". The title indicates their current standing and experience; they are not at the peak of their power unless their level is near maximum. Their appearance should reflect this stage of their career.

**Physical & Mental Profile:** The character's abilities give them the following traits: muscular, ripping wood, strong grip, steady aim, poised stance, robust, steady stamina, long-working, practical, observant, plain expression, perceptive, intuitive posture, dull smile, awkward presence.

**Character Traits to Influence Appearance:**
- Positive Physical: Broad shoulders and callused hands
- Positive Mental: Strategic thinking (subtly influence expression/demeanor)
- Negative Flaw: Prone to angry outbursts

**Secondary Profession:** The character has a background as a **blacksmith**. This is not their current adventuring role, but it has shaped their physique, posture, and bearing. For example, a blacksmith would have strong hands, a tailor might have a keen eye for detail, a farmer a weathered look. **Do not depict them performing the profession.** Instead, show how the profession has subtly influenced their appearance as an adventurer.

**Equipment & Gear:** They carry: chain mail, shield, sword, backpack, 50' rope, 10 torches, 7 days rations, waterskin, small sack, 94 gp. These items suggest a well-equipped but practical adventurer.

**Art Style Instructions:**
- Theme: Classic heroic fantasy
- Setting: Medieval fantasy world
- Atmosphere: Heroic and adventurous
- Visual Style: Detailed digital art with rich colors
- Additional Details: Emphasize classic D&D/OSE aesthetics

**Final Interpretation:** Interpret these physical and mental traits to influence the character's appearance. For example, a character described as frail should have a thin build, while a charismatic one might have a confident expression. The character is male. This is a primary visual characteristic; ensure the portrait strongly reflects this. The final image should be a single character, full-body portrait, with a 9:16 aspect ratio.
```

---

## Integration with AI Image Generation

### Google Imagen Integration

The OSE Character Roller uses Google's Imagen 4.0 for image generation:

```typescript
const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: { 
        numberOfImages: 1, 
        aspectRatio: '9:16', 
        outputMimeType: 'image/png' 
    },
});
```

### Visual Coherence Strategy

The ability score descriptors work synergistically with other prompt elements:

#### Physical Consistency
- **Strength descriptors** inform overall build and muscle definition
- **Dexterity descriptors** influence posture and movement suggestion
- **Constitution descriptors** affect skin tone, health appearance, and vitality

#### Mental Expression
- **Intelligence descriptors** shape facial expression and eye focus
- **Wisdom descriptors** influence overall demeanor and alertness
- **Charisma descriptors** determine confidence and approachability

#### Contextual Integration
- Ability descriptors provide the **foundation**
- Character traits add **personality details**
- Equipment and background add **situational context**
- Art style ensures **thematic coherence**

### AI Interpretation Guidelines

The prompt includes explicit interpretation instructions:

```
**Final Interpretation:** Interpret these physical and mental traits to influence the character's appearance. For example, a character described as frail should have a thin build, while a charismatic one might have a confident expression.
```

This ensures the AI understands how to translate descriptive text into visual elements.

---

## Example Transformations

### Example 1: The Mighty Warrior

**Ability Scores:**
- STR: 18, DEX: 10, CON: 16, INT: 8, WIS: 12, CHA: 14

**Generated Description:**
```
"burly, powerful, work-animal strength, nimble enough to catch a small object, unyielding, sleepless endurance, puzzled look, mispronouncing words, empathetic, aware of emotions, confident, commanding presence"
```

**AI Interpretation Result:**
- **Physical**: Heavily muscled build with broad shoulders and thick limbs
- **Posture**: Confident stance but somewhat clumsy in fine movements
- **Expression**: Strong but not particularly bright, kind eyes, natural leadership presence
- **Overall**: Classic "strong but not smart" warrior archetype

### Example 2: The Agile Scholar

**Ability Scores:**
- STR: 8, DEX: 17, CON: 10, INT: 18, WIS: 15, CHA: 12

**Generated Description:**
```
"tired arms, hesitant lift, light-footed, springing motion, normal health, occasional cough, scholarly, knowing eyes, book props, perceptive, intuitive posture, engaging, interesting glint"
```

**AI Interpretation Result:**
- **Physical**: Lean, wiry build with graceful movements
- **Posture**: Fluid, dance-like movement with scholarly bearing
- **Expression**: Highly intelligent eyes with perceptive awareness
- **Props**: Likely to include books, scrolls, or academic equipment
- **Overall**: Classic wizard/scholar with natural grace

### Example 3: The Charming Rogue

**Ability Scores:**
- STR: 12, DEX: 16, CON: 12, INT: 14, WIS: 10, CHA: 18

**Generated Description:**
```
"solid build carrying a heavy load, light-footed, springing motion, sturdy, quick recovery, resilient, quick-witted, curious, focused eyes, calm, reasonable expression, radiant, iconic leader, commanding gaze"
```

**AI Interpretation Result:**
- **Physical**: Well-proportioned, athletic build with graceful movement
- **Posture**: Confident, charismatic stance with fluid agility
- **Expression**: Intelligent, piercing eyes with magnetic presence
- **Demeanor**: Natural leader with approachable but commanding aura
- **Overall**: Swashbuckling rogue or charismatic adventurer

### Example 4: The Frail Mystic

**Ability Scores:**
- STR: 6, DEX: 8, CON: 7, INT: 16, WIS: 18, CHA: 10

**Generated Description:**
```
"strained, pushing with effort, slight stumble, hesitant step, pale, sickly, prone to illness, inventive, analytical posture, seer-like, quietly observant, polished, polite smile"
```

**AI Interpretation Result:**
- **Physical**: Thin, frail build with pale complexion
- **Posture**: Careful, deliberate movements suggesting physical weakness
- **Expression**: Intensely intelligent and perceptive eyes
- **Demeanor**: Wise beyond years with otherworldly awareness
- **Overall**: Classic hermit sage or mystical oracle

---

## Technical Implementation

### File Structure

```
ability-score-descriptors.ts    # Core descriptor data
prompt-data.ts                  # Prompt generation functions
hooks/ai/usePortraitGeneration.ts  # Portrait generation logic
types.ts                        # TypeScript interfaces
```

### Key Functions

#### 1. Descriptor Lookup
```typescript
const getAbilityScoreDescriptorsString = (scores: AbilityScores): string => {
    const descriptions = ABILITIES.map(ability => {
        const score = scores[ability];
        const descriptor = ABILITY_SCORE_DESCRIPTORS[ability].find(
            d => score >= d.min && score <= d.max
        );
        return descriptor ? descriptor.description : '';
    });
    return descriptions.filter(Boolean).join(', ');
};
```

#### 2. Portrait Prompt Assembly
```typescript
export const getPortraitPrompt = (
    selectedClass: ClassInfo, 
    scores: AbilityScores, 
    // ... other parameters
): string => {
    const abilityScoreDescriptors = getAbilityScoreDescriptorsString(scores);
    
    return `Generate a character portrait...
**Physical & Mental Profile:** The character's abilities give them the following traits: ${abilityScoreDescriptors}.
...`;
};
```

#### 3. AI Image Generation
```typescript
const onGeneratePortrait = useCallback(async (
    gender: 'male' | 'female' | null, 
    theme: Theme, 
    // ... other parameters
) => {
    const prompt = getPortraitPrompt(selectedClass, scores, gender, theme, traits, level, secondarySkills, equipmentItems, lifeStandard, lifestyleDetails, aggregatedData.THEMES, race);
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: { numberOfImages: 1, aspectRatio: '9:16', outputMimeType: 'image/png' },
    });
    
    const newPortrait = `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
    setPortrait(newPortrait);
}, [selectedClass, scores, /* ... dependencies */]);
```

### Data Flow

1. **User Input**: Player rolls or adjusts ability scores
2. **Score Processing**: `getAbilityScoreDescriptorsString()` converts scores to descriptions
3. **Prompt Assembly**: `getPortraitPrompt()` integrates descriptions with other context
4. **AI Generation**: Google Imagen processes the complete prompt
5. **Image Display**: Generated portrait is displayed in the interface

### Performance Considerations

- **Caching**: Descriptor lookups are fast O(1) operations
- **Lazy Generation**: Portraits are only generated when requested
- **Error Handling**: Fallback descriptions for edge cases
- **Rate Limiting**: AI API calls are throttled to prevent quota exhaustion

---

## Adaptation Guidelines

### For Other Game Systems

#### Delta Green Adaptation
For modern horror settings, adapt descriptors to contemporary contexts:

```typescript
// Original fantasy: "scholarly, knowing eyes, book props"
// Delta Green: "analytical gaze, briefcase, federal bearing"

// Original fantasy: "muscular, ripping wood, strong grip"  
// Delta Green: "athletic build, tactical posture, firm handshake"
```

#### Cyberpunk Adaptation
For futuristic settings, include technological elements:

```typescript
// High Intelligence: "augmented neural interface, data-stream focus"
// High Dexterity: "cybernetic reflexes, wire-jack precision"
// High Charisma: "holographic presence, social media magnetism"
```

#### Historical Settings
For specific time periods, adjust language and context:

```typescript
// Victorian Era Intelligence: "gentleman scholar, wire-rimmed spectacles"
// Wild West Strength: "ranch-hardened muscles, lasso-calloused hands"
// Medieval Charisma: "noble bearing, courtly presence"
```

### Descriptor Writing Guidelines

#### Visual Specificity
- Use concrete, observable traits rather than abstract concepts
- Include environmental context that supports the trait
- Provide multiple visual elements per descriptor

#### AI Compatibility
- Use language that image AI systems understand well
- Avoid ambiguous or overly poetic descriptions
- Include specific props, postures, and expressions

#### Mechanical Consistency
- Ensure clear progression from low to high scores
- Maintain logical relationships between adjacent score ranges
- Avoid contradictory descriptions within ability sets

#### Cultural Sensitivity
- Consider diverse representations of strength, beauty, and intelligence
- Avoid stereotypical or biased physical descriptions
- Include variety in body types, features, and expressions

### Technical Extensions

#### Dynamic Range Adjustment
```typescript
// Extend ranges for superhuman campaigns
{ min: 21, max: 25, description: 'godlike strength, reality-bending power' }

// Add fractional descriptors for precise systems
{ min: 10.5, max: 11.4, description: 'slightly above average build' }
```

#### Contextual Modifiers
```typescript
// Environmental adjustments
const getModifiedDescriptor = (baseDescription: string, environment: Environment) => {
    if (environment === 'underwater') {
        return baseDescription.replace('running', 'swimming');
    }
    return baseDescription;
};
```

#### Multi-Language Support
```typescript
// Localized descriptors
const ABILITY_SCORE_DESCRIPTORS_ES: Record<Ability, AbilityScoreDescriptor[]> = {
    [Ability.Strength]: [
        { min: 1, max: 1, description: 'frágil, extremidades demacradas, postura colapsada' },
        // ...
    ]
};
```

---

## Conclusion

The OSE Character Roller's ability score visual system represents a sophisticated approach to bridging tabletop RPG mechanics and AI-generated artwork. By transforming abstract numerical values into concrete, AI-compatible visual descriptions, the system enables the automatic generation of character portraits that accurately reflect a character's mechanical capabilities.

This system's strength lies in its:

- **Mechanical Fidelity**: Every ability score produces visually distinct results
- **AI Compatibility**: Descriptions are optimized for image generation systems
- **Narrative Integration**: Visual traits support character storytelling
- **Extensibility**: The framework adapts to different game systems and settings

The approach demonstrates how modern RPG tools can seamlessly integrate traditional game mechanics with cutting-edge AI technologies, creating richer and more immersive character creation experiences.

Whether adapted for Delta Green's modern horror, cyberpunk futures, or historical campaigns, this visual descriptor system provides a robust foundation for translating character statistics into compelling visual narratives.