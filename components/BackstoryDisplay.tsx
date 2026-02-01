import React from 'react';

interface BackstoryDisplayProps {
  text: string;
}

export const BackstoryDisplay: React.FC<BackstoryDisplayProps> = ({ text }) => {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== '');

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 max-h-[60vh] overflow-y-auto text-gray-300 leading-relaxed">
      {paragraphs.map((p, index) => (
        <p key={index} className="mb-4">{p}</p>
      ))}
    </div>
  );
};
