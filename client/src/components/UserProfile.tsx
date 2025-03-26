import React from 'react';
import '../css/UserProfile.css';
import { UserProfileProps } from '../interface/IuserProfile';


const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile-container">
      {user.avatar_url && (
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="user-avatar" 
        />
      )}
      <div className="user-details">
        <h2 className="user-name">{user.name || user.login}</h2>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        
        <div className="user-stats">
          <div className="stat">
            <span className="stat-label">Followers</span>
            <span className="stat-value">{user.followers || 0}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Following</span>
            <span className="stat-value">{user.following || 0}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Repos</span>
            <span className="stat-value">{user.public_repos || 0}</span>
          </div>
        </div>
        
        <div className="user-additional-info">
          {user.company && (
            <p className="info-item">
              <i className="icon-company"></i> {user.company}
            </p>
          )}
          {user.location && (
            <p className="info-item">
              <i className="icon-location"></i> {user.location}
            </p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;