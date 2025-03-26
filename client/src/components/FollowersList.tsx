import React from "react";
import { Ifollower } from "../interface/Ifollower";
import "../css/FollowersList.css"; 

interface FollowerListProps {
  followers: Ifollower[];
  onBack: () => void;
}

const FollowerList: React.FC<FollowerListProps> = ({ followers, onBack }) => {
  return (
    <div className="followers-container">
      <div className="back-navigation">
        <button onClick={onBack} className="back-link">← Back to Repositories</button>
      </div>

      <div className="followers-grid">
        {followers.map((follower) => (
          <div key={follower.id} className="follower-card">
            <div className="follower-avatar">
              <img
                src={follower.avatar_url || "default-avatar.png"}
                alt={follower.login}
              />
            </div>
            <div className="follower-info">
              <h4>{follower.login}</h4>
              <a 
                href={follower.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-profile-link"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerList;