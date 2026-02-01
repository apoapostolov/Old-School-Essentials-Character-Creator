import React, { useMemo, useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { SOURCES } from '../third-party/manifest';
import type { Item, SourceID } from '../types';
import { Tooltip } from './Tooltip';

interface EquipmentCustomizationModalProps {
    onClose: () => void;
}

const itemCategories: Item['category'][] = ['Weapon', 'Armor', 'Ammunition', 'Gear', 'Poison'];

const DraggableInventoryItem: React.FC<{
    item: Item;
    uniqueId: string;
    dragData: Record<string, string>;
    className: string;
    children: React.ReactNode;
}> = ({ item, uniqueId, dragData, className, children }) => {
    return (
        <div
            key={uniqueId}
            draggable
            onDragStart={e => {
                for(const key in dragData) {
                    e.dataTransfer.setData(key, dragData[key]);
                }
                e.currentTarget.style.opacity = '0.5';
            }}
            onDragEnd={e => e.currentTarget.style.opacity = '1'}
            className={className}
        >
            {children}
        </div>
    );
};

export const EquipmentCustomizationModal: React.FC<EquipmentCustomizationModalProps> = ({ onClose }) => {
    const { equipment, progression, aggregatedData } = useCharacterContext();
    const {
        customItems, selectedMainKit: mainKit, selectedSpecializedKit: specializedKit,
        handleAddCustomItem, handleRemoveCustomItem, handleRemoveKitItem
    } = equipment;
    const totalMoney = progression.moneyResult?.total ?? 0;

    const [isDraggingOverInventory, setIsDraggingOverInventory] = useState(false);
    const [isDraggingOverCatalog, setIsDraggingOverCatalog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { mainKitItems, specializedKitItems } = useMemo(() => {
        const mainKitData = mainKit?.items.map((key, index) => ({
            key,
            item: aggregatedData.ITEMS[key],
            uniqueId: `main-${key}-${index}`
        })).filter(o => o.item) ?? [];

        const specializedKitData = specializedKit?.items.map((key, index) => ({
            key,
            item: aggregatedData.ITEMS[key],
            uniqueId: `specialized-${key}-${index}`
        })).filter(o => o.item) ?? [];

        return { mainKitItems: mainKitData, specializedKitItems: specializedKitData };
    }, [mainKit, specializedKit, aggregatedData.ITEMS]);

    const customItemsCost = useMemo(() => {
        return customItems.reduce((total, ci) => total + (aggregatedData.ITEMS[ci.itemKey]?.cost ?? 0), 0);
    }, [customItems, aggregatedData.ITEMS]);

    const totalCost = (mainKit?.cost ?? 0) + (specializedKit?.cost ?? 0) + customItemsCost;
    const remainingMoney = totalMoney - totalCost;

    const catalogItemsBySourceAndCategory = useMemo(() => {
        type CatalogStructure = Record<SourceID, Partial<Record<Item['category'], {key: string, item: Item}[]>>>;
        const categorized: CatalogStructure = {} as CatalogStructure;

        for (const key in aggregatedData.ITEMS) {
            const item = aggregatedData.ITEMS[key];
            const sourceId = item.sourceId || 'ose';
            if (!categorized[sourceId]) {
                categorized[sourceId] = {};
            }
            if (!categorized[sourceId][item.category]) {
                categorized[sourceId][item.category] = [];
            }
            categorized[sourceId][item.category]!.push({ key, item });
        }

        for (const sourceId in categorized) {
            for(const category in categorized[sourceId as SourceID]) {
                categorized[sourceId as SourceID][category as Item['category']]!.sort((a,b) => a.item.name.localeCompare(b.item.name));
            }
        }
        return categorized;
    }, [aggregatedData.ITEMS]);

    const filteredCatalogItems = useMemo(() => {
        if (!searchTerm.trim()) {
            return catalogItemsBySourceAndCategory;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        type CatalogStructure = Record<SourceID, Partial<Record<Item['category'], {key: string, item: Item}[]>>>;
        const filtered: CatalogStructure = {} as CatalogStructure;

        for (const sourceId in catalogItemsBySourceAndCategory) {
            const sourceData = catalogItemsBySourceAndCategory[sourceId as SourceID];
            const newSourceData: Partial<Record<Item['category'], {key: string, item: Item}[]>> = {};
            let sourceHasItems = false;

            for (const category in sourceData) {
                const typedCategory = category as Item['category'];
                const items = sourceData[typedCategory];
                if (items) {
                    const filteredItems = items.filter(({ item }) =>
                        item.name.toLowerCase().includes(lowercasedFilter)
                    );
                    if (filteredItems.length > 0) {
                        newSourceData[typedCategory] = filteredItems;
                        sourceHasItems = true;
                    }
                }
            }

            if (sourceHasItems) {
                filtered[sourceId as SourceID] = newSourceData;
            }
        }
        return filtered;
    }, [catalogItemsBySourceAndCategory, searchTerm]);

    const activeSources = useMemo(() => {
        const sourceIds = new Set(Object.keys(filteredCatalogItems) as SourceID[]);
        return SOURCES.filter(source => sourceIds.has(source.id));
    }, [filteredCatalogItems]);

    const handleDropOnInventory = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOverInventory(false);
        const itemKey = e.dataTransfer.getData('itemKey');
        if (itemKey) {
            handleAddCustomItem(itemKey);
        }
    };

    const handleDropOnCatalog = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOverCatalog(false);
        const source = e.dataTransfer.getData('source');
        if (source === 'custom') {
            const itemId = e.dataTransfer.getData('itemId');
            if (itemId) {
                handleRemoveCustomItem(itemId);
            }
        } else if (source === 'kit') {
            const kitType = e.dataTransfer.getData('kitType') as 'Main' | 'Specialized';
            const itemKey = e.dataTransfer.getData('itemKey');
            if (kitType && itemKey) {
                handleRemoveKitItem(kitType, itemKey);
            }
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overscroll-none overflow-hidden"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="equipment-customization-title"
        >
            <div
                className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-6xl flex flex-col max-h-[90vh] overflow-hidden overscroll-none"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 id="equipment-customization-title" className="text-2xl font-bold text-yellow-400">Customize Equipment</h2>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                            <p className="font-bold uppercase text-gray-400">Total Wealth</p>
                            <p className="text-xl font-black text-yellow-300">{totalMoney} gp</p>
                        </div>
                         <div className="text-center">
                            <p className="font-bold uppercase text-gray-400">Spent</p>
                            <p className="text-xl font-black text-red-400">{totalCost} gp</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold uppercase text-gray-400">Remaining</p>
                            <p className="text-xl font-black text-green-400">{remainingMoney} gp</p>
                        </div>
                    </div>
                </header>

                <div className="flex p-4 gap-4 flex-grow overflow-hidden min-h-0 overscroll-none">
                    {/* Left Panel: Item Catalog */}
                    <div
                        className={`w-1/2 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed ${isDraggingOverCatalog ? 'border-red-500 bg-red-900/20' : 'border-gray-700'} flex flex-col flex-1 min-h-0 overflow-y-auto overscroll-none transition-colors duration-200`}
                        onDragEnter={() => setIsDraggingOverCatalog(true)}
                        onDragLeave={() => setIsDraggingOverCatalog(false)}
                        onDragOver={e => { e.preventDefault(); setIsDraggingOverCatalog(true); }}
                        onDrop={handleDropOnCatalog}
                    >
                         <h3 className="text-xl font-bold text-gray-300 mb-2 text-center">Item Catalog <span className="text-sm font-normal text-red-400">(Drop items here to sell)</span></h3>
                         <input
                            type="text"
                            placeholder="Filter items..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 mb-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                        />
                        <div className="pr-2">
                            {activeSources.map(source => (
                                <div key={source.id} className="mb-6">
                                    <h4 className="text-lg font-black text-blue-300 border-b-2 border-blue-700/50 pb-1 mb-3">{source.name}</h4>
                                    {itemCategories.map(category => {
                                        const items = filteredCatalogItems[source.id]?.[category];
                                        if (!items || items.length === 0) return null;

                                        return (
                                            <div key={category} className="mb-4">
                                                <h5 className="font-bold text-yellow-300 border-b border-yellow-700/50 pb-1 mb-2">{category}</h5>
                                                <div className="space-y-1">
                                                    {items.map(({key, item}) => (
                                                        <Tooltip key={key} text={item.description}>
                                                            <div
                                                                draggable
                                                                onDragStart={e => {
                                                                    e.dataTransfer.setData('itemKey', key);
                                                                    e.currentTarget.style.opacity = '0.5';
                                                                }}
                                                                onDragEnd={e => e.currentTarget.style.opacity = '1'}
                                                                className="w-full bg-gray-800/70 p-2 rounded-md flex justify-between items-center cursor-grab active:cursor-grabbing hover:bg-gray-700/70 transition-colors"
                                                            >
                                                                <span className="text-gray-200">{item.name}</span>
                                                                <div className="text-right text-xs">
                                                                    <span className="text-yellow-400 font-semibold">{item.cost} gp</span>
                                                                    <span className="text-gray-400 ml-3">{item.weight > 0 ? `${item.weight} cn` : '-'}</span>
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Inventory */}
                    <div
                        className={`w-1/2 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed ${isDraggingOverInventory ? 'border-green-500 bg-green-900/20' : 'border-gray-700'} flex flex-col h-full transition-colors duration-200`}
                        onDragEnter={() => setIsDraggingOverInventory(true)}
                        onDragLeave={() => setIsDraggingOverInventory(false)}
                        onDragOver={e => { e.preventDefault(); setIsDraggingOverInventory(true); }}
                        onDrop={handleDropOnInventory}
                    >
                        <h3 className="text-xl font-bold text-gray-300 mb-3 text-center">Your Inventory <span className="text-sm font-normal text-green-400">(Drop items here to buy)</span></h3>
                        <div className="pr-2">
                            {mainKit && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-teal-300 border-b-2 border-teal-700/50 pb-1 mb-2">From {aggregatedData.EQUIPMENT_KITS.find(k=>k.id===mainKit.kitId)?.name ?? ''}</h4>
                                    <div className="space-y-1">
                                        {mainKitItems.map(({key, item, uniqueId}) => (
                                            <DraggableInventoryItem key={uniqueId} item={item} uniqueId={uniqueId} dragData={{source: 'kit', kitType: 'Main', itemKey: key}} className="bg-teal-900/50 p-2 rounded-md flex justify-between items-center cursor-grab active:cursor-grabbing hover:bg-teal-800/50 transition-colors">
                                                <span className="text-gray-200">{item.name}</span>
                                                <div className="text-right text-xs"><span className="text-yellow-400 font-semibold">{item.cost} gp</span></div>
                                            </DraggableInventoryItem>
                                        ))}
                                    </div>
                                </div>
                            )}
                             {specializedKit && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-teal-300 border-b-2 border-teal-700/50 pb-1 mb-2">From {aggregatedData.EQUIPMENT_KITS.find(k=>k.id===specializedKit.kitId)?.name ?? ''}</h4>
                                    <div className="space-y-1">
                                        {specializedKitItems.map(({key, item, uniqueId}) => (
                                            <DraggableInventoryItem key={uniqueId} item={item} uniqueId={uniqueId} dragData={{source: 'kit', kitType: 'Specialized', itemKey: key}} className="bg-teal-900/50 p-2 rounded-md flex justify-between items-center cursor-grab active:cursor-grabbing hover:bg-teal-800/50 transition-colors">
                                                <span className="text-gray-200">{item.name}</span>
                                                <div className="text-right text-xs"><span className="text-yellow-400 font-semibold">{item.cost} gp</span></div>
                                            </DraggableInventoryItem>
                                        ))}
                                    </div>
                                </div>
                            )}

                             <div className="mb-4">
                                <h4 className="font-bold text-sky-300 border-b-2 border-sky-700/50 pb-1 mb-2">Custom Items</h4>
                                {customItems.length === 0 ? (
                                    <p className="text-center text-gray-500 p-4">Drag items from the catalog to add them here.</p>
                                ) : (
                                    <div className="space-y-1">
                                        {customItems.map(customItem => {
                                            const item = aggregatedData.ITEMS[customItem.itemKey];
                                            if (!item) return null;
                                            return (
                                                <DraggableInventoryItem key={customItem.id} item={item} uniqueId={customItem.id} dragData={{source: 'custom', itemId: customItem.id}} className="bg-sky-900/50 p-2 rounded-md flex justify-between items-center cursor-grab active:cursor-grabbing hover:bg-sky-800/50 transition-colors">
                                                    <span className="text-gray-200">{item.name}</span>
                                                    <div className="text-right text-xs"><span className="text-yellow-400 font-semibold">{item.cost} gp</span></div>
                                                </DraggableInventoryItem>
                                            );
                                        })}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>

                <footer className="p-4 border-t border-gray-700 flex-shrink-0 text-right">
                    <button
                        onClick={onClose}
                        className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Done
                    </button>
                </footer>
            </div>
        </div>
    );
};
