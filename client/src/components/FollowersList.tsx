import React from "react";
import "../css/FollowersList.css";
import { fetchUser } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import {
  setFollowers,
  setRepositories,
  setUser,
} from "../redux/slice/UserSlice";

interface FollowerListProps {
  onBack: () => void;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowerList: React.FC<FollowerListProps> = ({
  onBack,
  setShowFollowers,
}) => {


  const dispatch = useDispatch();
  const { followers } = useSelector((state: RootState) => state.user);

  
  // Function to fetch details of clicked follower
  const fetchFollowerProfile = async (username: string) => {
    try {
      const res = await fetchUser(username);
      dispatch(setUser(res.data.user));
      dispatch(setRepositories(res.data.repositories));
      dispatch(setFollowers([]));
      setShowFollowers(false);
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
