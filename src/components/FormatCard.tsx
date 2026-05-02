import React from 'react';
import type { FormatRating } from '../types';
import './FormatCard.css';

interface FormatCardProps {
  formatName: string;
  rating: FormatRating;
  index: number;
}

export const FormatCard: React.FC<FormatCardProps> = ({ formatName, rating, index }) => {
  // Parse format name (e.g., 'gen9randombattle' -> 'Gen 9 Random Battle')
  const formatTitle = formatName
    .replace(/^gen(\d)/, 'Gen $1 ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());

  const winRate = rating.w + rating.l > 0 
    ? ((rating.w / (rating.w + rating.l)) * 100).toFixed(1) 
    : '0.0';

  const gxe = rating.gxe ? Math.round(rating.gxe * 10) / 10 : 0;

  return (
    <div 
      className="glass-panel format-card animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <h3>{formatTitle}</h3>
      </div>
      
      <div className="stats-container">
        <div className="stat-box main-stat">
          <span className="stat-label">Elo</span>
          <span className="stat-value elo-value">{Math.round(rating.elo)}</span>
        </div>
        
        <div className="stat-box">
          <span className="stat-label">GXE</span>
          <span className="stat-value">{gxe}%</span>
        </div>
      </div>

      <div className="record-container">
        <div className="record-bar-wrapper">
          <div 
            className="record-bar win-bar" 
            style={{ width: `${winRate}%` }}
          />
        </div>
        <div className="record-text">
          <span className="wins">{rating.w} W</span>
          <span className="losses">{rating.l} L</span>
          <span className="win-rate">({winRate}%)</span>
        </div>
      </div>
    </div>
  );
};
