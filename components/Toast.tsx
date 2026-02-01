import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow time for fade-out animation before clearing the message
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-red-800 border border-red-600 text-white px-6 py-3 rounded-lg shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};
