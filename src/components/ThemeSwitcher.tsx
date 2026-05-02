import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'psychic', name: 'Psychic', color: '#8b5cf6' },
  { id: 'fire', name: 'Fire', color: '#f97316' },
  { id: 'water', name: 'Water', color: '#3b82f6' },
  { id: 'electric', name: 'Electric', color: '#eab308' },
  { id: 'grass', name: 'Grass', color: '#22c55e' },
  { id: 'dark', name: 'Dark', color: '#6366f1' },
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
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTheme(theme.id);
                setIsOpen(false);
              }}
            >
              <span 
                className="theme-color-dot" 
                style={{ backgroundColor: theme.color }} 
              />
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
