import React from 'react';
import type { ShowdownUserData } from '../types';
import './UserProfile.css';

interface UserProfileProps {
  user: ShowdownUserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const getGroupRole = (group: number) => {
    switch (group) {
      case 4: return '~ Admin';
      case 3: return '& Leader';
      case 2: return '@ Moderator';
      case 1: return '% Helper';
      default: return 'Trainer';
    }
  };

  const registerDate = user.registertime > 0 
    ? new Date(user.registertime * 1000).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="user-profile-container animate-fade-in">
      <div className="profile-glass glass-panel">
        <div className="avatar-placeholder">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <div className="name-row">
            <h2 className="user-name">{user.username}</h2>
            <span className={`badge role-badge group-${user.group}`}>
              {getGroupRole(user.group)}
            </span>
          </div>
          <p className="join-info">Joined: {registerDate}</p>
        </div>
        <div className="profile-links">
          <a 
            href={`https://pokemonshowdown.com/users/${user.userid}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-btn secondary-btn"
          >
            View Official Profile
          </a>
        </div>
      </div>
    </div>
  );
};
