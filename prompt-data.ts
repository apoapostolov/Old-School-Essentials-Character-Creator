
import { ABILITY_SCORE_DESCRIPTORS } from './ability-score-descriptors';
import { ABILITIES } from './constants';
import { collectPromptOverrideText, type PromptPayloadOptions } from './lib/ai/prompt-overrides';
import type { AbilityScores, CharacterTraits, ClassInfo, Emotion, Item, Lifestyle, LifestyleKey, Race, Theme, ThemeConfig } from './types';
import { getTitleForLevel } from './utils';

const getArchetype = (classInfo: ClassInfo): string => {
    const parts = new Set<string>();

    if (classInfo.attackBonusProgression === 'Martial') {
        parts.add('Fighter');
    }

    if (classInfo.spellcastingInfo) {
        if (classInfo.spellcastingInfo.caster_type === 'Arcane') {
            parts.add('Magic-User');
        } else if (classInfo.spellcastingInfo.caster_type === 'Divine') {
            parts.add('Cleric');
        }
    }

    if (classInfo.skill_type) {
        parts.add('Thief');
    }

    // Fallbacks if no specific archetype parts were added
    if (parts.size === 0) {
        if (classInfo.attackBonusProgression === 'SemiMartial') return 'Warrior';
        if (classInfo.attackBonusProgression === 'NonMartial') return 'Adept';
        return 'Adventurer';
    }

    // Sort to ensure consistent order e.g. Fighter/Magic-User not Magic-User/Fighter
    const sortedParts = Array.from(parts).sort((a, b) => {
        const order = ['Fighter', 'Cleric', 'Magic-User', 'Thief'];
        return order.indexOf(a) - order.indexOf(b);
    });

    return sortedParts.join('/');
}

// --- Name Generation ---
export const getNamePrompt = (
    gender: string,
    selectedClass: ClassInfo,
    theme: Theme,
    allThemes: Record<string, ThemeConfig>,
    options?: PromptPayloadOptions,
) => {
    const themeConfig = allThemes[theme] ?? allThemes['ose'];
    const isDemihuman = selectedClass.group === 'Demihuman';
    const characterType = isDemihuman ? selectedClass.name.toLowerCase() : selectedClass.name;
    const desc = themeConfig?.name?.promptDescription ?? 'in a classic D&D/OSE fantasy world.';
    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'name',
        gender,
        ethnos: options?.ethnos,
        socialStanding: options?.socialStanding,
        raceName: options?.raceName,
        classGroup: selectedClass.group,
    });
    return `Generate a single, unique character name suitable for a ${gender} ${characterType} ${desc}.
${override ? `
${override}
` : ''}
Provide the name in JSON format with a single key: "name".`;
};

export const getVillageNamePrompt = (
    socialStanding: string,
    ethnos: string,
    options?: PromptPayloadOptions,
): string => {
    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'village',
        ethnos: options?.ethnos ?? ethnos,
        socialStanding: options?.socialStanding ?? socialStanding,
    });
    if (override) {
        return `${override}
Return ONLY the village name as JSON: {"villageName":"..."}`;
    }
    return `Generate a single authentic Slavic fantasy village or homestead name for the Grand Duchy of Karameikos setting (based on Mystara D&D). The character is from a family with ${socialStanding} social standing and ${ethnos} ethnicity. The name should sound like it belongs in Eastern European folklore with Slavic linguistic patterns. One token: hyphens allowed, no spaces. Return ONLY the village name as JSON: {"villageName":"..."}`;
};

// --- Traits Generation (Split into two parts) ---

