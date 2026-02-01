// Karameikos background data and functions for OSE Character Creator

export interface SocialStandingResult {
  roll: number;
  standing: string;
  literacyChecks: number;
  goldModifier: number;
  description: string;
}

export interface EthnosResult {
  roll: number;
  modifiedRoll: number;
  origin: string;
  description: string;
}

export interface LiteracyResult {
  successCount: number;
  proficiencyLevel: string;
  description: string;
}

export interface HometownResult {
  roll: number;
  finalRoll: number;
  hometown: string;
  description: string;
}

// Social Standing table (d100)
const SOCIAL_STANDING_TABLE: Array<{
  min: number;
  max: number;
  standing: string;
  literacyChecks: number;
  goldModifier: number;
  description: string;
}> = [
  {
    min: 1,
    max: 30,
    standing: "Penniless",
    literacyChecks: 1,
    goldModifier: -30,
    description:
      "The family is dirt-poor. Most of its members spend all their lives in backbreaking labor. Family members grow up uneducated, working all their lives for someone else's profit. The character's 'starting gold' represents every coin that the family could scrounge up, save, or steal, and the family is hoping that the character will become wealthy on his adventures and return to help the family. The family owns no property, has practically no possessions and lives in a home of remarkable poverty; family members have ragged clothing, no shoes, no weapon larger than a knife or pitchfork.",
  },
  {
    min: 31,
    max: 60,
    standing: "Struggling",
    literacyChecks: 1,
    goldModifier: -15,
    description:
      "The family is poor. It may own the property it lives on, but does not make a good living from it. Family members work all their lives to very little gain. The character's 'starting gold' represents several years' worth of scrimping and saving for the head of the household, and the family is hoping that the character will become wealthy on his adventures and return to help the family. The family lives in an inadequate home; family members have limited clothing and only occasionally own shoes or traveling gear; the household head may own a sword but most members of the family have no weapon other than knives or bows.",
  },
  {
    min: 61,
    max: 75,
    standing: "Comfortable",
    literacyChecks: 2,
    goldModifier: 0,
    description:
      "The family is not rich but does not suffer from want. It may own the property on which it lives. It makes a decent living with occasional periods of greater prosperity or financial turmoil. The character's 'starting gold' represents the approximate amount the family gives to every youth leaving for the Sharing. The family is hoping that the character will prove to be a worthy person during the years he spends on his own. The family lives in an adequate home; family members have adequate clothes, including footwear, traveling clothes, and (often) one fine outfit for social wear; most members of the family can afford a weapon of choice.",
  },
  {
    min: 76,
    max: 85,
    standing: "Wealthy/Untitled",
    literacyChecks: 2,
    goldModifier: 20,
    description:
      "The family is wealthy. Its members do not suffer from want. It is likely to own the property on which it lives and other properties besides, and is likely to employ servants. It makes a good living, usually from trade or agriculture or from the earnings of one highly-paid professional in the family.",
  },
  {
    min: 86,
    max: 95,
    standing: "Wealthy/Titled Noble (minimum for Knight)",
    literacyChecks: 3,
    goldModifier: 40,
    description:
      "This is the same as Wealthy/Untitled, except that the head of the family has a title issued by Duke Stefan or other important figures. He will either bear the title Lord (Lady) or Patriarch (Matriarch). A Lord will be the owner of a large tract of land and leader of the communities thereon, or will be a court lord who performs tasks for Duke Stefan. A Patriarch will be the head of a church or an itinerant (traveling) cleric of great importance within the Church.",
  },
  {
    min: 96,
    max: 97,
    standing: "Very Wealthy/Untitled",
    literacyChecks: 3,
    goldModifier: 65,
    description:
      "This is the same as Wealthy/Untitled, except that the family is very wealthy—for instance, the family in charge of an important shipping enterprise or of an important community. The DM will need to decide which family the character is from, choosing from the examples given in this Gazetteer. He might, for instance, decide the character belongs to the Torenescu family of Specularum, a very powerful but untitled clan.",
  },
  {
    min: 98,
    max: 99,
    standing: "Very Wealthy/Titled Noble",
    literacyChecks: 4,
    goldModifier: 95,
    description:
      "This is the same as Wealthy/Titled, except that the family is larger and more important. The head of the clan will be a Baron or a General in the Duke's service. The DM will need to decide which family the character is from, choosing from appropriate clans. He might, for instance, decide the character belongs to the Kelvin clan of Kelvin or the Vorloi clan of Specularum and Vorloi Village.",
  },
  {
    min: 100,
    max: 100,
    standing: "Royal Family",
    literacyChecks: 4,
    goldModifier: 150,
    description:
      "The character is a member of the Duke's own family. The DM will decide precisely what relationship the character has to the Duke. He might decide, for instance, that the character is the Duke's oldest child, or second-oldest, or that the character is a nephew or niece of the Duke. The character will have recently been Sheared and so cannot depend on the royal family for assistance for quite some time. If the character travels about under his own name, he risks kidnapping, murder and subversion attempts.",
  },
];

