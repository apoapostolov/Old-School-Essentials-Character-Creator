import React from 'react';

interface PromptInfoModalProps {
  prompt: string;
  onClose: () => void;
  title: string;
}

export const PromptInfoModal: React.FC<PromptInfoModalProps> = ({ prompt, onClose, title }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
    >
      <div
        className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="prompt-modal-title" className="text-2xl font-bold text-yellow-400">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <p className="text-gray-400 mb-4">This is the exact text prompt that will be sent to the AI to generate the content.</p>
          <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-gray-300 whitespace-pre-wrap font-sans text-sm">
            {prompt}
          </pre>
        </div>
      </div>
    </div>
  );
};