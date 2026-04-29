import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = '/invoke';
const HISTORY_KEY = 'ai_battle_history';

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function useBattle() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  const submit = useCallback(async (e) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await axios.post(API_BASE, {
        input: trimmed,
      });

      const apiResult = data.result || data;

      const entry = {
        id: Date.now(),
        query: trimmed,
        result: apiResult,
        timestamp: new Date().toISOString(),
      };

      setResult(apiResult);
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 30);
        saveHistory(updated);
        return updated;
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [query]);

  const loadFromHistory = useCallback((entry) => {
    setQuery(entry.query);
    setResult(entry.result);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  return {
    query,
    setQuery,
    result,
    loading,
    error,
    history,
    submit,
    loadFromHistory,
    clearHistory,
  };
}
