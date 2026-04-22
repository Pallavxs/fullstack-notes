import React from 'react';

/**
 * Error banner with icon and optional retry callback
 */
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-start gap-3 px-4 py-4 rounded-2xl bg-[#f43f5e]/5 border border-[#f43f5e]/20 animate-fade-in-up">
      <div className="w-8 h-8 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#f43f5e] mb-0.5">Request Failed</p>
        <p className="text-[12px] text-[#9d9db8] break-words leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 text-[11px] font-medium text-[#f43f5e] hover:text-white border border-[#f43f5e]/30 hover:border-[#f43f5e]/60 hover:bg-[#f43f5e]/10 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
