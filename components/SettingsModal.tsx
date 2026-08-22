import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    AI_MODEL_SLOTS,
    AI_SLOT_DESCRIPTIONS,
    AI_SLOT_LABELS,
    useAiSettings,
} from '../context/AiSettingsContext';
import { useSheetContext, type SheetSourceType } from '../context/SheetContext';
import type { AiModelSlot } from '../lib/ai/ai-slots';
import { AI_PROVIDER_OPTIONS, isAiProviderId } from '../lib/ai/provider-options';
import { SOURCES } from '../third-party/manifest';
import { RefreshIcon } from './icons/RefreshIcon';

interface SettingsModalProps { onClose: () => void; }

const RadioOption: React.FC<{
    id: string;
    label: string;
    description: string;
    value: SheetSourceType;
    currentValue: SheetSourceType;
    onChange: (value: SheetSourceType) => void;
}> = ({ id, label, description, value, currentValue, onChange }) => (
    <div className="flex items-start">
        <input
            id={id}
            type="radio"
            name="sheet-source"
            value={value}
            checked={currentValue === value}
            onChange={() => onChange(value)}
            className="mt-1 h-4 w-4 text-yellow-500 border-gray-600 focus:ring-yellow-500 bg-gray-900"
        />
        <label htmlFor={id} className="ml-3">
            <span className="block text-md font-bold text-gray-100">{label}</span>
            <span className="block text-sm text-gray-400">{description}</span>
        </label>
    </div>
);

const UrlInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; type?: string }> = ({
    label, value, onChange, type = 'text',
}) => (
    <div className="mt-2">
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 mt-1 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
    </div>
);

const SelectInput: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
    <div className="mt-2">
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 mt-1 text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const formatModelOptionLabel = (model: {
    id: string;
    baseName: string;
    name: string;
    priceLabel: string;
}) => `${model.baseName} · ${model.priceLabel} / 1M mixed`;

/** Local persistence for the Imgur Client-ID (hosting settings). */
const IMGUR_CLIENT_ID_KEY = 'hosting.imgur.clientId';

export const getImgurClientId = (): string => {
    try {
        return window.localStorage.getItem(IMGUR_CLIENT_ID_KEY) || '';
    } catch {
        return '';
    }
};

const setStoredImgurClientId = (value: string) => {
    try {
        if (value.trim()) window.localStorage.setItem(IMGUR_CLIENT_ID_KEY, value.trim());
        else window.localStorage.removeItem(IMGUR_CLIENT_ID_KEY);
    } catch {
        /* private mode */
    }
};

/** Probe endpoint: reports whether ANY usable Imgur Client-ID is available. */
const fetchImgurStatus = async (): Promise<{ available: boolean; source: 'ui' | 'env' | 'none'; configured: boolean }> => {
    try {
        const res = await fetch('/__imgur_status');
        return await res.json();
    } catch {
        return { available: false, source: 'none', configured: false };
    }
};

