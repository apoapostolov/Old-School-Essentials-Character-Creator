
/**
 * A centralized mapping of internal data keys to the specific field names
 * used in the character sheet PDF form. This allows for easier updates if
 * the PDF template changes.
 */
export const PDF_FIELD_MAP = {
  // Character Info
  characterName: 'Name 2',
  characterLevel: 'Level 2',
  characterClass: 'Character Class 2',
  race: 'Race 2',
  description1: 'Description 1',
  description2: 'Description 2',
  title: 'Title 2',
  
  // Ability Scores
  strength: 'STR 2',
  strengthMod: 'STR-MOD',
  dexterity: 'DEX 2',
  dexterityMod: 'DEX-MOD',
  constitution: 'CON 2',
  constitutionMod: 'CON-MOD',
  intelligence: 'INT 2',
  intelligenceMod: 'INT-MOD',
  wisdom: 'WIS 2',
  wisdomMod: 'WIS-MOD',
  charisma: 'CHA 2',
  charismaMod: 'CHA-MOD',
  
  // Combat Stats
  ac: 'AC 2',
  acUnarmored: 'AC Un',
  hp: 'HP 2',
  thac0: 'THAC0 2',
  attackBonus: 'Attack Bonus',
  attackMelee: 'Att Mel',
  attackMissile: 'Att Mis',
  initiative: 'Init',
  initiativeMod: 'Initiative DEX Mod 2',
  reactionsMod: 'Reactions CHA Mod 2',

  maxHp: 'Max HP 2',
  conHpMod: 'CON HP Mod 2',
  unarmoredAc2: 'Unarmoured AC 2',
  dexAcMod: 'DEX AC Mod 2',
  strMeleeMod: 'STR Melee Mod',
  dexMissileMod: 'DEX Missile Mod',

  // Saving Throws
  saveDeath: 'Death Save 2',
  saveWands: 'Wands Save 2',
  saveParalysis: 'Paralysis Save 2',
  saveBreath: 'Breath Save 2',
  saveSpells: 'Spells Save 2',
  saveMagicMod: 'Magic Save Mod 2',
  magicSaveMod2: 'Save Magic Mod 2',
  
  // Experience
  xp: 'XP',
  xpForNextLevel: 'XP for Next Level',
  xpBonus: 'PR XP Bonus',

  // Movement & Encumbrance
  overlandMovement: 'Overland Movement 2',
  explorationMovement: 'Exporation Movement 2',
  encounterMovement: 'Encounter Movement 2',
  equipmentEncumbrance: 'Equipment Encumbrance',
  totalEncumbrance: 'Total Encumbrance',

  // Other
  literacy: 'Literacy 2',
  goldPieces: 'GP',
  
  // Dungeoneering Skills
  listenAtDoor: 'Listen at Door 2',
  openStuckDoor: 'Open Stuck Door 2',
  findSecretDoor: 'Find Secret Door 2',
  findRoomTrap: 'Find Room Trap 2',
  
  // Abilities & Features
  classAbilities: 'Abilities, Skills, Weapons 2',

  // Equipment & Portrait
  equipmentList: 'Equipment',
  portrait: 'Portrait',
  hirelings: 'Hirelings',
  languages: 'Languages 2',

  // Spells
  spellSlot1: 'Spell Slot 1',
  spellSlot2: 'Spell Slot 2',
  spellSlot3: 'Spell Slot 3',
  spellSlot4: 'Spell Slot 4',
  spellSlot5: 'Spell Slot 5',
  spellSlot6: 'Spell Slot 6',
  spellDescriptions: 'Spell Descriptions',
};
