import React from 'react';
import type { FormatRating } from '../types';
import { FormatCard } from './FormatCard';
import './StatsGrid.css';

interface StatsGridProps {
  ratings: Record<string, FormatRating>;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ ratings }) => {
  // Convert ratings object to array and sort by Elo descending
  const sortedFormats = Object.entries(ratings)
    .sort(([, a], [, b]) => b.elo - a.elo);

  if (sortedFormats.length === 0) {
    return (
      <div className="empty-state glass-panel">
        <p>This user hasn't played any rated battles yet.</p>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {sortedFormats.map(([formatName, rating], index) => (
        <FormatCard 
          key={formatName} 
          formatName={formatName} 
          rating={rating} 
          index={index}
        />
      ))}
    </div>
  );
};
