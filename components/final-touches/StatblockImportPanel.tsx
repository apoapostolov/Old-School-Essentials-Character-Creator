import React, { useMemo, useState } from 'react';
import { useCharacterExtras } from '../../context/CharacterContext';
import { getImgurClientId } from '../SettingsModal';
import { getAttackValuesForLevel, getModifier } from '../../utils/character';
import { getEncumbranceDetails } from '../../utils/encumbrance';
import type { Item } from '../../types';

/**
 * Foundry Statblock Importer export panel.
 *
 * Emits a single-line statblock in the exact format consumed by the
 * OSE Statblock Importer for Foundry VTT module
 * (https://github.com/apoapostolov/OSE-Statblock-Importer-for-Foundry-VTT).
 * Deterministic: no AI involved, everything derives from the live character.
 */

/** Class name → SV/HD letter understood by the importer's alias tables. */
const SV_CLASS_LETTER: Record<string, string> = {
    'Fighter': 'F',
    'Warrior': 'F',
    'Knight': 'K',
    'Paladin': 'PAL',
    'Ranger': 'R',
    'Barbarian': 'BARB',
    'Thief': 'T',
    'Acrobat': 'ACRO',
    'Assassin': 'ASS',
    'Bard': 'BARD',
    'Cleric': 'C',
    'Druid': 'DRU',
    'Magic-User': 'MU',
    'Mage': 'MU',
    'Illusionist': 'ILL',
    // Sage is a creator homebrew class the importer does not know; use the
    // closest save progression (magic_user) and flag it in Notes.
    'Sage': 'MU',
};

const RACE_SV_NOTE: Record<string, string> = {
    'Dwarf': 'Dwarf',
    'Duergar': 'Duergar',
    'Elf': 'Elf',
    'Drow': 'Drow',
    'Gnome': 'Gnome',
    'Halfling': 'Halfling',
    'Half-Elf': 'Half-Elf',
    'Half-Orc': 'Half-Orc',
};

const normalizeAlignment = (raw: string | undefined): string => {
    const a = (raw || '').toLowerCase();
    if (!a) return 'N';
    if (a.includes('law') && !a.includes('neut')) return 'L';
    if (a.includes('chaos')) return 'C';
    if (a.includes('neut') || a.includes('any')) return 'N';
    return raw!.trim().slice(0, 12);
};

/** Ascending AC from worn armor/shield items (absolute for suits, bonus for shields). */
const computeAac = (armorItems: Item[]): number => {
    let aac = 10;
    for (const item of armorItems) {
        const v = item.ascending_ac ?? 0;
        if (v >= 11) aac = Math.max(aac, v); // leather 12, chain 14, plate 16 are absolute
        else aac += v;                        // shields and odd bonuses are additive
    }
    return aac;
};

const WORN = (item: Item): string =>
    `${item.name} ${item.carry_type === 'stowed' ? '{stowed}' : '{worn}'}`;