// Ethnos table (d100, modified by social standing)
const ETHNOS_TABLE: Array<{
  min: number;
  max: number;
  origin: string;
  description: string;
}> = [
  {
    min: 1,
    max: 3,
    origin: "Stigani",
    description:
      "Nomadic travelers, fortune tellers, musicians, craftsmen. Often discriminated against, live in caravans, value freedom and family. Bright clothing, gold jewelry, Romani dialect.",
  },
  {
    min: 4,
    max: 55,
    origin: "Slavani",
    description:
      "Forest and mountain folk, farmers, woodsmen, herbalists. Reserved, spiritual, deeply connected to nature. Wool tunics, embroidered shirts, simple jewelry. Dialect rich in nature metaphors.",
  },
  {
    min: 56,
    max: 90,
    origin: "Sarapi",
    description:
      "Hill and river valley folk, farmers, soldiers, mercenaries. Fiery temperament, strong family loyalties, proud of ancient heritage. Layered wool, embroidered holiday dress, rough dialect with Hin borrowings.",
  },
  {
    min: 91,
    max: 107,
    origin: "Polanitsi",
    description:
      'Traders, horse breeders, grain farmers around larger settlements. Open to the world, value long-distance travel ("hadjuvane"), guild networks, adoption common. Riding tunics, shaved heads or warrior braids, mercantile cant. High commercial wealth.',
  },
  {
    min: 108,
    max: 116,
    origin: "Vlastari",
    description:
      "Mountain clans, shepherds. Clan honor, ancient rites, blood oaths, superstitious. Sheepskins, generational daggers, oral poetic tradition. Often viewed as rough and poor by lowlanders.",
  },
  {
    min: 117,
    max: 125,
    origin: "Derevei",
    description:
      "Scattered forest dwellers, hunters, trappers, herbalists. Live in small winter settlements, share resources communally, reclusive and suspected of dealings with forest spirits. Dark hides, long hair tied to ancient oaks.",
  },
  {
    min: 126,
    max: 150,
    origin: "Thyatians",
    description:
      "Immigrants from Thyatis, administrators, nobles. Cultured, hierarchical, value imperial traditions. Fine clothing, formal Thyatian speech.",
  },
];

// Literacy proficiency levels
const LITERACY_LEVELS: Array<{
  minSuccesses: number;
  level: string;
  description: string;
}> = [
  {
    minSuccesses: 0,
    level: "Illiterate",
    description:
      'Cannot read or write in any language. However, nearly all inhabitants of Karameikos (except Barbarians and Druids, who may require on-the-spot instruction) can recognise basic written symbols through memorisation and cultural exposure—such as common signs (e.g., "Tavern," "Market," "Court") and the denominations of coinage.',
  },
  {
    minSuccesses: 1,
    level: "Basic Literacy",
    description:
      "Can read simple texts with ease and write basic messages with a rudimentary grasp of spelling and grammar. Observers fluent in the language can readily identify the writer's limited proficiency. Complex, technical, or formal texts require an Intelligence check at a –2 penalty to comprehend.",
  },
  {
    minSuccesses: 2,
    level: "Fluent Literacy",
    description:
      "Reads and writes with full comprehension and a competent, stylish prose sufficient to pass as an educated individual in most social and professional contexts.",
  },
  {
    minSuccesses: 3,
    level: "Scholarly Literacy",
    description:
      "In addition to fluent literacy, masters one additional script, language, or style per success beyond the third. Must speak the language unless granted for free by social standing.",
  },
];