export const getLifeStandardPrompt = (
    selectedClass: ClassInfo,
    scores: AbilityScores,
    gender: string,
    theme: Theme,
    secondarySkills: string[],
    lifestyleDetails: Lifestyle,
    failureEvent: { tier: LifestyleKey, type: 'brutal' | 'unfortunate' } | null,
    options?: PromptPayloadOptions,
) => {
    const isDemihuman = selectedClass.group === 'Demihuman';
    const characterType = isDemihuman ? selectedClass.name.toLowerCase() : selectedClass.name;

    const professionClause = `The character's secondary skill/profession is **${secondarySkills.join(' and ')}**.
This profession is associated with a **${lifestyleDetails.name}** lifestyle, described as: "${lifestyleDetails.description}".`;

    const failureClause = failureEvent
        ? `\n\n**Crucial Narrative Event:** The character's career was marked by a significant setback. They attempted to advance from a **${failureEvent.tier}** lifestyle but failed due to a **${failureEvent.type === 'brutal' ? 'brutal and unforgiving' : 'deeply unfortunate'}** life event (e.g., famine, war, disease, bandits, a bad business deal, a personal tragedy). **You MUST invent and incorporate this specific event into the narrative as the reason their progress stalled.**`
        : '';

    const rulesClause = `Generate a 'lifeStandard' field: a single, evocative sentence (max 25 words) that describes their success and standard of living from this past profession.
Use the following scores to make your judgment: WIS ${scores.Wisdom}, INT ${scores.Intelligence}, CHA ${scores.Charisma}. Your judgment MUST follow these rules:
- High WIS (13+) implies they were skilled and successful. Low WIS (8-) implies they were unskilled or mediocre.
- High INT (13+), if the profession allows, implies they became wealthier than the typical lifestyle. Low INT (8-) implies they struggled financially.
- High CHA (13+) implies they were well-respected or liked. Low CHA (8-) implies they were disliked or infamous.
Combine these factors into one fluid sentence about their past career, grounding it in the following background style: **${lifestyleDetails.backgroundStyle}**.`;

    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'lifeStandard',
        gender,
        ethnos: options?.ethnos,
        socialStanding: options?.socialStanding,
        raceName: options?.raceName,
        classGroup: selectedClass.group,
    });
    return `Generate a "lifeStandard" for a ${gender} ${characterType}. ${professionClause}${failureClause}\n\n${rulesClause}${override ? `\n\n${override}` : ''} Provide the output in JSON format with a single key: "lifeStandard".`;
};


export const getTraitsPrompt = (
    selectedClass: ClassInfo,
    gender: string,
    theme: Theme,
    lifeStandard: string | null,
    allThemes: Record<string, ThemeConfig>,
    options?: PromptPayloadOptions,
) => {
    const themeConfig = allThemes[theme].traits;
    const contextClause = lifeStandard ? `Their background is summarized as: "${lifeStandard}". The traits you generate should be consistent with this life experience.` : '';
    const isDemihuman = selectedClass.group === 'Demihuman';
    const characterType = isDemihuman ? selectedClass.name.toLowerCase() : selectedClass.name;
    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'traits',
        gender,
        ethnos: options?.ethnos,
        socialStanding: options?.socialStanding,
        raceName: options?.raceName,
        classGroup: selectedClass.group,
    });
    return `Generate three distinct character traits for a ${gender} ${characterType} ${themeConfig.promptDescription}. ${contextClause}${override ? ` ${override}` : ''} Provide the traits in JSON format according to the specified schema. The negative trait should be a significant flaw that adds depth and potential for conflict, reflecting the chosen theme. It could be a physical ailment, a psychological compulsion, or a dark personality quirk.`;
};

// --- Helper for Portrait Prompt ---
const getAbilityScoreDescriptorsString = (scores: AbilityScores): string => {
    const descriptions = ABILITIES.map(ability => {
        const score = scores[ability];
        const descriptor = ABILITY_SCORE_DESCRIPTORS[ability].find(d => score >= d.min && score <= d.max);
        return descriptor ? descriptor.description : '';
    });
    return descriptions.filter(Boolean).join(', ');
};

