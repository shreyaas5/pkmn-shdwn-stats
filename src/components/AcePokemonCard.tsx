import React from 'react';
import type { PlayerAnalytics } from '../types';
import { Shield, Swords, Flame } from 'lucide-react';
import './AcePokemonCard.css';

interface AcePokemonCardProps {
  analytics: PlayerAnalytics;
}

export const AcePokemonCard: React.FC<AcePokemonCardProps> = ({ analytics }) => {
  const getPlaystyleIcon = () => {
    switch(analytics.playstyle) {
      case 'Hyper Offense': return <Flame className="style-icon fire" />;
      case 'Offensive': return <Swords className="style-icon" />;
      case 'Balanced': return <Shield className="style-icon" />;
      default: return <Shield className="style-icon" />;
    }
  };

  // Helper to format pokemon name for sprite URL
  const spriteName = analytics.acePokemon.name.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div className="glass-panel ace-card animate-fade-in">
      <div className="ace-header">
        <span className="ace-label">Signature Pokémon</span>
        <h3 className="ace-name">{analytics.acePokemon.name}</h3>
      </div>
      
      <div className="ace-visual">
        <img 
          src={`https://play.pokemonshowdown.com/sprites/ani/${spriteName}.gif`} 
          alt={analytics.acePokemon.name}
          className="ace-sprite"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://play.pokemonshowdown.com/sprites/dex/${spriteName}.png`;
          }}
        />
        <div className="ace-glow" />
      </div>

      <div className="ace-stats">
        <div className="ace-stat-item">
          <span className="val">{analytics.winStreak}</span>
          <span className="lab">W-Streak</span>
        </div>
        <div className="ace-stat-item">
          <div className="style-badge">
            {getPlaystyleIcon()}
            <span>{analytics.playstyle}</span>
          </div>
        </div>
        <div className="ace-stat-item">
          <span className="val">{analytics.averageTurns}</span>
          <span className="lab">Avg Turns</span>
        </div>
      </div>
    </div>
  );
};
