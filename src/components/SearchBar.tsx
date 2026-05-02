import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (user1: string, user2?: string) => void;
  isLoading: boolean;
  isCompareMode: boolean;
  onToggleCompare: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  isCompareMode,
  onToggleCompare 
}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (isCompareMode) {
      if (input1.trim() && input2.trim()) {
        onSearch(input1.trim(), input2.trim());
      }
    } else {
      if (input1.trim()) {
        onSearch(input1.trim());
      }
    }
  };

  const isSubmitDisabled = isLoading || !input1.trim() || (isCompareMode && !input2.trim());

  return (
    <div className="search-wrapper">
      <div className="mode-toggle-container">
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={isCompareMode} 
            onChange={onToggleCompare} 
            disabled={isLoading}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">Head-to-Head Comparison</span>
      </div>

      <form className={`search-form ${isCompareMode ? 'compare-active' : ''}`} onSubmit={handleSubmit}>
        <div className="inputs-container">
          <input
            type="text"
            className="glass-input search-input"
            placeholder={isCompareMode ? "Player 1 (e.g. zarel)" : "Enter Showdown username"}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            disabled={isLoading}
          />
          
          {isCompareMode && (
            <>
              <span className="vs-badge">VS</span>
              <input
                type="text"
                className="glass-input search-input"
                placeholder="Player 2 (e.g. aim)"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                disabled={isLoading}
              />
            </>
          )}
        </div>

        <button 
          type="submit" 
          className="glass-btn search-button"
          disabled={isSubmitDisabled}
        >
          {isLoading ? 'Searching...' : (isCompareMode ? 'Compare' : 'Search')}
        </button>
      </form>
    </div>
  );
};
