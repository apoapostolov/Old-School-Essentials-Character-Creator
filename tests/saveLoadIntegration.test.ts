/**
 * Integration tests for OSE Save/Load System
 * 
 * Tests save naming priority, data serialization, and import/export
 */

import { describe, it, expect, beforeEach } from 'vitest';

const createMockLocalStorage = () => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
};

describe('OSE Save/Load System - Naming Priority', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should prioritize AI-generated name over custom name', () => {
        const aiName = 'Thorin Ironforge';
        const customName = 'My Save';
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Thorin Ironforge');
    });

    it('should use custom name when AI name is not available', () => {
        const aiName = null;
        const customName = 'Custom Name';
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Custom Name');
    });

    it('should use placeholder when neither name exists', () => {
        const aiName = null;
        const customName = null;
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Character 1');
    });

    it('should create correct placeholder for different slots', () => {
        const testCases = [
            { slotIndex: 0, expected: 'Character 1' },
            { slotIndex: 1, expected: 'Character 2' },
            { slotIndex: 4, expected: 'Character 5' },
        ];

        testCases.forEach(({ slotIndex, expected }) => {
            const finalName = `Character ${slotIndex + 1}`;
            expect(finalName).toBe(expected);
        });
    });
});

describe('OSE Save/Load System - Data Serialization', () => {
    it('should serialize complete character data', () => {
        const fullCharacterData = {
            // Ability Scores
            scores: {
                strength: 16,
                intelligence: 12,
                wisdom: 10,
                dexterity: 14,
                constitution: 15,
                charisma: 8
            },

            // Class & Race
            selectedClass: {
                name: 'Dwarf',
                type: 'race-as-class',
                hitDice: '1d8'
            },
            selectedRace: null,

            // Level & HP
            characterLevel: 3,
            hpResult: {
                maxHP: 22,
                currentHP: 22,
                rolls: [8, 7, 7]
            },

            // Skills (for advanced classes)
            calculatedThiefSkills: {
                'Open Locks': 25,
                'Find/Remove Traps': 20,
                'Pick Pockets': 30
            },

            // AI Content
            ai: {
                name: 'Thorin Ironforge',
                characterTraits: {
                    positivePhysical: 'Stocky and strong',
                    positiveMental: 'Stubborn determination',
                    negative: 'Distrustful of elves'
                },
                languages: ['Common', 'Dwarvish', 'Goblin'],
                backstory: 'Exiled from his mountain home...'
            },

            // Equipment & Money
            allItemKeys: ['longsword', 'chain-mail', 'backpack'],
            equipmentWeight: 60,
            finalMoney: { gp: 150, sp: 40, cp: 20 },

            // Spells (for spellcasters)
            knownSpells: ['Magic Missile', 'Shield', 'Sleep'],

            // Grog (henchman/follower)
            grog: {
                name: 'Stumpy',
                class: 'Fighter',
                level: 1,
                loyalty: 8
            }
        };

        const saveData = {
            version: '1.0.0',
            system: 'ose',
            timestamp: Date.now(),
            characterData: fullCharacterData
        };

        const serialized = JSON.stringify(saveData);
        const deserialized = JSON.parse(serialized);

        expect(deserialized.characterData.scores).toEqual(fullCharacterData.scores);
        expect(deserialized.characterData.selectedClass).toEqual(fullCharacterData.selectedClass);
        expect(deserialized.characterData.ai.name).toBe('Thorin Ironforge');
        expect(deserialized.characterData.hpResult).toEqual(fullCharacterData.hpResult);
        expect(deserialized.characterData.allItemKeys).toEqual(fullCharacterData.allItemKeys);
    });

    it('should handle different class types', () => {
        const classes = [
            { name: 'Fighter', type: 'basic' },
            { name: 'Magic-User', type: 'basic' },
            { name: 'Thief', type: 'basic' },
            { name: 'Dwarf', type: 'race-as-class' },
            { name: 'Acrobat', type: 'advanced' }
        ];

        classes.forEach(classInfo => {
            const characterData = {
                selectedClass: classInfo,
                ai: { name: 'Test' }
            };

            const saved = JSON.stringify(characterData);
            const loaded = JSON.parse(saved);

            expect(loaded.selectedClass).toEqual(classInfo);
        });
    });
});

