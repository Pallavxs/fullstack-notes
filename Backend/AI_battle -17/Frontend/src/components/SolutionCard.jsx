import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SOLUTION_CONFIG = {
  1: {
    label: 'Solution 1',
    tag: 'AI-A',
    accentClass: 'text-[#7c3aed]',
    borderClass: 'border-[#7c3aed]/30',
    bgClass: 'bg-[#7c3aed]/5',
    glowClass: 'hover:shadow-[0_0_28px_rgba(124,58,237,0.12)]',
    dotClass: 'bg-[#7c3aed]',
    badgeBg: 'bg-[#7c3aed]/10',
  },
  2: {
    label: 'Solution 2',
    tag: 'AI-B',
    accentClass: 'text-[#06b6d4]',
    borderClass: 'border-[#06b6d4]/30',
    bgClass: 'bg-[#06b6d4]/5',
    glowClass: 'hover:shadow-[0_0_28px_rgba(6,182,212,0.12)]',
    dotClass: 'bg-[#06b6d4]',
    badgeBg: 'bg-[#06b6d4]/10',
  },
};

/**
 * Renders a single AI solution with markdown, code highlighting, and copy capability.
 */
export default function SolutionCard({ num, content, isWinner }) {
  const cfg = SOLUTION_CONFIG[num] || SOLUTION_CONFIG[1];
  const cardRef = useRef(null);

  // Animate in
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return () => cancelAnimationFrame(raf);
  }, [content]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
  };

  const displayContent =
    typeof content === 'string'
      ? content
      : content?.content || content?.text || JSON.stringify(content, null, 2);

  return (
    <div
      ref={cardRef}
      className={`
        relative flex flex-col rounded-2xl border bg-[#13131f]
        transition-all duration-300 overflow-hidden
        ${cfg.borderClass} ${cfg.glowClass}
        ${isWinner ? 'ring-1 ring-offset-0 ring-offset-transparent' : ''}
      `}
      style={isWinner ? { '--tw-ring-color': num === 1 ? 'rgba(124,58,237,0.4)' : 'rgba(6,182,212,0.4)' } : {}}
    >
      {/* Winner ribbon */}
      {isWinner && (
        <div className={`absolute top-0 right-0 ${cfg.bgClass} ${cfg.accentClass} text-[10px] font-semibold px-3 py-1 rounded-bl-xl flex items-center gap-1`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Winner
        </div>
      )}

      {/* Card header */}
      <div className={`flex items-center justify-between px-5 py-3.5 border-b ${cfg.borderClass}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
          <span className={`text-[13px] font-semibold ${cfg.accentClass}`}>{cfg.label}</span>
          <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md ${cfg.badgeBg} ${cfg.accentClass}`}>
            {cfg.tag}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          title="Copy to clipboard"
          className="p-1.5 rounded-lg text-[#4e4e72] hover:text-[#f1f0f9] hover:bg-[#1a1a2e] transition-all duration-150 cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 max-h-[500px]">
        <div className="prose prose-sm max-w-none text-[13px] leading-relaxed text-[#c4c4e8] solution-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
