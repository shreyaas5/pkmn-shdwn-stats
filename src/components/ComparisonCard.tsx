import React from 'react';
import type { FormatRating } from '../types';
import './ComparisonCard.css';

interface ComparisonCardProps {
  formatName: string;
  rating1: FormatRating;
  rating2: FormatRating;
  index: number;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  formatName, 
  rating1, 
  rating2,
  index 
}) => {
  const formatTitle = formatName
    .replace(/^gen(\d)/, 'Gen $1 ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());

  const elo1 = Math.round(rating1.elo);
  const elo2 = Math.round(rating2.elo);
  const isP1EloWinner = elo1 > elo2;
  const isP2EloWinner = elo2 > elo1;

  const gxe1 = rating1.gxe ? Math.round(rating1.gxe * 10) / 10 : 0;
  const gxe2 = rating2.gxe ? Math.round(rating2.gxe * 10) / 10 : 0;

  return (
    <div 
      className="glass-panel format-card comparison-card animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header text-center">
        <h3>{formatTitle}</h3>
      </div>
      
      <div className="comparison-stats">
        {/* Player 1 Stats */}
        <div className="p-stats p1-stats">
          <div className="stat-box">
            <span className="stat-label">Elo</span>
            <span className={`stat-value ${isP1EloWinner ? 'winner-elo p1-winner' : 'loser-elo'}`}>
              {elo1}
            </span>
          </div>
          <div className="stat-box">
            <span className="stat-label">GXE</span>
            <span className={`stat-value ${gxe1 > gxe2 ? 'winner-gxe' : ''}`}>
              {gxe1}%
            </span>
          </div>
        </div>

        <div className="divider" />

        {/* Player 2 Stats */}
        <div className="p-stats p2-stats">
          <div className="stat-box">
            <span className="stat-label">Elo</span>
            <span className={`stat-value ${isP2EloWinner ? 'winner-elo p2-winner' : 'loser-elo'}`}>
              {elo2}
            </span>
          </div>
          <div className="stat-box">
            <span className="stat-label">GXE</span>
            <span className={`stat-value ${gxe2 > gxe1 ? 'winner-gxe' : ''}`}>
              {gxe2}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