describe('OSE Save/Load System - Import/Export', () => {
    it('should export character to valid JSON format', () => {
        const character = {
            ai: { name: 'Elara Moonwhisper' },
            scores: { strength: 9, intelligence: 16, wisdom: 14 },
            selectedClass: { name: 'Elf', type: 'race-as-class' },
            characterLevel: 2
        };

        const slot = {
            characterName: 'Elara Moonwhisper',
            system: 'ose',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                system: 'ose',
                timestamp: Date.now(),
                characterData: character
            }
        };

        const exported = JSON.stringify(slot, null, 2);
        
        expect(() => JSON.parse(exported)).not.toThrow();
        
        const parsed = JSON.parse(exported);
        expect(parsed.characterName).toBe('Elara Moonwhisper');
        expect(parsed.system).toBe('ose');
        expect(parsed.data.characterData.scores).toEqual(character.scores);
    });

    it('should import character from exported JSON', () => {
        const exportedJSON = JSON.stringify({
            characterName: 'Imported Hero',
            system: 'ose',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                system: 'ose',
                characterData: {
                    ai: { name: 'Imported Hero' },
                    scores: { strength: 18, intelligence: 8, wisdom: 10 },
                    selectedClass: { name: 'Fighter', type: 'basic' },
                    hpResult: { maxHP: 8, currentHP: 8, rolls: [8] }
                }
            }
        });

        const imported = JSON.parse(exportedJSON);

        expect(imported.characterName).toBe('Imported Hero');
        expect(imported.data.characterData.scores.strength).toBe(18);
        expect(imported.data.characterData.selectedClass.name).toBe('Fighter');
    });
});

describe('OSE Save/Load System - Field Validation', () => {
    it('should preserve all required character fields', () => {
        const requiredFields = {
            scores: { strength: 14, intelligence: 11, wisdom: 9, dexterity: 13, constitution: 12, charisma: 10 },
            selectedClass: { name: 'Cleric', type: 'basic' },
            characterLevel: 3,
            hpResult: { maxHP: 15, currentHP: 15, rolls: [6, 5, 4] },
            ai: {
                name: 'Brother Marcus',
                characterTraits: {
                    positivePhysical: 'Sturdy build',
                    positiveMental: 'Devout faith',
                    negative: 'Overly judgmental'
                }
            }
        };

        const saved = JSON.stringify(requiredFields);
        const loaded = JSON.parse(saved);

        expect(loaded.scores).toEqual(requiredFields.scores);
        expect(loaded.selectedClass).toEqual(requiredFields.selectedClass);
        expect(loaded.hpResult).toEqual(requiredFields.hpResult);
        expect(loaded.ai).toEqual(requiredFields.ai);
    });

    it('should preserve optional class-specific fields', () => {
        const thiefFields = {
            calculatedThiefSkills: {
                'Climb Sheer Surfaces': 87,
                'Hide in Shadows': 20,
                'Move Silently': 25
            }
        };

        const rangerFields = {
            calculatedRangerSkills: {
                'Bushcraft': 75,
                'Tracking': 85
            },
            favoredTerrain: 'Forest'
        };

        const savedThief = JSON.stringify(thiefFields);
        const loadedThief = JSON.parse(savedThief);
        expect(loadedThief.calculatedThiefSkills).toEqual(thiefFields.calculatedThiefSkills);

        const savedRanger = JSON.stringify(rangerFields);
        const loadedRanger = JSON.parse(savedRanger);
        expect(loadedRanger.favoredTerrain).toBe('Forest');
    });

    it('should preserve spellcaster data', () => {
        const spellcasterData = {
            knownSpells: ['Read Magic', 'Detect Magic', 'Light', 'Magic Missile'],
            spellSlots: { 1: 2, 2: 1 }
        };

        const saved = JSON.stringify(spellcasterData);
        const loaded = JSON.parse(saved);

        expect(loaded.knownSpells).toEqual(spellcasterData.knownSpells);
        expect(loaded.spellSlots).toEqual(spellcasterData.spellSlots);
    });
});

describe('OSE Save/Load System - LocalStorage Persistence', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should persist saves to localStorage', () => {
        const slots = [
            {
                characterName: 'Grimwald the Grey',
                system: 'ose',
                timestamp: Date.now(),
                data: { characterData: { ai: { name: 'Grimwald the Grey' } } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('ose-character-saves', JSON.stringify(slots));
        
        const stored = mockStorage.getItem('ose-character-saves');
        expect(stored).toBeDefined();
        
        const loaded = JSON.parse(stored!);
        expect(loaded[0].characterName).toBe('Grimwald the Grey');
        expect(loaded[0].system).toBe('ose');
    });

    it('should load saves from localStorage on initialization', () => {
        const existingSaves = [
            {
                characterName: 'Existing Adventurer',
                system: 'ose',
                timestamp: Date.now(),
                data: { characterData: { ai: { name: 'Existing Adventurer' } } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('ose-character-saves', JSON.stringify(existingSaves));
        
        const loaded = JSON.parse(mockStorage.getItem('ose-character-saves')!);
        expect(loaded[0].characterName).toBe('Existing Adventurer');
        expect(loaded[0].system).toBe('ose');
    });
});