// Hometown table (d20, modified by social standing)
const HOMETOWN_TABLE: Array<{
  roll: number;
  hometown: string;
  description: string;
}> = [
  {
    roll: 1,
    hometown: "Black Eagle Barony",
    description:
      "The oppressive barony ruled by Ludwig von Hendriks. Characters of Neutral or Lawful alignment fled during their Shearing. Chaotic characters may be agents or relatives in the Baron's employ.",
  },
  {
    roll: 2,
    hometown: "City of Specularum",
    description:
      "The Grand Capital of Karameikos. Bustling metropolis, seat of Duke Stefan Karameikos III. Opportunity and danger abound.",
  },
  {
    roll: 3,
    hometown: "City of Specularum",
    description:
      "The Grand Capital of Karameikos. Bustling metropolis, seat of Duke Stefan Karameikos III. Opportunity and danger abound.",
  },
  {
    roll: 4,
    hometown: "City of Specularum",
    description:
      "The Grand Capital of Karameikos. Bustling metropolis, seat of Duke Stefan Karameikos III. Opportunity and danger abound.",
  },
  {
    roll: 5,
    hometown: "City of Specularum",
    description:
      "The Grand Capital of Karameikos. Bustling metropolis, seat of Duke Stefan Karameikos III. Opportunity and danger abound.",
  },
  {
    roll: 6,
    hometown: "City of Kelvin",
    description:
      "Fortress city on the border with the Black Eagle Barony. Military focus, many retired soldiers and mercenaries.",
  },
  {
    roll: 7,
    hometown: "City of Kelvin",
    description:
      "Fortress city on the border with the Black Eagle Barony. Military focus, many retired soldiers and mercenaries.",
  },
  {
    roll: 8,
    hometown: "City of Kelvin",
    description:
      "Fortress city on the border with the Black Eagle Barony. Military focus, many retired soldiers and mercenaries.",
  },
  {
    roll: 9,
    hometown: "City of Threshold",
    description:
      "Gateway to the frontier. Trading hub, adventurers' town, diverse population.",
  },
  {
    roll: 10,
    hometown: "City of Threshold",
    description:
      "Gateway to the frontier. Trading hub, adventurers' town, diverse population.",
  },
  {
    roll: 11,
    hometown: "City of Radlebb Keep",
    description:
      "Ancient fortress city, center of learning and magic. Home to the famed Magicians' Guild.",
  },
  {
    roll: 12,
    hometown: "City of Radlebb Keep",
    description:
      "Ancient fortress city, center of learning and magic. Home to the famed Magicians' Guild.",
  },
  {
    roll: 13,
    hometown: "City of Penhaligon",
    description:
      "Port city on the coast. Maritime focus, fishing, trade, naval activity.",
  },
  {
    roll: 14,
    hometown: "City of Penhaligon",
    description:
      "Port city on the coast. Maritime focus, fishing, trade, naval activity.",
  },
  {
    roll: 15,
    hometown: "City of Krakatos",
    description: "Agricultural center, grain production, farming communities.",
  },
  {
    roll: 16,
    hometown: "City of Selenica",
    description:
      "Mining town in the Altan Tepes mountains. Dwarven influences, mineral wealth.",
  },
  {
    roll: 17,
    hometown: "City of Fort Doom",
    description:
      "Border fortress against Thyatis. Military outpost, tense relations with neighbors.",
  },
  {
    roll: 18,
    hometown: "Homestead",
    description:
      "One of the countless family homesteads scattered across Karameikos. With DM approval, select a specific location.",
  },
  {
    roll: 19,
    hometown: "Village/Town",
    description:
      "One of Karameikos's many villages or towns. With DM approval, choose from those shown on the map.",
  },
  {
    roll: 20,
    hometown: "Homestead",
    description:
      "One of the countless family homesteads scattered across Karameikos. With DM approval, select a specific location.",
  },
];

// Additional scripts that can be learned with high literacy
export const ADDITIONAL_SCRIPTS = [
  "Elven Script",
  "Dwarven Runes (Dethek)",
  "Monastic Calligraphy",
  "Thyatian (Formal)",
  "Alasiyan (Ylari)",
  "Glantrian",
  "Thieves' Cant",
];

// Utility function to roll d100
function rollD100(): number {
  return Math.floor(Math.random() * 100) + 1;
}

// Utility function to roll d20
function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

// Roll social standing
export function rollSocialStanding(): SocialStandingResult {
  const roll = rollD100();
  const entry = SOCIAL_STANDING_TABLE.find(
    (e) => roll >= e.min && roll <= e.max,
  );

  if (!entry) {
    throw new Error(`Invalid social standing roll: ${roll}`);
  }

  return {
    roll,
    standing: entry.standing,
    literacyChecks: entry.literacyChecks,
    goldModifier: entry.goldModifier,
    description: entry.description,
  };
}

// Roll ethnos (modified by social standing)
export function rollEthnos(socialStandingRoll: number): EthnosResult {
  const modifier = Math.floor(socialStandingRoll / 2);
  const roll = rollD100();
  const modifiedRoll = Math.min(150, Math.max(1, roll + modifier));

  const entry = ETHNOS_TABLE.find(
    (e) => modifiedRoll >= e.min && modifiedRoll <= e.max,
  );

  if (!entry) {
    throw new Error(`Invalid ethnos roll: ${modifiedRoll}`);
  }

  return {
    roll,
    modifiedRoll,
    origin: entry.origin,
    description: entry.description,
  };
}

// Determine literacy based on INT checks
export function determineLiteracy(successCount: number): LiteracyResult {
  const level = LITERACY_LEVELS.slice()
    .reverse()
    .find((l) => successCount >= l.minSuccesses);

  if (!level) {
    throw new Error(`Invalid literacy success count: ${successCount}`);
  }

  return {
    successCount,
    proficiencyLevel: level.level,
    description: level.description,
  };
}

// Roll hometown (modified by social standing)
export function rollHometown(socialStandingRoll: number): HometownResult {
  // Calculate modifier based on social standing
  let modifier = 0;
  if (socialStandingRoll <= 30)
    modifier = -2; // Penniless
  else if (socialStandingRoll <= 60)
    modifier = -1; // Struggling
  else if (socialStandingRoll >= 96)
    modifier = +2; // Very wealthy or royal
  else if (socialStandingRoll >= 86) modifier = +1; // Wealthy/titled

  const roll = rollD20();
  const finalRoll = Math.min(20, Math.max(1, roll + modifier));

  const entry = HOMETOWN_TABLE.find((h) => h.roll === finalRoll);

  if (!entry) {
    throw new Error(`Invalid hometown roll: ${finalRoll}`);
  }

  return {
    roll,
    finalRoll,
    hometown: entry.hometown,
    description: entry.description,
  };
}