// --- Portrait & Description Generation ---
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
    race: Race | null,
    options?: PromptPayloadOptions,
): string => {
    const title = getTitleForLevel(selectedClass, level);
    const abilityScoreDescriptors = getAbilityScoreDescriptorsString(scores);
    const genderInstruction = gender ? `The character is ${gender}. This is a primary visual characteristic; ensure the portrait strongly reflects this.` : `The gender is not specified; interpret freely based on the class and theme.`;
    const portraitPromptConfig = allThemes[theme].portrait;
    const professionInstruction = secondarySkills ? `**Secondary Profession:** The character has a background as a **${secondarySkills.join(' and ')}**. This is not their current adventuring role, but it has shaped their physique, posture, and bearing. For example, a blacksmith would have strong hands, a tailor might have a keen eye for detail, a farmer a weathered look. **Do not depict them performing the profession.** Instead, show how the profession has subtly influenced their appearance as an adventurer.` : '';

    let raceInstruction = '';
    // Determine the primary "race" identity for the prompt
    let raceNameForPrompt: string | null = null;
    let physicalDescForPrompt: string | null = null;

    // 1. Prioritize an explicitly selected Race
    if (race && race.name !== 'Human') {
        raceNameForPrompt = race.name;
        if (race.physicalDescription) {
            physicalDescForPrompt = gender === 'female'
                ? (race.physicalDescription.female || race.physicalDescription.male)
                : (race.physicalDescription.male || race.physicalDescription.female);
        }
    }
    // 2. If no race is selected, check if the class is Demihuman
    else if (!race && selectedClass.group === 'Demihuman') {
        raceNameForPrompt = selectedClass.name;
        if (selectedClass.physicalDescription) {
            physicalDescForPrompt = gender === 'female'
                ? (selectedClass.physicalDescription.female || selectedClass.physicalDescription.male)
                : (selectedClass.physicalDescription.male || selectedClass.physicalDescription.female);
        }
    }

    if (raceNameForPrompt) {
        let physicalDescClause = '';
        if (physicalDescForPrompt) {
            physicalDescClause = ` As a member of this race, they are typically ${physicalDescForPrompt}. This is a key visual instruction.`;
        }
        raceInstruction = `**Race:** ${raceNameForPrompt}.${physicalDescClause}`;
    }

    const classInstruction = selectedClass.group !== 'Demihuman' ? `**Character Class:** ${selectedClass.name}` : null;

    // Equipment Instructions
    const weapons = equipmentItems.filter(i => i.category === 'Weapon');
    const armor = equipmentItems.find(i => i.category === 'Armor' && !i.name.toLowerCase().includes('shield'));
    const shield = equipmentItems.find(i => i.category === 'Armor' && i.name.toLowerCase().includes('shield'));
    const gearItems = equipmentItems.filter(i => i.category === 'Gear');

    let containerInstruction = '';
    if (gearItems.length > 0) {
        if (gearItems.length >= 30) {
            let animal = (selectedClass.prefers_warhorse || level >= 3) ? 'horse' : 'donkey or mule';
            containerInstruction = `The character is accompanied by a pack animal (a ${animal}) laden with large saddlebags, indicating they carry a great deal of adventuring gear.`;
        } else if (gearItems.length >= 20) {
            containerInstruction = "The character wears a large, heavily-laden trekking backpack, suitable for long expeditions.";
        } else if (gearItems.length >= 10) {
            containerInstruction = "The character wears a moderately-sized adventurer's backpack.";
        } else {
            containerInstruction = "The character carries a small sack or has belt pouches for their essential gear.";
        }
    }

    const equipmentInstruction = `**Visible Equipment:** The character should be visibly equipped with the following:
- Armor: ${armor ? armor.name : 'No armor/simple clothing'}.
- Shield: ${shield ? shield.name : 'No shield'}.
- Weapons: ${weapons.length > 0 ? weapons.map(w => w.name).join(', ') : 'No visible weapons'}. All listed weapons should be visible on their person (e.g., one in hand, others sheathed or slung).`;

    const lifestyleInstruction = lifestyleDetails ? `**Lifestyle & Appearance:** Their past life has left its mark. Their overall appearance—clothing, gear, hygiene—should reflect a **${lifestyleDetails.name}** standard of living.
- **Clothing Quality:** ${lifestyleDetails.clothingQuality}
- **Weapon & Armor Quality:** ${lifestyleDetails.weaponQuality} for weapons, and ${lifestyleDetails.armorQuality} for armor.
- **Hygiene Quality:** ${lifestyleDetails.hygieneQuality}
- **Background Influence:** This statement further refines their look: "${lifeStandard || 'An average life for their station.'}"` : '';

    const headerParts = [
        raceInstruction,
        classInstruction,
        gender ? `**Gender:** ${gender.charAt(0).toUpperCase() + gender.slice(1)}` : null
    ].filter(Boolean);

    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'portrait',
        gender,
        ethnos: options?.ethnos,
        socialStanding: options?.socialStanding,
        raceName: options?.raceName ?? race?.name ?? raceNameForPrompt,
        classGroup: selectedClass.group,
    });

    return `Generate a character portrait based on the following information.
${headerParts.join('\n')}
**Title & Power Level:** This character is a Level ${level}/${selectedClass.maxLevel} ${selectedClass.name} with the title "${title}". The title indicates their current standing and experience; they are not at the peak of their power unless their level is near maximum. Their appearance should reflect this stage of their career.
**Physical & Mental Profile:** The character's abilities give them the following traits: ${abilityScoreDescriptors}.
${characterTraits ? `**Character Traits to Influence Appearance:**
- Positive Physical: ${characterTraits.positivePhysical}
- Positive Mental: ${characterTraits.positiveMental} (subtly influence expression/demeanor)
- Negative Flaw: ${characterTraits.negative}` : ''}
${professionInstruction}
${lifestyleInstruction}
${equipmentInstruction}
${containerInstruction}
**Art Style Instructions:**
- Theme: ${portraitPromptConfig.theme}
- Setting: ${portraitPromptConfig.setting}
- Atmosphere: ${portraitPromptConfig.atmosphere}
- Visual Style: ${portraitPromptConfig.visualStyle}
- Additional Details: ${portraitPromptConfig.additionalDetails}
${override ? `${override}
` : ''}**Final Interpretation:** Interpret these physical and mental traits to influence the character's appearance. For example, a character described as frail should have a thin build, while a charismatic one might have a confident expression. ${genderInstruction} The final image should be a single character, full-body portrait, with a 9:16 aspect ratio.`;
};

