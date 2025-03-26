import React from "react";
import { Ifollower } from "../interface/Ifollower";
import "../css/FollowersList.css";
import { Repository } from "../interface/Irepository";
import { IUser } from "../interface/Iuser";
import { fetchUser } from "../api/api";

interface FollowerListProps {
  followers: Ifollower[];
  onBack: () => void;
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setFollowers: React.Dispatch<React.SetStateAction<Ifollower[]>>;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowerList: React.FC<FollowerListProps> = ({
  followers,
  onBack,
  setUser,
  setRepositories,
  setFollowers,
  setShowFollowers
}) => {
  // Function to fetch details of clicked follower
  const fetchFollowerProfile = async (username: string) => {
    try {
      const res = await fetchUser(username);
      setUser(res.data.user);
      setRepositories(res.data.repositories);
      setFollowers([])
      setShowFollowers(false)
      
    } catch (error) {
      console.error("Error fetching follower profile:", error);
    }
  };

  return (
    <div className="followers-container">
      <div className="back-navigation">
        <button onClick={onBack} className="back-link">
          ← Back to Repositories
        </button>
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
            <div
              className="follower-info"
              onClick={() => fetchFollowerProfile(follower.login)}
            >
              <h4>{follower.login}</h4>
              <a className="view-profile-link">View Profile</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerList;
