import React from 'react';

interface ManualAbilityScoreWarningModalProps {
  onProceed: () => void;
  onClose: () => void;
}

export const ManualAbilityScoreWarningModal: React.FC<ManualAbilityScoreWarningModalProps> = ({ onProceed, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 border-2 border-yellow-600 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b-2 border-yellow-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-yellow-400">⚠️ DM Approval Required</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
            <p className="text-gray-200 text-lg leading-relaxed">
              <strong className="text-red-400">Warning:</strong> You are about to be granted the right to enter any ability scores manually.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
            <p className="text-gray-300 text-base leading-relaxed">
              This feature should <strong className="text-yellow-400">only be used after receiving explicit approval from your Dungeon Master</strong> to enter previously rolled results from physical dice or another instance use of this character creator the DM is aware of.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Using this feature without DM approval is <strong className="text-red-400">cheating</strong> and goes against the principles of old school roleplaying. It is disrespectful to your DM and fellow players.
            </p>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
            <p className="text-yellow-200 text-sm italic">
              "With great power comes great responsibility. Use this feature honorably." — Every DM, everywhere
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t-2 border-gray-700 p-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors"
          >
            I Have DM Approval - Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
