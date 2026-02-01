
import { useCallback, useState } from 'react';
import type { ClassInfo, EquipmentKit, Race, Tab } from '../types';

export const useUIState = () => {
    const [activeTab, setActiveTab] = useState<Tab>('roll');
    const [completedTabs, setCompletedTabs] = useState<Set<Tab>>(new Set());
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [kitModalData, setKitModalData] = useState<EquipmentKit | null>(null);
    const [isCustomizingEquipment, setIsCustomizingEquipment] = useState(false);
    const [classInfoModalData, setClassInfoModalData] = useState<ClassInfo | null>(null);
    const [raceInfoModalData, setRaceInfoModalData] = useState<Race | null>(null);
    const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
    const [isBackstoryPromptModalVisible, setIsBackstoryPromptModalVisible] = useState(false);
    const [isNamePromptModalVisible, setIsNamePromptModalVisible] = useState(false);
    const [isTraitsPromptModalVisible, setIsTraitsPromptModalVisible] = useState(false);
    const [isLifeStandardPromptModalVisible, setIsLifeStandardPromptModalVisible] = useState(false);
    // FIX: Added state for the sources modal to make it available in the UI.
    const [isSourcesModalVisible, setIsSourcesModalVisible] = useState(false);

    const reset = useCallback(() => {
        setActiveTab('roll');
        setCompletedTabs(new Set());
    }, []);

    return {
        activeTab, setActiveTab,
        completedTabs, setCompletedTabs,
        toastMessage, setToastMessage,
        kitModalData, setKitModalData,
        isCustomizingEquipment, setIsCustomizingEquipment,
        classInfoModalData, setClassInfoModalData,
        raceInfoModalData, setRaceInfoModalData,
        isPromptModalVisible, setIsPromptModalVisible,
        isBackstoryPromptModalVisible, setIsBackstoryPromptModalVisible,
        isNamePromptModalVisible, setIsNamePromptModalVisible,
        isTraitsPromptModalVisible, setIsTraitsPromptModalVisible,
        isLifeStandardPromptModalVisible, setIsLifeStandardPromptModalVisible,
        isSourcesModalVisible, setIsSourcesModalVisible,
        reset,
    };
};