const HostingTab: React.FC = () => {
    const [clientId, setClientId] = useState(getImgurClientId());
    const [saved, setSaved] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<string | null>(null);
    const [serverKey, setServerKey] = useState<boolean | null>(null);

    useEffect(() => {
        void fetchImgurStatus().then((s) => setServerKey(s.source === 'env'));
    }, []);

    const save = () => {
        setStoredImgurClientId(clientId);
        setSaved(true);
        window.setTimeout(() => setSaved(false), 1500);
    };

    const runTest = async () => {
        setTesting(true);
        setTestResult(null);
        try {
            const res = await fetch('/__save_portrait', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // 1x1 transparent PNG — minimal real upload to validate the key
                    dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
                    name: 'Hosting Test',
                    imgurClientId: clientId.trim(),
                }),
            });
            const json = await res.json();
            if (json.host === 'imgur') {
                setTestResult(`Upload OK — hotlink: ${json.url}`);
            } else if (json.error) {
                setTestResult(`Endpoint error: ${json.error}`);
            } else {
                setTestResult('Imgur rejected the upload — fell back to local hosting. Check the Client-ID.');
            }
        } catch (err: any) {
            setTestResult(`Request failed: ${err?.message || err}`);
        } finally {
            setTesting(false);
        }
    };

    return (
        <section className="space-y-4">
            <p className="text-sm text-gray-400">
                Generated portraits are uploaded for hotlinking in the Foundry Statblock Importer
                (<code className="text-yellow-300">img:</code> field). Imgur gives a CDN link that
                survives this PC; without it the portrait is cached on the local Foundry world instead.
            </p>
            <div className="space-y-3 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold text-yellow-400">Imgur</h3>
                <UrlInput
                    label="Client-ID (anonymous uploads, remembered locally)"
                    value={clientId}
                    onChange={(v) => { setClientId(v); setTestResult(null); }}
                    type="password"
                />
                <p className="text-xs text-gray-500">
                    Free key from{' '}
                    <a href="https://api.imgur.com/oauth2/addclient" target="_blank" rel="noreferrer" className="text-yellow-300 underline">
                        api.imgur.com
                    </a>{' '}
                    (choose "Anonymous usage" authorization type).
                    {serverKey && ' A server-side key from the .env file is also active and used as fallback.'}
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                    <button
                        type="button"
                        onClick={save}
                        className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-3 rounded-md text-sm"
                        disabled={clientId.trim() === getImgurClientId()}
                    >
                        {saved ? 'Saved ✓' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={() => void runTest()}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-md text-sm disabled:opacity-60"
                        disabled={testing}
                    >
                        {testing ? 'Testing…' : 'Test upload'}
                    </button>
                    {clientId.trim() && (
                        <button
                            type="button"
                            onClick={() => { setClientId(''); setStoredImgurClientId(''); }}
                            className="border border-gray-600 font-bold py-2 px-3 rounded-md text-sm text-gray-300"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {testResult && (
                    <p className={`text-xs break-all ${testResult.startsWith('Upload OK') ? 'text-green-400' : 'text-red-400'}`}>
                        {testResult}
                    </p>
                )}
            </div>
        </section>
    );
};

const SearchableSelect: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuRect, setMenuRect] = useState<{ top: number; left: number; width: number } | null>(null);

    useEffect(() => {
        const onDocClick = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const target = event.target as Node;
            if (!containerRef.current.contains(target) && !menuRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            const updatePosition = () => {
                const button = buttonRef.current;
                if (!button) return;
                const rect = button.getBoundingClientRect();
                setMenuRect({ top: rect.bottom + 4, left: rect.left, width: rect.width });
            };
            updatePosition();
            window.setTimeout(() => inputRef.current?.focus(), 0);
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition, true);
            };
        }
        setMenuRect(null);
        return undefined;
    }, [open]);

    const selectedLabel = options.find(option => option.value === value)?.label || 'Select a model';
    const filteredOptions = useMemo(
        () => options.filter(option => {
            if (!query.trim()) return true;
            const haystack = `${option.label} ${option.value}`.toLowerCase();
            return haystack.includes(query.toLowerCase());
        }),
        [options, query],
    );

    return (
        <div ref={containerRef} className="mt-2 relative">
            <label className="block text-sm font-medium text-gray-400">{label}</label>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 mt-1 text-left text-gray-100 focus:ring-2 focus:ring-yellow-500 flex items-center justify-between gap-2"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="truncate">{selectedLabel}</span>
                <i className="fa-solid fa-chevron-down text-gray-500"></i>
            </button>
            {open && menuRect && typeof document !== 'undefined' && createPortal(
                <div
                    ref={menuRef}
                    className="fixed z-[9999] bg-gray-800 border border-gray-600 rounded-md shadow-2xl p-2"
                    role="listbox"
                    style={{ top: `${menuRect.top}px`, left: `${menuRect.left}px`, width: `${menuRect.width}px` }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type to filter models..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
                    />
                    <div className="mt-2 max-h-56 overflow-auto">
                        {filteredOptions.length > 0 ? filteredOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={value === option.value}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${value === option.value ? 'bg-gray-700 text-yellow-300 font-bold' : 'hover:bg-gray-700 text-gray-200'}`}
                            >
                                <div className="truncate">{option.label}</div>
                            </button>
                        )) : (
                            <div className="px-3 py-2 text-sm text-gray-500">No models match your filter.</div>
                        )}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
};

const SlotProviderBlock: React.FC<{ slot: AiModelSlot }> = ({ slot }) => {
    const {
        slots,
        setSlotProvider,
        setSlotModelId,
        setProviderApiKey,
        refreshProviderModels,
        xaiOauthDevice,
        startXaiOauthDeviceFlow,
        openXaiOauthBrowser,
        cancelXaiOauthDeviceFlow,
        disconnectXaiOauth,
        pasteXaiOauthToken,
        xaiOauthConnected,
        codexOauthDevice,
        startCodexOauthDeviceFlow,
        openCodexOauthBrowser,
        cancelCodexOauthDeviceFlow,
        disconnectCodexOauth,
        pasteCodexOauthToken,
        codexOauthConnected,
    } = useAiSettings();
    const view = slots[slot];
    const isOauth = view.provider === 'xai-oauth';
    const isCodexOauth = view.provider === 'openai-codex';
    const [showAdvancedPaste, setShowAdvancedPaste] = useState(false);
    const [pasteToken, setPasteToken] = useState('');
    const modelOptions = useMemo(
        () => view.models.map(model => ({ value: model.id, label: formatModelOptionLabel(model) })),
        [view.models],
    );
    const devicePending =
        xaiOauthDevice.status === 'pending' || xaiOauthDevice.status === 'polling'
            ? xaiOauthDevice.pending
            : null;
    const codexDevicePending =
        codexOauthDevice.status === 'pending' || codexOauthDevice.status === 'polling'
            ? codexOauthDevice.pending
            : null;

    // Shared OAuth panel props: one button interface for both OAuth providers.
    const oauthPanel = isCodexOauth
        ? {
            hint: 'OpenAI Codex / ChatGPT OAuth — no API key. Authorize in the browser with a device code. Requires the Vite dev server (or a reverse proxy for /__codex_oauth).',
            connected: codexOauthConnected || codexOauthDevice.status === 'connected',
            device: codexOauthDevice,
            devicePending: codexDevicePending,
            start: startCodexOauthDeviceFlow,
            openBrowser: openCodexOauthBrowser,
            cancel: cancelCodexOauthDeviceFlow,
            disconnect: disconnectCodexOauth,
            paste: pasteCodexOauthToken,
            codeLabel: 'OpenAI device code',
        }
        : {
            hint: 'SuperGrok / X Premium OAuth — no API key. Authorize in the browser with a device code. Requires the Vite dev server (or a reverse proxy for /__xai_oauth).',
            connected: xaiOauthConnected || xaiOauthDevice.status === 'connected',
            device: xaiOauthDevice,
            devicePending: devicePending,
            start: startXaiOauthDeviceFlow,
            openBrowser: openXaiOauthBrowser,
            cancel: cancelXaiOauthDeviceFlow,
            disconnect: disconnectXaiOauth,
            paste: pasteXaiOauthToken,
            codeLabel: 'xAI device code',
        };

    return (
        <section className="space-y-3 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
            <div>
                <h3 className="text-lg font-bold text-yellow-400">{AI_SLOT_LABELS[slot]}</h3>
                <p className="text-sm text-gray-400">{AI_SLOT_DESCRIPTIONS[slot]}</p>
            </div>
            <SelectInput
                label="Provider"
                value={view.provider}
                onChange={(value) => {
                    if (isAiProviderId(value)) setSlotProvider(slot, value);
                }}
                options={AI_PROVIDER_OPTIONS.map(option => ({
                    value: option.value,
                    label: option.label,
                }))}
            />

            {isOauth || isCodexOauth ? (
                <div className="space-y-3 rounded-md border border-gray-600 bg-gray-800/80 p-3">
                    <p className="text-sm text-gray-400">
                        {oauthPanel.hint}
                    </p>
                    <p className="text-sm font-semibold text-gray-200">
                        Status:{' '}
                        {oauthPanel.connected
                            ? 'Connected'
                            : oauthPanel.device.status === 'starting'
                                ? 'Starting…'
                                : oauthPanel.device.status === 'pending' || oauthPanel.device.status === 'polling'
                                    ? 'Waiting for browser approval…'
                                    : oauthPanel.device.status === 'error'
                                        ? `Error — ${(oauthPanel.device as { message?: string }).message}`
                                        : 'Not connected'}
                    </p>
                    {oauthPanel.devicePending && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">{oauthPanel.codeLabel}</label>
                            <input
                                readOnly
                                value={oauthPanel.devicePending.userCode}
                                className="w-full bg-gray-900 border-2 border-yellow-500/50 rounded-md p-3 mt-1 text-center text-2xl font-mono font-bold tracking-widest text-yellow-300"
                                aria-label={oauthPanel.codeLabel}
                            />
                            <p className="text-xs text-gray-500 break-all">
                                Open: {oauthPanel.devicePending.verificationUri}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-3 rounded-md text-sm"
                            onClick={() => void oauthPanel.start()}
                            disabled={oauthPanel.device.status === 'starting' || oauthPanel.device.status === 'polling'}
                        >
                            {oauthPanel.devicePending ? 'Restart device login' : 'Start device login'}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-md text-sm"
                            onClick={() => oauthPanel.openBrowser()}
                            disabled={!oauthPanel.devicePending}
                        >
                            Open Browser
                        </button>
                        {oauthPanel.devicePending && (
                            <button
                                type="button"
                                className="border border-gray-600 font-bold py-2 px-3 rounded-md text-sm text-gray-300"
                                onClick={() => oauthPanel.cancel()}
                            >
                                Cancel
                            </button>
                        )}
                        {oauthPanel.connected && (
                            <button
                                type="button"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-md text-sm"
                                onClick={() => oauthPanel.disconnect()}
                            >
                                Disconnect
                            </button>
                        )}
                        <button
                            type="button"
                            className="border border-gray-600 font-bold py-2 px-3 rounded-md text-sm text-gray-400"
                            onClick={() => setShowAdvancedPaste(v => !v)}
                        >
                            {showAdvancedPaste ? 'Hide' : '...or Paste Token'}
                        </button>
                    </div>
                    {showAdvancedPaste && (
                        <div className="space-y-2 border-t border-gray-700 pt-3">
                            <p className="text-xs text-gray-500">
                                Paste a bearer access token only if you already obtained one outside this app.
                            </p>
                            <UrlInput label="Access token" value={pasteToken} onChange={setPasteToken} type="password" />
                            <button
                                type="button"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-md text-sm"
                                onClick={() => {
                                    oauthPanel.paste(pasteToken);
                                    setPasteToken('');
                                    setShowAdvancedPaste(false);
                                }}
                                disabled={!pasteToken.trim()}
                            >
                                Save token
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <UrlInput
                    label={
                        view.provider === 'zhipu'
                            ? 'Z.ai Coding Plan API Key (remembered)'
                            : view.provider === 'xai'
                                ? 'xAI API Key (remembered)'
                                : 'API Key (remembered for this provider)'
                    }
                    value={view.apiKey}
                    onChange={(key) => setProviderApiKey(view.provider, key)}
                    type="password"
                />
            )}

            {view.provider === 'zhipu' && (
                <p className="text-xs text-gray-500">
                    Coding Plan endpoint only: <code className="text-yellow-300">api.z.ai/api/coding/paas/v4</code>
                </p>
            )}

            <div className="flex items-end gap-2">
                <div className="flex-1 min-w-0">
                    {modelOptions.length > 0 ? (
                        <SearchableSelect
                            key={`${slot}-${view.provider}-model`}
                            label="Model"
                            value={view.modelId}
                            onChange={(id) => setSlotModelId(slot, id)}
                            options={modelOptions}
                        />
                    ) : (
                        <div className="mt-2 rounded-md border border-dashed border-gray-600 bg-gray-900 p-3 text-sm text-gray-500">
                            No models loaded for this provider yet.
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => void refreshProviderModels(view.provider)}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-700 disabled:opacity-60 mb-0.5"
                    disabled={view.catalogState === 'loading'}
                    title="Refresh model list"
                    aria-label={`Refresh models for ${view.provider}`}
                >
                    <RefreshIcon className="h-4 w-4" />
                    Refresh
                </button>
            </div>
            <div className="text-xs text-gray-500">
                Catalog: {view.catalogState}
                {view.catalogError ? ` — ${view.catalogError}` : ''}
            </div>
        </section>
    );
};

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { sourceType, setSourceType, externalUrls, setExternalUrl, selfHostedUrl, setSelfHostedUrl } = useSheetContext();
    const [activeTab, setActiveTab] = useState<'sheet' | 'ai' | 'hosting'>('sheet');

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
        >
            <div
                className="bg-gray-800 border-2 border-yellow-600/40 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 rounded-t-lg">
                    <h2 id="settings-modal-title" className="text-2xl font-bold text-yellow-400">Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="flex border-b border-gray-700 bg-gray-900 px-6 pt-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('sheet')}
                        className={`px-4 py-2 rounded-t-lg font-bold ${activeTab === 'sheet' ? 'bg-gray-800 text-yellow-400 border border-gray-600 border-b-0' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        Character Sheet settings
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('ai')}
                        className={`px-4 py-2 rounded-t-lg font-bold ${activeTab === 'ai' ? 'bg-gray-800 text-yellow-400 border border-gray-600 border-b-0' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        AI Provider
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('hosting')}
                        className={`px-4 py-2 rounded-t-lg font-bold ${activeTab === 'hosting' ? 'bg-gray-800 text-yellow-400 border border-gray-600 border-b-0' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        Hosting
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    {activeTab === 'sheet' && (
                        <>
                            <section>
                                <h3 className="text-lg font-bold text-gray-100 mb-3">Character Sheet Source</h3>
                                <div className="space-y-4 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                                    <RadioOption
                                        id="source-internal"
                                        label="Internal Development"
                                        description="Use sheet files in the local /public/sheets/ folder. (For developers)"
                                        value="internal"
                                        currentValue={sourceType}
                                        onChange={setSourceType}
                                    />
                                    <RadioOption
                                        id="source-external"
                                        label="Default External URLs"
                                        description="Use externally hosted PDFs via full URLs (CDN or your own host) for best compatibility when shipping builds without local sheets."
                                        value="external"
                                        currentValue={sourceType}
                                        onChange={setSourceType}
                                    />
                                    <RadioOption
                                        id="source-self-hosted"
                                        label="Self-Hosted"
                                        description="Provide a base URL to a folder where you are hosting the PDF files."
                                        value="self-hosted"
                                        currentValue={sourceType}
                                        onChange={setSourceType}
                                    />
                                </div>
                            </section>

                            {sourceType === 'external' && (
                                <section>
                                    <h3 className="text-lg font-bold text-gray-100 mb-3">External URLs</h3>
                                    <div className="space-y-4 bg-gray-900/70 p-4 rounded-lg border border-gray-700 max-h-64 overflow-y-auto">
                                        {SOURCES.map(source => (
                                            <div key={source.id}>
                                                <h4 className="font-semibold text-gray-200">{source.name}</h4>
                                                <UrlInput
                                                    label="Default Sheet URL"
                                                    value={externalUrls[source.id]?.defaultSheet || ''}
                                                    onChange={(val) => setExternalUrl(source.id, 'defaultSheet', val)}
                                                />
                                                <UrlInput
                                                    label="Spellcaster / Magic Sheet URL (optional)"
                                                    value={externalUrls[source.id]?.spellcasterSheet || ''}
                                                    onChange={(val) => setExternalUrl(source.id, 'spellcasterSheet', val)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {sourceType === 'self-hosted' && (
                                <section>
                                    <h3 className="text-lg font-bold text-gray-100 mb-3">Self-Hosted Base URL</h3>
                                    <div className="space-y-4 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                                        <p className="text-sm text-gray-400">
                                            Enter the base URL to the directory containing the PDF files. The app will
                                            append the standard filename (e.g. <code className="text-yellow-300">ose_sheet.pdf</code>
                                            {' '}or <code className="text-yellow-300">ose_sheet_magicuser.pdf</code>).
                                        </p>
                                        <UrlInput label="Base URL" value={selfHostedUrl} onChange={setSelfHostedUrl} />
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {activeTab === 'ai' && (
                        <>
                            <p className="text-sm text-gray-400">
                                Each use type has its own provider, remembered API key (shared across slots for the same
                                provider), and model. xAI OAuth uses device login instead of a key.
                            </p>
                            {AI_MODEL_SLOTS.map(slot => (
                                <SlotProviderBlock key={slot} slot={slot} />
                            ))}
                        </>
                    )}

                    {activeTab === 'hosting' && <HostingTab />}
                </div>

                <footer className="p-4 border-t border-gray-700 flex-shrink-0 text-right bg-gray-900 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                    >
                        Done
                    </button>
                </footer>
            </div>
        </div>
    );
};
