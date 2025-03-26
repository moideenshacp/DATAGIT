import React from "react";
import "../css/UserProfile.css";
import { UserProfileProps } from "../interface/IuserProfile";
import { fetchFollowers } from "../api/api";

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  setFollowers,
  setShowFollowers,
  followers,
  onBack,
}) => {
  const fetchAllFollowers = async () => {
    if (followers.length === 0) {
      try {
        const res = await fetchFollowers(user.username);
        setFollowers(res.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    }
    setShowFollowers(true);
  };

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
        <h2 className="user-name">{user.name || user.username}</h2>
        {user.bio && <p className="user-bio">{user.bio}</p>}

        <div className="user-stats">
          <div
            className="stat"
            onClick={fetchAllFollowers}
            style={{ cursor: "pointer" }}
          >
            <span className="stat-label">Followers</span>
            <span className="stat-value">{user.followers || 0}</span>
          </div>
          <div className="stat" onClick={onBack} style={{ cursor: "pointer" }}>
            <span className="stat-label">Repositories</span>
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
