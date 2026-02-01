import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { ADDITIONAL_SCRIPTS } from '../../data/karameikos-data';
import { Ability } from '../../types';

interface KarameikosBackgroundProps {
    stepNumber: number;
}

export const KarameikosBackground: React.FC<KarameikosBackgroundProps> = ({ stepNumber }) => {
    const { selectedClass, modifiedScores, karameikos } = useCharacterContext();

    if (!selectedClass || !modifiedScores) {
        return null;
    }

    if (!karameikos) {
        console.error('❌ KarameikosBackground: karameikos is undefined!');
        return <div className="bg-red-500 text-white p-4">Error: Karameikos hook not available</div>;
    }

    const intelligenceScore = modifiedScores[Ability.Intelligence];

    const handleRollLiteracy = () => {
        if (karameikos.socialStanding) {
            karameikos.handleRollLiteracy(intelligenceScore, selectedClass.name, karameikos.socialStanding);
        }
    };

    const handleRollHometown = () => {
        if (karameikos.socialStanding) {
            karameikos.handleRollHometown(selectedClass.name, karameikos.socialStanding.standing);
        }
    };

    const showVillageGeneration = karameikos.hometown &&
        (karameikos.hometown.hometown === "Homestead" || karameikos.hometown.hometown === "Village/Town");

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
            <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Grand Duchy of Karameikos Background</h2>

            <p className="text-gray-300 text-sm mb-6">
                Roll for your character's social standing, ethnos, literacy level, and hometown in the Grand Duchy of Karameikos.
            </p>

            {/* Social Standing */}
            <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-amber-600/20">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-amber-300">Social Standing</h4>
                    {!karameikos.socialStanding && (
                        <button
                            onClick={karameikos.handleRollSocialStanding}
                            className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                            Roll d100
                        </button>
                    )}
                </div>
                {karameikos.socialStanding && (
                    <div className="mt-3 p-3 bg-slate-700/50 rounded border border-amber-500/30">
                        <p className="text-amber-200 font-semibold text-lg mb-1">
                            {karameikos.socialStanding.standing}
                        </p>
                        <p className="text-gray-400 text-sm">
                            Roll: {karameikos.socialStanding.roll} |
                            Literacy Checks: {karameikos.socialStanding.literacyChecks} |
                            Starting Gold: {karameikos.socialStanding.goldModifier >= 0 ? '+' : ''}{karameikos.socialStanding.goldModifier}%
                        </p>
                    </div>
                )}
            </div>

            {/* Ethnos */}
            {karameikos.socialStanding && (
                <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-amber-600/20">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-amber-300">Ethnos</h4>
                        {!karameikos.ethnos && (
                            <button
                                onClick={karameikos.handleRollEthnos}
                                className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Roll d100
                            </button>
                        )}
                    </div>
                    {karameikos.ethnos && (
                        <div className="mt-3 p-3 bg-slate-700/50 rounded border border-amber-500/30">
                            <p className="text-amber-200 font-semibold text-lg mb-1">
                                {karameikos.ethnos.origin}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                                Roll: {karameikos.ethnos.roll} + {Math.floor(karameikos.socialStanding.roll / 2)} = {karameikos.ethnos.modifiedRoll}
                            </p>
                            <p className="text-gray-300 text-sm italic">
                                {karameikos.ethnos.description}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Literacy */}
            {karameikos.socialStanding && (
                <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-amber-600/20">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-amber-300">Literacy</h4>
                        {!karameikos.literacy && (
                            <button
                                onClick={handleRollLiteracy}
                                className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Roll INT Checks
                            </button>
                        )}
                    </div>
                    <p className="text-gray-400 text-xs mb-3">
                        Rolling {karameikos.socialStanding.literacyChecks} check(s) vs INT {intelligenceScore}
                        {(selectedClass.name === "Barbarian" || selectedClass.name === "Druid") && " (−1 for class)"}
                        {(selectedClass.name === "Cleric" || selectedClass.name === "Magic-User" || selectedClass.name === "Illusionist") && " (+1 free success after)"}
                    </p>
                    {karameikos.literacy && (
                        <div className="mt-3 p-3 bg-slate-700/50 rounded border border-amber-500/30">
                            <p className="text-amber-200 font-semibold text-lg mb-1">
                                {karameikos.literacy.proficiencyLevel}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                                Successes: {karameikos.literacy.successCount}
                            </p>
                            <p className="text-gray-300 text-sm">
                                {karameikos.literacy.description}
                            </p>
                            {karameikos.literacy.successCount >= 3 && (
                                <div className="mt-3 pt-3 border-t border-amber-600/20">
                                    {(() => {
                                        const allowed = Math.max(0, karameikos.literacy.successCount - 2);
                                        const selectedCount = karameikos.selectedScripts.length;
                                        return (
                                            <>
                                                <p className="text-amber-300 font-semibold text-sm mb-2">
                                                    Choose up to {allowed} additional script{allowed > 1 ? 's' : ''}:
                                                </p>
                                                <p className="text-gray-400 text-xs mb-2">Selected {selectedCount}/{allowed}</p>
                                                <div className="grid md:grid-cols-2 gap-2">
                                                    {ADDITIONAL_SCRIPTS.map((script, i) => {
                                                        const checked = karameikos.selectedScripts.includes(script);
                                                        const disableAdd = !checked && selectedCount >= allowed;
                                                        return (
                                                            <label key={i} className={`flex items-start gap-2 p-2 rounded border ${checked ? 'border-amber-500/60 bg-slate-700/40' : 'border-slate-600/40 bg-slate-800/30'} ${disableAdd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="mt-1"
                                                                    checked={checked}
                                                                    onChange={() => karameikos.toggleScript(script)}
                                                                    disabled={disableAdd}
                                                                />
                                                                <span className="text-xs text-gray-300">{script}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                                {karameikos.selectedScripts.length > 0 && (
                                                    <p className="text-gray-300 text-xs mt-3"><span className="text-amber-300">Selected:</span> {karameikos.selectedScripts.join(', ')}</p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Hometown */}
            {karameikos.socialStanding && (
                <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-amber-600/20">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-amber-300">Hometown</h4>
                        {!karameikos.hometown && (
                            <button
                                onClick={handleRollHometown}
                                className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Roll d20
                            </button>
                        )}
                    </div>
                    {karameikos.hometown && (
                        <div className="mt-3 p-3 bg-slate-700/50 rounded border border-amber-500/30">
                            <p className="text-amber-200 font-semibold text-lg mb-1">
                                {karameikos.hometown.hometown}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                                Roll: {karameikos.hometown.roll} + modifiers = {karameikos.hometown.finalRoll}
                            </p>
                            <p className="text-gray-300 text-sm">
                                {karameikos.hometown.description}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Village/Homestead Name Generation */}
            {showVillageGeneration && (
                <div className="bg-slate-800/50 rounded-lg p-4 border border-amber-600/20">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-amber-300">
                            {karameikos.hometown?.hometown} Name
                        </h4>
                        <button
                            onClick={karameikos.handleGenerateVillageName}
                            disabled={karameikos.isGeneratingVillage || !karameikos.ethnos}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center gap-2"
                        >
                            {karameikos.isGeneratingVillage ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                karameikos.villageName ? 'Re-Generate' : 'Generate Name (AI)'
                            )}
                        </button>
                    </div>
                    {karameikos.villageName && (
                        <div className="mt-3 p-3 bg-slate-700/50 rounded border border-blue-500/30">
                            <p className="text-blue-200 font-semibold text-xl text-center">
                                {karameikos.hometown?.hometown === "Homestead" ? "Homestead of " : "Village of "}{karameikos.villageName}
                            </p>
                        </div>
                    )}
                    <p className="text-gray-400 text-xs mt-2">
                        AI-generated Slavic fantasy name based on your ethnos and social standing.
                    </p>
                </div>
            )}
        </div>
    );
};
