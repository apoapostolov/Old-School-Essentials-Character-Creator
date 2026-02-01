import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BackstoryDisplayProps {
  text: string;
}

export const BackstoryDisplay: React.FC<BackstoryDisplayProps> = ({ text }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 max-h-[60vh] overflow-y-auto text-gray-300 leading-relaxed">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-gray-100">{children}</strong>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