export const getDescriptionPrompt = (traits: CharacterTraits | null): string => {
    return `Analyze this character portrait. Also consider these traits: ${traits ? `Physical: ${traits.positivePhysical}, Mental: ${traits.positiveMental}, Flaw: ${traits.negative}` : 'Not specified'}.
    Generate two short descriptive lines for a character sheet:
    1. A profile of physical stats. Include Age, Height, Weight, Hair, Skin, Eyes, and Build. Format as a comma-separated list of key-value pairs. Max 65 characters.
    2. A factual physical description summarizing the character's appearance and demeanor. Max 65 characters.
    Return a JSON object with keys "line1" and "line2".`;
};

export const getHeadshotPrompt = (): string => {
    return `Your SOLE function is to provide JSON coordinates for a bounding box. Analyze the provided full-body portrait.

Your goal is to define a perfectly SQUARE (1:1 aspect ratio) bounding box for a classic head-and-shoulders RPG portrait token.

CRITICAL INSTRUCTIONS:
1.  **SQUARE BOX:** The 'width' and 'height' values in your JSON output MUST be identical.
2.  **FRAMING:** The box must frame the character's full head and shoulders. Do NOT include the torso below the collarbones, the waist, or arms.
3.  **CENTERING:** The character's face (specifically the point between their eyes) must be at the EXACT center of the square you define.
4.  **COORDINATES:** Use normalized coordinates from 0.0 to 1.0, where (x:0, y:0) is the top-left corner.

The output MUST be ONLY the raw JSON object. Do not add any extra text, markdown, or explanations.

Example of a PERFECT response:
{
  "x": 0.3,
  "y": 0.05,
  "width": 0.4,
  "height": 0.4
}`;
};

export const getEmotionalPortraitPrompt = (emotion: Emotion): string => {
    return `Re-render this character portrait. ${emotion.prompt}. Keep the character's features, clothing, and art style identical, only changing the facial expression. The output image must maintain the same aspect ratio.`;
};


