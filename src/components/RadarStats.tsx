import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { FormatRating } from '../types';
import './RadarStats.css';

interface RadarStatsProps {
  ratings: Record<string, FormatRating>;
}

export const RadarStats: React.FC<RadarStatsProps> = ({ ratings }) => {
  // Select top 5 formats to display on the radar
  const data = Object.entries(ratings)
    .sort(([, a], [, b]) => b.elo - a.elo)
    .slice(0, 6)
    .map(([name, rating]) => ({
      subject: name.replace(/^gen\d/, '').replace(/battle$/, '').toUpperCase(),
      A: rating.elo,
      fullMark: 2000,
    }));

  if (data.length < 3) return null;

  return (
    <div className="glass-panel radar-container animate-fade-in">
      <h3 className="card-title">Format Proficiency</h3>
      <div className="radar-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="var(--glass-border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} 
            />
            <Radar
              name="Player"
              dataKey="A"
              stroke="var(--accent-color)"
              fill="var(--accent-color)"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
