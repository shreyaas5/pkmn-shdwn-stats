import React from 'react';
import type { ReplayData } from '../types';
import './HeadToHeadScore.css';

interface HeadToHeadScoreProps {
  user1: string;
  user2: string;
  replays: ReplayData[];
}

export const HeadToHeadScore: React.FC<HeadToHeadScoreProps> = ({ user1, user2, replays }) => {
  const wins1 = replays.filter(r => r.winner?.toLowerCase() === user1.toLowerCase()).length;
  const wins2 = replays.filter(r => r.winner?.toLowerCase() === user2.toLowerCase()).length;
  
  const totalWithWinner = replays.filter(r => r.winner).length;

  return (
    <div className="score-summary animate-fade-in">
      <div className="score-container">
        <div className="player-score">
          <span className="score-val">{wins1}</span>
          <span className="score-name">{user1}</span>
        </div>
        <div className="score-divider">VS</div>
        <div className="player-score">
          <span className="score-name">{user2}</span>
          <span className="score-val">{wins2}</span>
        </div>
      </div>
      {totalWithWinner < replays.length && replays.length > 0 && (
        <p className="score-subtitle">Calculating full record ({totalWithWinner}/{replays.length} matches analyzed)...</p>
      )}
      {replays.length === 0 && (
        <p className="score-subtitle">No direct battle history found.</p>
      )}
    </div>
  );
};
