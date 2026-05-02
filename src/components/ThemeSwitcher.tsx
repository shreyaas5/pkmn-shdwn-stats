import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'psychic', name: 'Psychic', color: '#F95587' },
  { id: 'fire', name: 'Fire', color: '#EE8130' },
  { id: 'water', name: 'Water', color: '#6390F0' },
  { id: 'electric', name: 'Electric', color: '#F7D02C' },
  { id: 'grass', name: 'Grass', color: '#7AC74C' },
  { id: 'ice', name: 'Ice', color: '#96D9D2' },
  { id: 'fighting', name: 'Fighting', color: '#C22E28' },
  { id: 'poison', name: 'Poison', color: '#A33EA1' },
  { id: 'ground', name: 'Ground', color: '#E2BF65' },
  { id: 'flying', name: 'Flying', color: '#A98FF3' },
  { id: 'bug', name: 'Bug', color: '#A6B91A' },
  { id: 'rock', name: 'Rock', color: '#B6A136' },
  { id: 'ghost', name: 'Ghost', color: '#735797' },
  { id: 'dragon', name: 'Dragon', color: '#6F35FC' },
  { id: 'steel', name: 'Steel', color: '#B7B7CE' },
  { id: 'fairy', name: 'Fairy', color: '#D685AD' },
  { id: 'normal', name: 'Normal', color: '#A8A77A' },
  { id: 'dark', name: 'Dark', color: '#705746' },
];

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('psychic');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="theme-switcher-wrapper">
      <button 
        className="glass-btn theme-main-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="theme-menu glass-panel animate-fade-in">
          <div className="theme-list">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-option-vertical ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTheme(theme.id);
                  setIsOpen(false);
                }}
              >
                <span 
                  className="theme-dot" 
                  style={{ backgroundColor: theme.color }} 
                />
                <span className="theme-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
