import React from 'react';

const EXAMPLES = [
  'Write a binary search algorithm in Python',
  'Implement a debounce function in JavaScript',
  'Build a rate limiter in Node.js',
  'Create a linked list with insert and delete in C++',
];

/**
 * Empty state shown before any query is submitted
 */
export default function EmptyState({ onExample }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
      {/* Icon */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-500/10 border border-violet-500/20 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        {/* Floating dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-500/40 animate-pulse" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-cyan-500/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Text */}
      <div className="text-center space-y-2 max-w-xs">
        <h2 className="text-[16px] font-semibold text-[#f1f0f9]">Ready to Battle</h2>
        <p className="text-[13px] text-[#4e4e72] leading-relaxed">
          Enter a coding challenge above to see two AI agents compete and get judged in real time.
        </p>
      </div>

      {/* Example prompts */}
      <div className="w-full max-w-md space-y-2">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4e4e72] text-center mb-3">
          Try an example
        </p>
        <div className="grid grid-cols-1 gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => onExample(ex)}
              className="
                w-full text-left text-[12px] text-[#9d9db8] px-4 py-2.5 rounded-xl
                bg-[#13131f] border border-[#1e1e30]
                hover:border-[#7c3aed]/40 hover:text-[#f1f0f9] hover:bg-[#1a1a2e]
                transition-all duration-200 cursor-pointer
                flex items-center gap-2 group
              "
            >
              <svg className="w-3 h-3 text-[#4e4e72] group-hover:text-[#7c3aed] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
