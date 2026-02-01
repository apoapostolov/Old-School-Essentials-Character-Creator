import React, { createContext, useContext } from 'react';
import type { useCharacter } from '../hooks/useCharacter'; // Import the return type

// Define the shape of the context value, which is the return type of our master hook
type CharacterContextType = ReturnType<typeof useCharacter> | null;

// Create the context with a default value of null
const CharacterContext = createContext<CharacterContextType>(null);

/**
 * A provider component that wraps the application, making the character state
 * available to any component down the tree.
 */
export const CharacterProvider: React.FC<{ character: NonNullable<CharacterContextType>, children: React.ReactNode }> = ({ character, children }) => {
    return (
        <CharacterContext.Provider value={character}>
            {children}
        </CharacterContext.Provider>
    );
};

/**
 * A custom hook to easily access the CharacterContext in consumer components.
 * This abstracts away the useContext call and provides type safety.
 */
export const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacterContext must be used within a CharacterProvider');
    }
    return context;
};
