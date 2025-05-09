import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4 flex flex-col items-center text-center animate-fadeIn">
      <AlertTriangle className="text-red-400 mb-2" size={32} />
      <p className="text-white mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-md text-white"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;