export const StatblockImportPanel: React.FC = () => {
    const { ai, selectedClass, selectedRace, characterRoll, aggregatedData, progression, equipment } = useCharacterExtras();
    const [copied, setCopied] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [savingImage, setSavingImage] = useState(false);

    // Persist the generated portrait into the Foundry world once, then
    // reference it by absolute URL (importer downloads it on import).
    React.useEffect(() => {
        const src = ai.pdfPortraitSrc || ai.portrait;
        if (!src || !src.startsWith('data:image/') || savingImage) return;
        let cancelled = false;
        setSavingImage(true);
        fetch('/__save_portrait', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dataUrl: src,
                name: ai.characterName || `${selectedRace?.name ?? ''}-${selectedClass?.name ?? ''}`,
                imgurClientId: getImgurClientId(),
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled && data.url) {
                    setImageUrl(data.url);
                }
            })
            .catch(() => { /* statblock just ships without img: */ })
            .finally(() => { if (!cancelled) setSavingImage(false); });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ai.pdfPortraitSrc, ai.portrait]);

    const statblock = useMemo(() => {
        if (!selectedClass) return '';
        const scores = characterRoll.scores;
        const level = progression.characterLevel || 1;
        const items = (equipment.allItemKeys ?? [])
            .map((key) => aggregatedData.ITEMS[key])
            .filter(Boolean) as Item[];

        const weapons = items.filter((i) => i.category === 'Weapon');
        const armors = items.filter((i) => i.category === 'Armor');
        const gear = items.filter((i) => i.category !== 'Weapon' && i.category !== 'Armor');

        const name = ai.characterName?.trim() || `${selectedRace?.name ?? 'Human'} ${selectedClass.name}`;

        const parts: string[] = [];

        // Portrait hotlink (importer downloads it into the world on import)
        if (imageUrl) parts.push(`img: ${imageUrl}`);

        // AC (ascending) + hit dice + hp
        parts.push(`AAC ${computeAac(armors)}`);
        const letter = SV_CLASS_LETTER[selectedClass.name] ?? 'F';
        parts.push(`HD ${letter}${level}`);
        if (progression.hpResult?.total) parts.push(`HP ${progression.hpResult.total}`);

        // Movement from encumbrance thresholds (OSE 120/90/60/30)
        const mv = scores
            ? getEncumbranceDetails(equipment.equipmentWeight ?? 0, scores.Strength ?? 10).speedValue
            : 120;
        parts.push(`MV ${mv}`);

        // Attacks: primary melee weapon + class progression + Str mod
        parts.push('#AT 1');
        const primary = weapons.find((w) => w.isMelee) ?? weapons[0];
        const attack = getAttackValuesForLevel(selectedClass, level);
        const strMod = scores ? getModifier(scores.Strength) : 0;
        const atkBonus = (attack?.bonus ?? 0) + strMod;
        const dmg = primary?.damage ?? '1d6';
        parts.push(atkBonus ? `Dmg ${atkBonus >= 0 ? '+' : ''}${atkBonus} atk ${dmg}` : `Dmg ${dmg}`);

        parts.push(`SV ${letter}${level}`);
        parts.push(`AL ${normalizeAlignment(selectedClass.alignment)}`);

        // Abilities
        if (scores) {
            const abilities = [
                `Str ${scores.Strength}`, `Dex ${scores.Dexterity}`,
                `Con ${scores.Constitution}`, `Int ${scores.Intelligence}`,
                `Wis ${scores.Wisdom}`, `Cha ${scores.Charisma}`,
            ].join(' ');
            parts.push(abilities);
        }

        if (weapons.length) parts.push(`Weapon: ${weapons.map(WORN).join(', ')}`);
        if (armors.length) parts.push(`Armor: ${armors.map(WORN).join(', ')}`);
        if (gear.length) parts.push(`Equipment: ${gear.map(WORN).join(', ')}`);

        const money = equipment.finalMoney;
        if (money != null && money > 0) parts.push(`Coins: ${Math.floor(money)} gp`);

        if (progression.knownSpells?.length) {
            parts.push(`Spells: ${progression.knownSpells.join(', ')}`);
        }

        const languages = [
            ai.commonLanguage,
            ai.racialLanguage?.name,
            ...(ai.selectedBonusLanguages ?? []),
        ].filter(Boolean);
        if (languages.length > 1 || (languages.length === 1 && languages[0] !== 'Common Tongue')) {
            parts.push(`Languages: ${languages.join(', ')}`);
        }

        const traits = ai.characterTraits
            ? [ai.characterTraits.positivePhysical, ai.characterTraits.positiveMental, ai.characterTraits.negative]
                .filter(Boolean).join(', ')
            : '';
        if (traits) parts.push(`Traits: ${traits}`);

        if (ai.characterTraits?.lifeStandard) parts.push(`Role: ${ai.characterTraits.lifeStandard}`);

        const notes: string[] = [];
        if (selectedRace && RACE_SV_NOTE[selectedRace.name]) notes.push(`race ${RACE_SV_NOTE[selectedRace.name]}`);
        if (selectedClass.name === 'Sage') notes.push('Sage class, saves as Magic-User');
        if (notes.length) parts.push(`Notes: ${notes.join('; ')}`);

        return `${name}: ${parts.join('; ')}`;
    }, [ai, selectedClass, selectedRace, characterRoll, aggregatedData, progression, equipment, imageUrl]);

    const onCopy = async () => {
        if (!statblock) return;
        try {
            await navigator.clipboard.writeText(statblock);
        } catch {
            // Fallback for non-secure contexts (plain http LAN access)
            const ta = document.createElement('textarea');
            ta.value = statblock;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="mt-8 pt-6 border-t-2 border-gray-700/50">
            <div className="flex items-start justify-between mb-2 pr-1">
                <h2 className="text-3xl font-bold text-yellow-400">Foundry Statblock Importer</h2>
                <button
                    onClick={onCopy}
                    disabled={!statblock}
                    title="Copy statblock to clipboard"
                    aria-label="Copy statblock to clipboard"
                    className={`transition-colors duration-200 ${statblock
                        ? copied ? 'text-green-400' : 'text-gray-400 hover:text-yellow-400'
                        : 'text-gray-600 cursor-not-allowed'}`}
                >
                    {copied ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="9" y="9" width="11" height="11" rx="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V5a2 2 0 012-2h10" />
                        </svg>
                    )}
                </button>
            </div>
            <p className="text-gray-400 text-center mb-4">
                Import-ready text for the OSE Statblock Importer module. Paste into Foundry via an actor sheet's
                <span className="text-yellow-400"> Import Statblock</span>.
                {savingImage && <span className="block text-xs text-gray-500 mt-1">Saving portrait to world assets…</span>}
                {!savingImage && imageUrl && (
                    <span className="block text-xs text-green-500/80 mt-1">
                        Portrait saved locally, hotlinked in the statblock.
                    </span>
                )}
            </p>
            <textarea
                readOnly
                value={statblock || 'Roll a character first.'}
                placeholder="Roll a character first."
                rows={Math.min(10, Math.max(4, Math.ceil((statblock.length || 30) / 90)))}
                className="w-full resize-y min-h-24 max-h-96 bg-gray-900/80 border border-gray-700 rounded-lg p-3 font-mono text-xs text-gray-300 leading-relaxed focus:outline-none focus:border-yellow-400/60"
                spellCheck={false}
            />
        </div>
    );
};
