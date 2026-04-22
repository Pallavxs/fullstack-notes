import React from 'react';

/**
 * Skeleton loader shown during API fetch
 */
function SkeletonBlock({ h = 'h-4', w = 'w-full' }) {
  return <div className={`skeleton rounded ${h} ${w}`} />;
}

function SolutionSkeleton({ accent }) {
  return (
    <div className="rounded-2xl border border-[#1e1e30] bg-[#13131f] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e1e30]">
        <div className="w-1.5 h-1.5 rounded-full skeleton" style={{ background: accent, opacity: 0.5 }} />
        <SkeletonBlock h="h-3" w="w-20" />
      </div>
      <div className="px-5 py-4 space-y-3">
        <SkeletonBlock h="h-3" w="w-full" />
        <SkeletonBlock h="h-3" w="w-5/6" />
        <SkeletonBlock h="h-24" w="w-full" />
        <SkeletonBlock h="h-3" w="w-3/4" />
        <SkeletonBlock h="h-3" w="w-4/5" />
        <SkeletonBlock h="h-3" w="w-2/3" />
      </div>
    </div>
  );
}

function JudgeSkeleton() {
  return (
    <div className="rounded-2xl border border-[#1e1e30] bg-[#0f0f1a] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[#1e1e30] bg-[#13131f] flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg skeleton" />
        <div className="space-y-1.5">
          <SkeletonBlock h="h-3" w="w-24" />
          <SkeletonBlock h="h-2" w="w-16" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-[#1e1e30] bg-[#13131f] p-4 space-y-3">
            <div className="flex justify-between items-center">
              <SkeletonBlock h="h-3" w="w-24" />
              <SkeletonBlock h="h-6" w="w-12" />
            </div>
            <SkeletonBlock h="h-2" w="w-full" />
            <SkeletonBlock h="h-3" w="w-5/6" />
            <SkeletonBlock h="h-3" w="w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Full loading skeleton for results section
 */
export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status bar */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#13131f] border border-[#1e1e30] w-fit">
        <svg className="animate-spin-slow w-3.5 h-3.5 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <span className="text-[12px] text-[#9d9db8]">Generating solutions…</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
      </div>

      {/* Solution skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SolutionSkeleton accent="#7c3aed" />
        <SolutionSkeleton accent="#06b6d4" />
      </div>

      {/* Judge skeleton */}
      <JudgeSkeleton />
    </div>
  );
}
