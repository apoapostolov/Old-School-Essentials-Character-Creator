import { useState, useCallback, useMemo } from 'react';
// FIX: Moved AggregatedData import to its correct source file, `useAggregatedData.ts`, to resolve the module not found error.
import type { EquipmentKit, CustomItem, SelectedKit } from '../types';
import type { AggregatedData } from './useAggregatedData';

export const useEquipment = (moneyResultTotal: number, showToast: (msg: string) => void, aggregatedData: AggregatedData) => {
    const [selectedMainKit, setSelectedMainKit] = useState<SelectedKit>(null);
    const [selectedSpecializedKit, setSelectedSpecializedKit] = useState<SelectedKit>(null);
    const [customItems, setCustomItems] = useState<CustomItem[]>([]);
    
    const equipmentCost = useMemo(() => {
        const kitCost = (selectedMainKit?.cost ?? 0) + (selectedSpecializedKit?.cost ?? 0);
        const customItemsCost = customItems.reduce((total, customItem) => total + (aggregatedData.ITEMS[customItem.itemKey]?.cost ?? 0), 0);
        return kitCost + customItemsCost;
    }, [selectedMainKit, selectedSpecializedKit, customItems, aggregatedData.ITEMS]);

    const equipmentWeight = useMemo(() => {
        const mainKitItems = selectedMainKit?.items ?? [];
        const specializedKitItems = selectedSpecializedKit?.items ?? [];
        const customItemKeys = customItems.map(ci => ci.itemKey);
        const allItemKeys = [...mainKitItems, ...specializedKitItems, ...customItemKeys];

        if (allItemKeys.length === 0) return 0;

        let totalWeight = 0;
        // First, add the explicit weight of all items (e.g., weapons, armor).
        // Gear items typically have 0 weight, relying on the flat 80cn.
        for (const itemKey of allItemKeys) {
            const item = aggregatedData.ITEMS[itemKey];
            if (item && item.weight > 0) {
                totalWeight += item.weight;
            }
        }

        // Add the flat 80cn for a backpack/gear ONLY if a specialized kit is taken
        // OR if custom 'stowed' gear is added. Gear from a martial kit alone is considered
        // part of the base loadout and doesn't trigger this weight.
        const hasSpecializedKit = selectedSpecializedKit !== null;
        
        const hasCustomStowedGear = customItems.some(ci => {
            const item = aggregatedData.ITEMS[ci.itemKey];
            return item?.category === 'Gear' && item?.carry_type === 'stowed';
        });

        if (hasSpecializedKit || hasCustomStowedGear) {
            totalWeight += 80;
        }

        return totalWeight;
    }, [selectedMainKit, selectedSpecializedKit, customItems, aggregatedData.ITEMS]);

    const finalMoney = useMemo(() => moneyResultTotal - equipmentCost, [moneyResultTotal, equipmentCost]);

    const handleSelectKit = useCallback((kit: EquipmentKit, variantName: string) => {
        const variant = kit.variants.find(v => v.name === variantName);
        if (!variant) return;

        const newKitSelection: SelectedKit = { kitId: kit.id, variantName, cost: variant.cost, items: [...variant.items] };
        
        let otherKitCost = kit.type === 'Martial' ? (selectedSpecializedKit?.cost ?? 0) : (selectedMainKit?.cost ?? 0);
        const currentCustomItemsCost = customItems.reduce((total, ci) => total + (aggregatedData.ITEMS[ci.itemKey]?.cost ?? 0), 0);
        
        if (moneyResultTotal < variant.cost + otherKitCost + currentCustomItemsCost) {
            showToast("You cannot afford this equipment kit.");
            return;
        }
        
        if (kit.type === 'Martial') {
            setSelectedMainKit(prev => (prev?.kitId === kit.id && prev?.variantName === variantName) ? null : newKitSelection);
        } else { // Specialized
            setSelectedSpecializedKit(prev => (prev?.kitId === kit.id && prev?.variantName === variantName) ? null : newKitSelection);
        }
    }, [moneyResultTotal, customItems, selectedMainKit, selectedSpecializedKit, showToast, aggregatedData.ITEMS]);

    const handleAddCustomItem = useCallback((itemKey: string) => {
        const item = aggregatedData.ITEMS[itemKey];
        if (!item) return;
        if (finalMoney < item.cost) {
            showToast("You cannot afford this item.");
            return;
        }
        setCustomItems(prev => [...prev, { id: `${itemKey}-${Date.now()}`, itemKey }]);
    }, [finalMoney, showToast, aggregatedData.ITEMS]);

    const handleRemoveCustomItem = useCallback((itemId: string) => {
        setCustomItems(prev => prev.filter(item => item.id !== itemId));
    }, []);

    const handleRemoveKitItem = useCallback((kitType: 'Main' | 'Specialized', itemKeyToRemove: string) => {
        const kitToUpdate = kitType === 'Main' ? selectedMainKit : selectedSpecializedKit;
        const setKit = kitType === 'Main' ? setSelectedMainKit : setSelectedSpecializedKit;
        if (!kitToUpdate) return;
        
        const currentItems = [...kitToUpdate.items];
        const indexToRemove = currentItems.findIndex(key => key === itemKeyToRemove);
        if (indexToRemove === -1) return;
        currentItems.splice(indexToRemove, 1);

        const newCost = currentItems.reduce((total, key) => total + (aggregatedData.ITEMS[key]?.cost ?? 0), 0);
        setKit({ ...kitToUpdate, items: currentItems, cost: newCost });
    }, [selectedMainKit, selectedSpecializedKit, aggregatedData.ITEMS]);

    const reset = useCallback(() => {
        setSelectedMainKit(null);
        setSelectedSpecializedKit(null);
        setCustomItems([]);
    }, []);

    const restoreState = useCallback((state: {
        selectedMainKit?: SelectedKit | null;
        selectedSpecializedKit?: SelectedKit | null;
        customItems?: CustomItem[];
    }) => {
        setSelectedMainKit(state.selectedMainKit ?? null);
        setSelectedSpecializedKit(state.selectedSpecializedKit ?? null);
        setCustomItems(state.customItems ?? []);
    }, []);

    const allItemKeys = useMemo(() => [
        ...(selectedMainKit?.items ?? []),
        ...(selectedSpecializedKit?.items ?? []),
        ...customItems.map(ci => ci.itemKey),
    ], [selectedMainKit, selectedSpecializedKit, customItems]);

    return {
        selectedMainKit, selectedSpecializedKit, customItems,
        equipmentCost, equipmentWeight, finalMoney, allItemKeys,
        handleSelectKit, handleAddCustomItem, handleRemoveCustomItem, handleRemoveKitItem,
        reset,
        restoreState
    };
};
