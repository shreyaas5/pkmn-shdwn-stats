import React from 'react';
import type { ShowdownUserData, ReplayData } from '../types';
import { ComparisonCard } from './ComparisonCard';
import { HeadToHeadScore } from './HeadToHeadScore';
import { BattleHistory } from './BattleHistory';
import './ComparisonGrid.css';

interface ComparisonGridProps {
  user1: ShowdownUserData;
  user2: ShowdownUserData;
  replays: ReplayData[];
}

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({ user1, user2, replays }) => {
  // Find formats that both players have played
  const commonFormats = Object.keys(user1.ratings).filter(
    format => user2.ratings[format] !== undefined
  );

  // Sort by User 1's Elo for consistency
  commonFormats.sort((a, b) => user1.ratings[b].elo - user1.ratings[a].elo);

  return (
    <div className="comparison-container">
      {/* Score Summary */}
      <HeadToHeadScore 
        user1={user1.username} 
        user2={user2.username} 
        replays={replays} 
      />

      <div className="comparison-header">
        <h2 className="player-name p1-name">{user1.username}</h2>
        <span className="vs-text">VS</span>
        <h2 className="player-name p2-name">{user2.username}</h2>
      </div>
      
      <div className="stats-grid comparison-grid">
        {commonFormats.length > 0 ? (
          commonFormats.map((formatName, index) => (
            <ComparisonCard
              key={formatName}
              formatName={formatName}
              rating1={user1.ratings[formatName]}
              rating2={user2.ratings[formatName]}
              index={index}
            />
          ))
        ) : (
          <div className="empty-state glass-panel" style={{ gridColumn: '1 / -1' }}>
            <p>No common rated formats found between these users.</p>
          </div>
        )}
      </div>

      {/* Battle History Section */}
      <BattleHistory replays={replays} />
    </div>
  );
};
