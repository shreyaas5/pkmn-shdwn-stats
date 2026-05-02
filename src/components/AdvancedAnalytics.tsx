import React from 'react';
import type { PlayerAnalytics, ShowdownUserData } from '../types';
import { Trophy, Ghost, Swords, Zap, Hash } from 'lucide-react';
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

  const getSpriteUrl = (name: string) => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://play.pokemonshowdown.com/sprites/ani/${cleanName}.gif`;
  };

  return (
    <div className="advanced-analytics-grid animate-fade-in">
      <div className="analytics-card glass-panel highlight-streak">
        <div className="card-icon"><Zap size={24} /></div>
        <div className="card-data">
          <h3>Peak Momentum</h3>
          <p className="value">{analytics.highestWinStreak} Streak</p>
          <span className="label">Best Run Detected</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-luck cursed-card">
        <div className="card-icon"><Ghost size={24} /></div>
        <div className="card-data">
          <h3>The Cursed Partner</h3>
          <div className="cursed-mon">
            {analytics.badLuckPokemon.name !== 'None' && (
              <img src={getSpriteUrl(analytics.badLuckPokemon.name)} alt={analytics.badLuckPokemon.name} className="cursed-sprite" />
            )}
            <div>
              <p className="value">{analytics.badLuckPokemon.name}</p>
              <span className="label">Lost {analytics.badLuckPokemon.count} matches together</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-rival">
        <div className="card-icon"><Swords size={24} /></div>
        <div className="card-data">
          <h3>Arch Rival</h3>
          <p className="value">{analytics.rival.count > 1 ? analytics.rival.username : 'None'}</p>
          <span className="label">
            {analytics.rival.count > 1 
              ? `Faced ${analytics.rival.count} times recently` 
              : 'No repeat opponents found'}
          </span>
        </div>
      </div>


      <div className="analytics-card glass-panel highlight-wl">
        <div className="card-icon"><Hash size={24} /></div>
        <div className="card-data">
          <h3>Master WL%</h3>
          <p className="value">{wlRatio}%</p>
          <span className="label">{totalWins}W - {totalLosses}L Lifetime</span>
        </div>
      </div>

      <div className="analytics-card glass-panel highlight-rank">
        <div className="card-icon"><Trophy size={24} /></div>
        <div className="card-data">
          <h3>Top Prestige</h3>
          <p className="value">{Math.round(topFormat?.[1]?.elo || 0)}</p>
          <span className="label">Peak Elo in {topFormat?.[0] || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};
