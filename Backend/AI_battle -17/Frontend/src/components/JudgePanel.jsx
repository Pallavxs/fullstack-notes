import React, { useEffect, useRef } from 'react';

/**
 * Animated score meter bar
 */
function ScoreBar({ score, color }) {
  const pct = Math.max(0, Math.min(10, score ?? 0)) * 10;
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = '0%';
    const t = setTimeout(() => {
      el.style.transition = 'width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.width = pct + '%';
    }, 200);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="relative h-2 rounded-full bg-[#1a1a2e] overflow-hidden">
      <div
        ref={barRef}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: color, width: '0%' }}
      />
    </div>
  );
}

/**
 * Single solution judge panel
 */
function JudgeEntry({ num, label, tag, score, reasoning, accentColor, barColor, badgeBg, isWinner }) {
  const scoreVal = score ?? 0;
  const scoreDisplay = typeof scoreVal === 'number' ? scoreVal.toFixed(1) : scoreVal;

  return (
    <div className={`rounded-xl border p-4 space-y-3 transition-all duration-300 ${isWinner ? 'bg-[#13131f] border-[#2d2d50]' : 'bg-[#0f0f1a] border-[#1e1e30]'}`}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          <span className="text-[12px] font-semibold" style={{ color: accentColor }}>{label}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md" style={{ background: badgeBg, color: accentColor }}>{tag}</span>
          {isWinner && (
            <span className="text-[10px] font-semibold text-[#10b981] flex items-center gap-0.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Best
            </span>
          )}
        </div>
        {/* Score circle */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-[22px] font-bold tabular-nums" style={{ color: accentColor }}>{scoreDisplay}</span>
          <span className="text-[11px] text-[#4e4e72]">/10</span>
        </div>
      </div>

      {/* Bar */}
      <ScoreBar score={scoreVal} color={barColor} />

      {/* Reasoning */}
      {reasoning && (
        <p className="text-[12px] text-[#9d9db8] leading-relaxed pt-0.5">
          {reasoning}
        </p>
      )}
    </div>
  );
}

/**
 * JudgePanel component showing scores, reasoning, and winner for both solutions.
 */
export default function JudgePanel({ judgeData }) {
  if (!judgeData) return null;

  // Normalize judge data — handle various possible shapes
  const score1 =
    judgeData?.solution_1_score ?? judgeData?.scores?.solution_1 ?? judgeData?.score_1 ?? null;
  const score2 =
    judgeData?.solution_2_score ?? judgeData?.scores?.solution_2 ?? judgeData?.score_2 ?? null;
  const reason1 =
    judgeData?.solution_1_reasoning ?? judgeData?.reasoning?.solution_1 ?? judgeData?.reason_1 ?? '';
  const reason2 =
    judgeData?.solution_2_reasoning ?? judgeData?.reasoning?.solution_2 ?? judgeData?.reason_2 ?? '';
  const recommendation =
    judgeData?.recommendation ?? judgeData?.winner ?? judgeData?.best ?? '';

  const winner =
    score1 !== null && score2 !== null
      ? score1 >= score2 ? 1 : 2
      : null;

  const overallText =
    typeof recommendation === 'string'
      ? recommendation
      : recommendation?.reasoning || recommendation?.note || '';

  return (
    <div className="rounded-2xl border border-[#1e1e30] bg-[#0f0f1a] overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#1e1e30] bg-[#13131f]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <span className="text-[13px] font-semibold text-[#f1f0f9]">Judge Panel</span>
          <p className="text-[10px] text-[#4e4e72] mt-0">AI-powered evaluation</p>
        </div>
        {winner && (
          <div className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-2.5 py-1 rounded-full">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Solution {winner} wins
          </div>
        )}
      </div>

      {/* Scores */}
      <div className="p-4 space-y-3">
        <JudgeEntry
          num={1}
          label="Solution 1"
          tag="AI-A"
          score={score1}
          reasoning={reason1}
          accentColor="#8b5cf6"
          barColor="linear-gradient(90deg, #7c3aed, #a78bfa)"
          badgeBg="rgba(124,58,237,0.1)"
          isWinner={winner === 1}
        />
        <JudgeEntry
          num={2}
          label="Solution 2"
          tag="AI-B"
          score={score2}
          reasoning={reason2}
          accentColor="#06b6d4"
          barColor="linear-gradient(90deg, #0891b2, #22d3ee)"
          badgeBg="rgba(6,182,212,0.1)"
          isWinner={winner === 2}
        />

        {/* Overall recommendation */}
        {overallText && (
          <div className="mt-2 rounded-xl bg-[#13131f] border border-[#1e1e30] px-4 py-3">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4e4e72] mb-1.5">
              Recommendation
            </p>
            <p className="text-[12px] text-[#9d9db8] leading-relaxed">{overallText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
