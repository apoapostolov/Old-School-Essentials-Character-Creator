import React from 'react';
import { MaleIcon } from '../icons/MaleIcon';
import { FemaleIcon } from '../icons/FemaleIcon';

interface GenderSelectorProps {
    gender: 'male' | 'female' | null;
    onGenderChange: (gender: 'male' | 'female' | null) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ gender, onGenderChange }) => {
    const handleGenderSelect = (selectedGender: 'male' | 'female') => {
        onGenderChange(gender === selectedGender ? null : selectedGender);
    };

    return (
        <div className="flex gap-4">
             <button
                onClick={() => handleGenderSelect('male')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    gender === 'male' ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-400/50 text-sky-300' : 'bg-gray-800/50 border-gray-600 hover:border-sky-500'
                }`}
            >
                <MaleIcon className="h-6 w-6" />
                <span className="font-bold">Male</span>
            </button>
             <button
                onClick={() => handleGenderSelect('female')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    gender === 'female' ? 'bg-pink-500/20 border-pink-400 ring-2 ring-pink-400/50 text-pink-300' : 'bg-gray-800/50 border-gray-600 hover:border-pink-500'
                }`}
            >
                <FemaleIcon className="h-6 w-6" />
                <span className="font-bold">Female</span>
            </button>
        </div>
    );
};
