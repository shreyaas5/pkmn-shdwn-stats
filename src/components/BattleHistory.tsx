import React from 'react';
import type { ReplayData } from '../types';
import './BattleHistory.css';

interface BattleHistoryProps {
  replays: ReplayData[];
}

export const BattleHistory: React.FC<BattleHistoryProps> = ({ replays }) => {
  if (replays.length === 0) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="battle-history-section animate-fade-in">
      <h2 className="section-title">Battle History</h2>
      <div className="battle-list">
        {replays.map((replay, idx) => (
          <div key={replay.id} className="battle-item glass-panel" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="battle-info">
              <span className="battle-format">{replay.format}</span>
              <span className="battle-date">{formatDate(replay.uploadtime)}</span>
            </div>
            
            <div className="battle-result">
              {replay.winner ? (
                <span className="winner-label">Winner: <strong>{replay.winner}</strong></span>
              ) : (
                <span className="winner-loading">Loading result...</span>
              )}
            </div>

            <a 
              href={`https://replay.pokemonshowdown.com/${replay.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-btn view-replay-btn"
            >
              Watch
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
