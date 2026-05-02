import React from 'react';
import type { PlayerAnalytics, ShowdownUserData } from '../types';
import { Trophy, TrendingDown, Swords, Zap, Hash } from 'lucide-react';
import './AdvancedAnalytics.css';

interface AdvancedAnalyticsProps {
  analytics: PlayerAnalytics;
  user: ShowdownUserData;
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ analytics, user }) => {
  // Calculate Overall WL
  let totalWins = 0;
  let totalLosses = 0;
  Object.values(user.ratings).forEach((r: any) => {
    totalWins += r.w || 0;
    totalLosses += r.l || 0;
  });
  const wlRatio = totalWins + totalLosses > 0 
    ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1) 
    : '0.0';

  // Find Top Format
  const topFormat = Object.entries(user.ratings).sort(([, a]: any, [, b]: any) => (b.elo || 0) - (a.elo || 0))[0];

  return (
    <div className="advanced-analytics-grid animate-fade-in">
      <div className="analytics-card glass-panel highlight-streak">
        <div className="card-icon"><Zap size={24} /></div>
        <div className="card-data">
          <h3>Best Win Streak</h3>
          <p className="value">{analytics.highestWinStreak}</p>
          <span className="label">In Recent Games</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-luck">
        <div className="card-icon"><TrendingDown size={24} /></div>
        <div className="card-data">
          <h3>Bad Luck Mon</h3>
          <p className="value">{analytics.badLuckPokemon.name}</p>
          <span className="label">Lost {analytics.badLuckPokemon.count} matches with it</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-rival">
        <div className="card-icon"><Swords size={24} /></div>
        <div className="card-data">
          <h3>Common Rival</h3>
          <p className="value">{analytics.rival.username}</p>
          <span className="label">Faced {analytics.rival.count} times recently</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-wl">
        <div className="card-icon"><Hash size={24} /></div>
        <div className="card-data">
          <h3>Overall WL%</h3>
          <p className="value">{wlRatio}%</p>
          <span className="label">{totalWins}W - {totalLosses}L Total</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-rank">
        <div className="card-icon"><Trophy size={24} /></div>
        <div className="card-data">
          <h3>Top Elo</h3>
          <p className="value">{Math.round(topFormat?.[1]?.elo || 0)}</p>
          <span className="label">In {topFormat?.[0] || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};
