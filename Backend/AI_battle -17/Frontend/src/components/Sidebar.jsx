import React from 'react';

/**
 * Sidebar showing query history. Clicking an entry reloads past results.
 */
export default function Sidebar({ history, onSelect, onClear, activeQuery }) {
  return (
    <aside className="flex flex-col h-full w-64 shrink-0 bg-[#0f0f1a] border-r border-[#1e1e30]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1e1e30]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#4e4e72]">
            History
          </span>
          {history.length > 0 && (
            <span className="text-[10px] bg-[#1a1a2e] text-[#9d9db8] px-1.5 py-0.5 rounded-full font-mono">
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] text-[#4e4e72] hover:text-[#f43f5e] transition-colors duration-200 cursor-pointer"
            aria-label="Clear history"
          >
            Clear
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-16">
            <div className="w-10 h-10 rounded-xl bg-[#13131f] border border-[#1e1e30] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4e4e72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-[11px] text-[#4e4e72] text-center leading-relaxed px-2">
              Your queries will<br />appear here
            </p>
          </div>
        ) : (
          history.map((entry, idx) => {
            const isActive = entry.query === activeQuery;
            return (
              <button
                key={entry.id}
                onClick={() => onSelect(entry)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-lg text-[12px] leading-snug
                  transition-all duration-200 cursor-pointer group
                  ${isActive
                    ? 'bg-[#1a1a2e] text-[#f1f0f9] border border-[#2d2d50]'
                    : 'text-[#9d9db8] hover:bg-[#13131f] hover:text-[#f1f0f9] border border-transparent'
                  }
                `}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <div className="flex items-start gap-2">
                  <svg
                    className={`w-3 h-3 mt-0.5 shrink-0 transition-colors ${isActive ? 'text-[#7c3aed]' : 'text-[#4e4e72] group-hover:text-[#7c3aed]'}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span className="line-clamp-2">{entry.query}</span>
                </div>
                <div className="mt-1 text-[10px] text-[#4e4e72] pl-5">
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer branding */}
      <div className="px-4 py-3 border-t border-[#1e1e30]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-[11px] text-[#4e4e72] font-medium">AI Battle</span>
        </div>
      </div>
    </aside>
  );
}
