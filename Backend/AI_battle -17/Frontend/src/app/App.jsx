import React, { useState } from 'react';
import { useBattle } from '../hooks/useBattle.js';
import Sidebar from '../components/Sidebar.jsx';
import InputBox from '../components/InputBox.jsx';
import SolutionCard from '../components/SolutionCard.jsx';
import JudgePanel from '../components/JudgePanel.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function App() {
  const {
    query,
    setQuery,
    result,
    loading,
    error,
    history,
    submit,
    loadFromHistory,
    clearHistory,
  } = useBattle();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Normalize result into { solution_1, solution_2, judge }
  const solution1 =
    result?.solution_1 ?? result?.solutions?.[0] ?? result?.output_1 ?? null;
  const solution2 =
    result?.solution_2 ?? result?.solutions?.[1] ?? result?.output_2 ?? null;
  const judgeData =
    result?.judge_recommendation ?? result?.judge ?? result?.evaluation ?? null;

  // Determine winner for card highlighting
  const score1 =
    judgeData?.solution_1_score ?? judgeData?.scores?.solution_1 ?? null;
  const score2 =
    judgeData?.solution_2_score ?? judgeData?.scores?.solution_2 ?? null;
  const winner =
    score1 !== null && score2 !== null
      ? score1 >= score2 ? 1 : 2
      : null;

  const handleExample = (ex) => {
    setQuery(ex);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          history={history}
          onSelect={loadFromHistory}
          onClear={clearHistory}
          activeQuery={query}
        />
      )}

      {/* Main panel */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top navbar */}
        <header className="flex items-center gap-3 px-5 py-3 border-b border-[#1e1e30] bg-[#0a0a0f] shrink-0">
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            id="sidebar-toggle"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#4e4e72] hover:text-[#f1f0f9] hover:bg-[#13131f] transition-all duration-150 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo / title */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shrink-0">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="text-[14px] font-semibold text-[#f1f0f9] tracking-tight">
              AI Battle
            </span>
            <span className="hidden sm:inline text-[10px] text-[#4e4e72] font-medium px-2 py-0.5 bg-[#13131f] border border-[#1e1e30] rounded-full">
              Beta
            </span>
          </div>

          {/* Status pill (right) */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[11px] text-[#4e4e72]">Ready</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 py-6 space-y-6">
            {/* Input box */}
            <section>
              <InputBox
                query={query}
                setQuery={setQuery}
                onSubmit={submit}
                loading={loading}
              />
            </section>

            {/* Results area */}
            <section>
              {loading && <LoadingSkeleton />}

              {!loading && error && (
                <ErrorBanner
                  message={error}
                  onRetry={() => submit()}
                />
              )}

              {!loading && !error && !result && (
                <EmptyState onExample={handleExample} />
              )}

              {!loading && !error && result && (
                <div className="space-y-5 animate-fade-in-up">
                  {/* Query echo */}
                  <div className="flex items-center gap-2 px-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4e4e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="text-[12px] text-[#4e4e72] truncate max-w-lg" title={query}>{query}</span>
                  </div>

                  {/* Solutions grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {solution1 && (
                      <SolutionCard num={1} content={solution1} isWinner={winner === 1} />
                    )}
                    {solution2 && (
                      <SolutionCard num={2} content={solution2} isWinner={winner === 2} />
                    )}
                    {!solution1 && !solution2 && (
                      <div className="col-span-2 rounded-2xl border border-[#1e1e30] bg-[#13131f] p-8 text-center">
                        <p className="text-[13px] text-[#4e4e72]">
                          Received a response but couldn't parse solutions. Raw output below.
                        </p>
                        <pre className="mt-4 text-[11px] text-[#9d9db8] text-left overflow-x-auto max-h-64">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Judge panel */}
                  {judgeData && (
                    <JudgePanel judgeData={judgeData} />
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
