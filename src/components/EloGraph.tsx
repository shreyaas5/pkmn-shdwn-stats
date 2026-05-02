import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './EloGraph.css';

interface EloGraphProps {
  eloData: number[];
}

export const EloGraph: React.FC<EloGraphProps> = ({ eloData }) => {
  if (eloData.length < 2) {
    return (
      <div className="elo-graph-container glass-panel empty-graph">
        <p>Not enough recent ranked data for Elo progression</p>
      </div>
    );
  }

  const data = eloData.map((elo, index) => ({
    match: index + 1,
    elo: elo
  }));

  const minElo = Math.min(...eloData) - 20;
  const maxElo = Math.max(...eloData) + 20;

  return (
    <div className="elo-graph-container glass-panel animate-fade-in">
      <div className="graph-header">
        <h3>Elo Progression</h3>
        <span className="subtitle">Last {eloData.length} Ranked Matches</span>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="match" 
              hide 
            />
            <YAxis 
              domain={[minElo, maxElo]} 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12}
              tickFormatter={(val) => Math.round(val).toString()}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: 'var(--accent-color)' }}
              labelStyle={{ display: 'none' }}
            />
            <Line 
              type="monotone" 
              dataKey="elo" 
              stroke="var(--accent-color)" 
              strokeWidth={3} 
              dot={{ fill: 'var(--accent-color)', r: 4 }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
