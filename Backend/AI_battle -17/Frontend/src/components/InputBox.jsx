import React, { useRef, useEffect } from 'react';

/**
 * The query input box with animated submit button and keyboard shortcut support.
 */
export default function InputBox({ query, setQuery, onSubmit, loading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const charCount = query.length;
  const isReady = query.trim().length > 0 && !loading;

  return (
    <form onSubmit={onSubmit} className="relative group">
      {/* Outer glow ring on focus */}
      <div className="relative rounded-2xl bg-[#13131f] border border-[#1e1e30] transition-all duration-300 focus-within:border-[#7c3aed]/60 focus-within:shadow-[0_0_0_1px_rgba(124,58,237,0.2),0_0_20px_rgba(124,58,237,0.08)]">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="query-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask anything — e.g. 'Write a binary search in JavaScript'..."
          rows={1}
          className="
            w-full resize-none bg-transparent
            px-5 pt-4 pb-14
            text-[14px] text-[#f1f0f9] placeholder-[#4e4e72]
            rounded-2xl outline-none leading-relaxed
            disabled:opacity-50
            font-[Inter]
          "
          style={{ fontFamily: 'Inter, sans-serif' }}
        />

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-t border-[#1e1e30]/60 rounded-b-2xl">
          <div className="flex items-center gap-3">
            {/* Keyboard hint */}
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-[#4e4e72]">
              <kbd className="bg-[#0a0a0f] border border-[#1e1e30] rounded px-1.5 py-0.5 text-[9px] font-mono">↵</kbd>
              <span>to submit</span>
              <span className="mx-1 text-[#2d2d50]">·</span>
              <kbd className="bg-[#0a0a0f] border border-[#1e1e30] rounded px-1.5 py-0.5 text-[9px] font-mono">⇧↵</kbd>
              <span>new line</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Char count */}
            {charCount > 0 && (
              <span className="text-[10px] text-[#4e4e72] font-mono tabular-nums">
                {charCount}
              </span>
            )}

            {/* Submit button */}
            <button
              type="submit"
              id="submit-btn"
              disabled={!isReady}
              className={`
                flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[12px] font-medium
                transition-all duration-200 cursor-pointer
                ${isReady
                  ? 'bg-[#7c3aed] text-white hover:bg-[#6d28d9] hover:shadow-[0_0_14px_rgba(124,58,237,0.4)] active:scale-95'
                  : 'bg-[#1a1a2e] text-[#4e4e72] cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin-slow w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span>Running…</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Battle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
