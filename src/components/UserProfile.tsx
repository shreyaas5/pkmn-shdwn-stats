import React from 'react';
import type { ShowdownUserData } from '../types';
import './UserProfile.css';

interface UserProfileProps {
  user: ShowdownUserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const getGroupRole = (group: number) => {
    switch (group) {
      case 2: return 'Administrator';
      case 1: return 'Moderator';
      default: return 'Trainer';
    }
  };

  const registerDate = user.registertime > 0 
    ? new Date(user.registertime * 1000).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="user-profile-container animate-fade-in">
      <div className="profile-glass glass-panel">
        <div className="profile-header">
          <div className="avatar-placeholder">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <div className="name-row">
              <h2 className="user-name">{user.username}</h2>
              <span className="badge role-badge">{getGroupRole(user.group)}</span>
            </div>
            <p className="join-info">Joined: {registerDate}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="tour-card glass-panel">
            <span className="tour-val">240</span>
            <span className="tour-lab">Tournament Points (Lady Monita)</span>
          </div>
          
          <div className="action-buttons">
            <a 
              href={`https://play.pokemonshowdown.com/~~showdown/action.php?act=getuser&name=${user.userid}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-btn live-btn"
            >
              Watch Live
            </a>
            <a 
              href={`https://pokemonshowdown.com/users/${user.userid}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-btn profile-btn"
            >
              Official Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
