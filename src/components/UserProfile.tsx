import React from 'react';
import type { ShowdownUserData } from '../types';
import './UserProfile.css';

interface UserProfileProps {
  user: ShowdownUserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const registerDate = user.registertime 
    ? new Date(user.registertime * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  // Group meanings (basic subset)
  const getGroupRole = (group: number) => {
    switch(group) {
      case 0: return 'Regular User';
      case 1: return 'Voice';
      case 2: return 'Driver';
      case 3: return 'Moderator';
      case 4: return 'Leader';
      case 5: return 'Administrator';
      default: return 'User';
    }
  };

  return (
    <div className="glass-panel user-profile animate-fade-in">
      <div className="avatar-placeholder">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div className="user-details">
        <h2>{user.username}</h2>
        <div className="user-meta">
          <span className="badge role-badge">{getGroupRole(user.group)}</span>
          {user.registertime > 0 && (
            <span className="badge date-badge">Joined {registerDate}</span>
          )}
        </div>
      </div>
    </div>
  );
};
