import React, { useState, useEffect, useRef } from 'react';
import { useSaveSystem } from '../hooks/useSaveSystem';
import { useCharacterContext } from '../context/CharacterContext';
import type { SaveSlot } from '../types';

export const SaveSlotDrawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [customNameModalOpen, setCustomNameModalOpen] = useState(false);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
    const [customName, setCustomName] = useState('');
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [exportCurrentModalOpen, setExportCurrentModalOpen] = useState(false);
    const [importData, setImportData] = useState('');
    const [exportData, setExportData] = useState<string | null>(null);
    const [currentCharacterExportData, setCurrentCharacterExportData] = useState<string | null>(null);
    const [copiedSlot, setCopiedSlot] = useState<number | null>(null);
    const importFileInputRef = useRef<HTMLInputElement | null>(null);

    const character = useCharacterContext();
    const { slots, saveCharacter, loadCharacter, deleteSlot, exportSlot, importSlot, exportCurrentCharacter } = useSaveSystem();

    const copyTextToClipboard = async (text: string) => {
        if (!text) return false;
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (error) {
                console.warn('Clipboard API copy failed, falling back to execCommand.', error);
            }
        }

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '-1000px';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            textArea.setSelectionRange(0, text.length);
            const ok = document.execCommand('copy');
            document.body.removeChild(textArea);
            return ok;
        } catch (error) {
            console.warn('execCommand copy failed.', error);
            return false;
        }
    };

    const handleSave = (slotIndex: number) => {
        const slotName = slots[slotIndex]?.customName || character.ai?.characterName || character.ai?.name || '';
        if (!slotName && !slots[slotIndex]?.customName) {
            // Open modal to ask for custom name
            setSelectedSlotIndex(slotIndex);
            setCustomNameModalOpen(true);
        } else {
            saveCharacter(slotIndex, slotName);
        }
    };

    const handleSaveWithName = () => {
        if (selectedSlotIndex !== null) {
            saveCharacter(selectedSlotIndex, customName || character.ai?.characterName || character.ai?.name || `Character ${selectedSlotIndex + 1}`);
            setCustomNameModalOpen(false);
            setCustomName('');
            setSelectedSlotIndex(null);
        }
    };

    const handleLoad = (slotIndex: number) => {
        if (window.confirm('Loading will replace your current character. Continue?')) {
            loadCharacter(slotIndex);
        }
    };

    const handleDelete = (slotIndex: number) => {
        if (window.confirm('Delete this character save? This cannot be undone.')) {
            deleteSlot(slotIndex);
        }
    };

    const handleExport = (slotIndex: number) => {
        const data = exportSlot(slotIndex);
        setExportData(data);
    };

    const handleCopyToClipboard = async (slotIndex: number) => {
        const data = exportSlot(slotIndex);
        const ok = await copyTextToClipboard(data);
        if (ok) {
            setCopiedSlot(slotIndex);
            setTimeout(() => setCopiedSlot(null), 2000);
        } else {
            alert('Failed to copy to clipboard. Try using Export and copy manually.');
        }
    };

    const handleImportSubmit = () => {
        try {
            importSlot(importData);
            setImportModalOpen(false);
            setImportData('');
        } catch (error) {
            alert('Failed to import character: ' + (error as Error).message);
        }
    };

    const handleImportFilePick = () => {
        importFileInputRef.current?.click();
    };

    const handleImportFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = typeof reader.result === 'string' ? reader.result : '';
            setImportData(text);
        };
        reader.onerror = () => {
            alert('Failed to read file. Please try again.');
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handlePasteFromClipboard = async () => {
        try {
            if (!navigator.clipboard || !window.isSecureContext) {
                alert('Clipboard access is not available. Please paste manually.');
                return;
            }
            const text = await navigator.clipboard.readText();
            if (!text) {
                alert('Clipboard is empty.');
                return;
            }
            setImportData(text);
        } catch (error) {
            console.warn('Clipboard read failed.', error);
            alert('Failed to read from clipboard. Please paste manually.');
        }
    };

    const handleExportCurrent = () => {
        try {
            const jsonData = exportCurrentCharacter();
            setCurrentCharacterExportData(jsonData);
            setExportCurrentModalOpen(true);
        } catch (error) {
            alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleCopyCurrentCharacter = async () => {
        if (currentCharacterExportData) {
            const ok = await copyTextToClipboard(currentCharacterExportData);
            if (ok) {
                alert('Current character copied to clipboard!');
            } else {
                alert('Failed to copy to clipboard. Try the download option instead.');
            }
        }
    };

    const handleDownloadCurrentCharacter = () => {
        if (currentCharacterExportData) {
            const blob = new Blob([currentCharacterExportData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${character.ai?.characterName || character.ai?.name || 'character'}_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const isModalOpen = customNameModalOpen || importModalOpen || !!exportData || exportCurrentModalOpen;

    return (
        <>
            {/* Drawer Handle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`save-drawer-handle ${isModalOpen ? 'dimmed' : ''}`}
                aria-label={isOpen ? 'Close save menu' : 'Open save menu'}
                title={isOpen ? 'Close save menu' : 'Open save menu'}
            >
                <i className="fas fa-save"></i>
            </button>

            {/* Drawer */}
            <div className={`save-drawer ${isOpen ? 'open' : ''}`}>
                <div className="save-drawer-header">
                    <h2><i className="fas fa-archive"></i> Character Saves</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="close-button"
                        aria-label="Close"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="save-drawer-content">
                    {slots.map((slot, index) => (
                        <div key={index} className={`save-slot ${slot ? 'filled' : 'empty'}`}>
                            <div className="slot-info">
                                <div className="slot-number">Slot {index + 1}</div>
                                {slot ? (
                                    <>
                                        <div className="slot-name">{slot.customName || slot.characterName || 'Unnamed Character'}</div>
                                        <div className="slot-meta">
                                            <span className="slot-system" title="System">
                                                <i className="fas fa-gamepad"></i> {slot.system}
                                            </span>
                                            <span className="slot-date" title="Last saved">
                                                <i className="fas fa-clock"></i> {formatDate(slot.timestamp)}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="slot-empty-text">Empty Slot</div>
                                )}
                            </div>

                            <div className="slot-actions">
                                {slot ? (
                                    <>
                                        <button
                                            onClick={() => handleLoad(index)}
                                            className="slot-action-btn load"
                                            title="Load character"
                                        >
                                            <i className="fas fa-download"></i>
                                        </button>
                                        <button
                                            onClick={() => handleSave(index)}
                                            className="slot-action-btn update"
                                            title="Update save"
                                        >
                                            <i className="fas fa-sync-alt"></i>
                                        </button>
                                        <button
                                            onClick={() => handleExport(index)}
                                            className="slot-action-btn export"
                                            title="Export to JSON"
                                        >
                                            <i className="fas fa-file-export"></i>
                                        </button>
                                        <button
                                            onClick={() => handleCopyToClipboard(index)}
                                            className={`slot-action-btn copy ${copiedSlot === index ? 'copied' : ''}`}
                                            title="Copy to clipboard"
                                        >
                                            <i className="fas fa-clipboard"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="slot-action-btn delete"
                                            title="Delete save"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="slot-action-btn save"
                                        title="Save to slot"
                                    >
                                        <i className="fas fa-save"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="save-drawer-footer">
                    <button
                        onClick={() => setImportModalOpen(true)}
                        className="drawer-footer-btn import"
                        title="Import character from JSON"
                    >
                        <i className="fas fa-file-import"></i> Import
                    </button>
                    <button
                        onClick={handleExportCurrent}
                        className="drawer-footer-btn export-current"
                        title="Export current character"
                    >
                        <i className="fas fa-file-export"></i> Export Current
                    </button>
                </div>
            </div>

            {/* Custom Name Modal */}
            {customNameModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Save Character</h3>
                        <p>Enter a custom name for this character:</p>
                        <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Character name"
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button onClick={() => setCustomNameModalOpen(false)}>Cancel</button>
                            <button onClick={handleSaveWithName}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {importModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Import Character</h3>
                        <p>Paste the JSON data for the character you want to import:</p>
                        <div className="modal-actions">
                            <button onClick={handlePasteFromClipboard}>Paste from Clipboard</button>
                            <button onClick={handleImportFilePick}>Load from File</button>
                            <input
                                ref={importFileInputRef}
                                type="file"
                                accept="application/json,.json"
                                onChange={handleImportFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <textarea
                            value={importData}
                            onChange={(e) => setImportData(e.target.value)}
                            placeholder="Paste JSON here..."
                            rows={10}
                        />
                        <div className="modal-actions">
                            <button onClick={() => setImportModalOpen(false)}>Cancel</button>
                            <button onClick={handleImportSubmit}>Import</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {exportData && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Export Character</h3>
                        <p>Copy the JSON data below to save this character:</p>
                        <textarea
                            value={exportData}
                            readOnly
                            rows={15}
                        />
                        <div className="modal-actions">
                            <button onClick={() => setExportData(null)}>Close</button>
                            <button
                                onClick={async () => {
                                    const ok = await copyTextToClipboard(exportData);
                                    if (!ok) {
                                        alert('Failed to copy to clipboard. Please copy from the text area.');
                                    }
                                }}
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Current Character Modal */}
            {exportCurrentModalOpen && currentCharacterExportData && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Export Current Character</h3>
                        <p>Export options for the current character:</p>
                        <div className="modal-actions">
                            <button onClick={handleCopyCurrentCharacter}>Copy to Clipboard</button>
                            <button onClick={handleDownloadCurrentCharacter}>Download as File</button>
                            <button onClick={() => setExportCurrentModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .save-drawer-handle {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    background: rgba(251, 191, 36, 0.15);
                    border: 3px solid #fbbf24;
                    color: #fbbf24;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    z-index: 998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .save-drawer-handle:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                    background: rgba(251, 191, 36, 0.25);
                    color: #fde047;
                    border-color: #fde047;
                }

                .save-drawer-handle:active {
                    transform: scale(0.95);
                }

                .save-drawer-handle.dimmed {
                    opacity: 0.35;
                    filter: grayscale(1);
                    pointer-events: none;
                }

                body:has(.modal-overlay) .save-drawer-handle {
                    opacity: 0.35;
                    filter: grayscale(1);
                    pointer-events: none;
                }

                .save-drawer {
                    position: fixed;
                    top: 0;
                    left: -420px;
                    width: 420px;
                    height: 100vh;
                    background: #111827;
                    box-shadow: 2px 0 24px rgba(0, 0, 0, 0.12);
                    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999;
                    display: flex;
                    flex-direction: column;
                    border-right: 2px solid #1f2937;
                }

                .save-drawer.open {
                    left: 0;
                }

                .save-drawer-header {
                    padding: 24px;
                    border-bottom: 2px solid #1f2937;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(251, 191, 36, 0.1);
                    color: #fbbf24;
                }

                .save-drawer-header h2 {
                    margin: 0;
                    font-size: 22px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .close-button {
                    background: transparent;
                    border: 2px solid rgba(251, 191, 36, 0.4);
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    color: #fbbf24;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .close-button:hover {
                    background: rgba(251, 191, 36, 0.15);
                    border-color: #fbbf24;
                }

                .save-drawer-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background: #111827;
                }

                .save-drawer-content::-webkit-scrollbar {
                    width: 8px;
                }

                .save-drawer-content::-webkit-scrollbar-track {
                    background: rgba(251, 191, 36, 0.1);
                    border-radius: 4px;
                }

                .save-drawer-content::-webkit-scrollbar-thumb {
                    background: #fbbf24;
                    border-radius: 4px;
                }

                .save-drawer-content::-webkit-scrollbar-thumb:hover {
                    background: #fde047;
                }

                .save-slot {
                    background: #1f2937;
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    transition: all 0.2s;
                    border: 2px solid #374151;
                }

                .save-slot:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
                    border-color: #fbbf24;
                }

                .save-slot.filled {
                    background: #1f2937;
                    border-color: #374151;
                }

                .slot-info {
                    margin-bottom: 12px;
                }

                .slot-number {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #fbbf24;
                    margin-bottom: 6px;
                }

                .slot-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #f3f4f6;
                    margin-bottom: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .slot-empty-text {
                    font-size: 14px;
                    color: #6b7280;
                    font-style: italic;
                }

                .slot-meta {
                    display: flex;
                    gap: 12px;
                    font-size: 12px;
                    color: #9ca3af;
                    flex-wrap: wrap;
                }

                .slot-meta span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .slot-system {
                    padding: 2px 8px;
                    background: rgba(251, 191, 36, 0.15);
                    border: 1px solid #fbbf24;
                    border-radius: 8px;
                    font-weight: 500;
                    color: #fbbf24;
                }

                .slot-actions {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }

                .slot-action-btn {
                    flex: 1;
                    min-width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    border: 2px solid rgba(251, 191, 36, 0.3);
                    background: rgba(251, 191, 36, 0.05);
                    color: #fbbf24;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .slot-action-btn:hover {
                    background: rgba(251, 191, 36, 0.15);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border-color: #fbbf24;
                }

                .slot-action-btn.delete {
                    background: rgba(220, 38, 38, 0.1);
                    color: #ef4444;
                    border-color: rgba(220, 38, 38, 0.4);
                }

                .slot-action-btn.delete:hover {
                    background: rgba(220, 38, 38, 0.2);
                    border-color: #ef4444;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .slot-action-btn.save {
                    flex: 1 1 100%;
                    background: rgba(251, 191, 36, 0.15);
                    color: #fbbf24;
                    border-color: #fbbf24;
                    font-weight: 600;
                }

                .slot-action-btn.save:hover {
                    background: rgba(251, 191, 36, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }

                .slot-action-btn.copied {
                    background: rgba(251, 191, 36, 0.2);
                    color: #fbbf24;
                    border-color: #fbbf24;
                }

                .save-drawer-footer {
                    padding: 16px;
                    border-top: 2px solid #1f2937;
                    display: flex;
                    gap: 10%;
                    background: #1f2937;
                    justify-content: space-between;
                }

                .drawer-footer-btn {
                    width: 45%;
                    padding: 14px;
                    border-radius: 10px;
                    border: 2px solid #fbbf24;
                    background: rgba(251, 191, 36, 0.1);
                    color: #fbbf24;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .drawer-footer-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: rgba(251, 191, 36, 0.2);
                    border-color: #fde047;
                }

                .drawer-footer-btn.export {
                    background: rgba(251, 191, 36, 0.05);
                    border-color: rgba(251, 191, 36, 0.4);
                }

                .drawer-footer-btn.import {
                    background: rgba(251, 191, 36, 0.15);
                    border-color: #fbbf24;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1001;
                    animation: fadeIn 0.2s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal {
                    background: #1f2937;
                    border-radius: 16px;
                    border: 2px solid #374151;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .modal h3 {
                    margin: 0;
                    padding: 24px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #fbbf24;
                    background: rgba(251, 191, 36, 0.1);
                    border-radius: 14px 14px 0 0;
                    border-bottom: 2px solid #374151;
                }

                .modal p {
                    padding: 0 24px;
                    margin: 16px 0;
                    color: #9ca3af;
                }

                .modal input,
                .modal textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #374151;
                    border-radius: 10px;
                    font-size: 15px;
                    font-family: inherit;
                    transition: all 0.2s;
                    background: #111827;
                    color: #f3f4f6;
                    margin: 0 24px 16px 24px;
                    box-sizing: border-box;
                    max-width: calc(100% - 48px);
                }

                .modal input:focus,
                .modal textarea:focus {
                    outline: none;
                    border-color: #fbbf24;
                    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2);
                }

                .modal textarea {
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 12px;
                    resize: vertical;
                    min-height: 200px;
                }

                .modal-actions {
                    display: flex;
                    gap: 12px;
                    padding: 16px 24px;
                    justify-content: flex-end;
                    border-top: 2px solid #374151;
                    background: rgba(251, 191, 36, 0.05);
                }

                .modal-actions button {
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid #fbbf24;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(251, 191, 36, 0.1);
                    color: #fbbf24;
                }

                .modal-actions button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: rgba(251, 191, 36, 0.2);
                    border-color: #fde047;
                }

                .modal-actions button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
};