// --- Backstory Generation ---
export const getBackstoryPrompt = (
    characterName: string,
    selectedClass: ClassInfo,
    scores: AbilityScores,
    gender: 'male' | 'female' | null,
    theme: Theme,
    characterTraits: CharacterTraits,
    level: number,
    secondarySkills: string[] | null,
    equipmentItems: Item[],
    lifeStandard: string | null,
    lifestyleDetails: Lifestyle | null,
    allThemes: Record<string, ThemeConfig>,
    race: Race | null,
    options?: PromptPayloadOptions,
): string => {
    const title = getTitleForLevel(selectedClass, level);
    const themeConfig = allThemes[theme];
    const abilityScoreDescriptors = getAbilityScoreDescriptorsString(scores);
    const equipmentList = equipmentItems.map(i => i.name).join(', ') || 'basic starting gear';

    let raceInstruction = '';
    if (race && race.name !== 'Human') {
        let physicalDesc = '';
        if (race.physicalDescription) {
            const desc = gender === 'female'
                ? (race.physicalDescription.female || race.physicalDescription.male)
                : (race.physicalDescription.male || race.physicalDescription.female);
            if (desc) {
                physicalDesc = ` As a member of this race, they are typically ${desc}.`;
            }
        }
        raceInstruction = `**Race:** ${race.name}.${physicalDesc}`;
    }

    const classInstruction = selectedClass.group === 'Demihuman'
        ? `**Level:** ${level}`
        : `**Class & Level:** Level ${level} ${selectedClass.name}`;

    const levelExperienceClause = level > 1
        ? `This character is Level ${level}. Their story must reflect this experience. For each level above one (that's ${level - 1} adventure${level > 2 ? 's' : ''}), they have survived a significant and perilous undertaking appropriate for their level. Briefly allude to these past exploits to explain their current competence and outlook.`
        : 'This character is at the very beginning of their adventuring career.';

    const override = collectPromptOverrideText(options?.promptOverrides, {
        kind: 'backstory',
        gender,
        ethnos: options?.ethnos,
        socialStanding: options?.socialStanding,
        raceName: options?.raceName ?? race?.name,
        classGroup: selectedClass.group,
    });

    return `You are a human fantasy author with a knack for creating grounded, compelling character histories. Write a detailed, two-page backstory for the following character. The story should be a summary of their life, from youth to their current adventuring career. Weave their traits and abilities into the narrative subtly, without listing them directly.

**Character Details:**
- **Name:** ${characterName}
${raceInstruction ? `- ${raceInstruction}\n` : ''}- ${classInstruction}
- **Gender:** ${gender || 'Not specified'}
- **Theme/Setting:** ${themeConfig.displayName} (${themeConfig.portrait.atmosphere})
- **Core Being (Abilities):** Their innate nature is defined by these traits: ${abilityScoreDescriptors}.
- **Personality (Generated Traits):**
    - **Physical Quirk/Strength:** ${characterTraits.positivePhysical}
    - **Mental Quirk/Strength:** ${characterTraits.positiveMental}
    - **Defining Flaw:** ${characterTraits.negative}
- **Past Life (Profession):**
    - **Profession:** ${secondarySkills ? secondarySkills.join(', ') : 'None specified'}
    - **Lifestyle:** ${lifestyleDetails ? `${lifestyleDetails.name} (${lifestyleDetails.description})` : 'Not specified'}
    - **Career Summary:** "${lifeStandard || 'An average life for their station.'}"
- **Current Gear:** They are currently equipped with: ${equipmentList}.

**Writing Instructions:**
1.  **Narrative Arc:** Structure the story to cover their youth, their time in their profession (if any), a pivotal event that pushed them into adventuring, and their current motivations.
2.  **Subtle Integration:** Do not say "they were clumsy because of low Dexterity." Instead, describe an event where their clumsiness had consequences. Show, don't tell, how their personality traits and abilities have shaped their life and decisions.
3.  **Focus on the "Why":** The most important part is the inciting incident. What made them leave their old life? Was it tragedy, ambition, desperation, or a calling?
4.  **Incorporate Experience:** ${levelExperienceClause}
5.  **Formatting:** Use Markdown to bold the names of any important characters (family, mentors, rivals), places (hometowns, significant locations), or unique items you invent for the story. For example: "He was born in the village of **Oakhaven** to his parents, **Elara** and **Garrick**."
6.  **Tone & Style:** The tone should be serious and grounded, fitting the specified theme. The output must be a single long string with paragraphs separated by double newlines (\\n\\n).${override ? `\n7.  **Setting override:** ${override}` : ''}`;
};

// --- Grog Generation ---
export const getGrogDetailsPrompt = (theme: Theme) => {
    return `Generate details for a "grog", a low-level mercenary hireling in a ${theme} fantasy world. He is a rugged, low-caste character. Provide the output in JSON format with three keys: "name" (a single, common name), "traits" (an object with "positivePhysical", "positiveMental", and "negative" string properties), and "trinkets" (a short, comma-separated string of 2-3 personal belongings or trinkets).`;
};

export const getGrogPortraitPrompt = (name: string, traits: CharacterTraits, theme: Theme) => {
    return `Generate a character portrait. This is a "grog", a low-level hireling, a common thug or mercenary, not a heroic player character. **Name:** ${name}. **Traits to influence appearance:** Physical: ${traits.positivePhysical}, Mental: ${traits.positiveMental}, Flaw: ${traits.negative}. **Art Style:** The art style should be a gritty, realistic headshot portrait with a 1:1 aspect ratio. The character should look rugged and unkempt, with basic, worn gear, reflecting a ${theme} theme. The focus is on a low-caste individual.`;
};
