import React, { useState } from "react";
import RepositoryList from "./RepositoryList";
import UserProfile from "./UserProfile";
import { fetchUser } from "../api/api";
import { Repository } from "../interface/Irepository";
import "../css/UserSearch.css";
import FollowerList from "./FollowersList";
import RepositoryDetails from "./RepositoryDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import {
  clearUserData,
  setFollowers,
  setRepositories,
  setUser,
} from "../redux/slice/UserSlice";

function UserSearch() {
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );


  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);

  const dispatch = useDispatch();
  const { user, repositories } = useSelector((state: RootState) => state.user);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);
    setShowFollowers(false);
    setFollowers([]);
    setSelectedRepo(null);
    
    if (username.trim().length === 0) {
      setError("Enter a valid name!!");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("username", username);

    dispatch(setUser(null));
    dispatch(setRepositories([]));
    dispatch(setFollowers([]));
    dispatch(clearUserData());

    try {
      const res = await fetchUser(username);
      dispatch(setUser(res.data.user));
      dispatch(setRepositories(res.data.repositories));
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch user data,Please try again");
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="user-search-container">
      <div className="search-and-repos-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Enter GitHub username"
            className="search-input"
            required
          />
          <button type="submit" className="search-button">
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {user && Object.keys(user).length > 0 && (
          <div className="profile-section">
            <UserProfile
              user={user}
              setShowFollowers={setShowFollowers}
              onBack={() => {
                setShowFollowers(false);
                setSelectedRepo(null);
              }}
            />

            {/* Conditional Rendering for Followers, Repository List, or Repository Details */}
            {showFollowers ? (
              <FollowerList
                onBack={() => setShowFollowers(false)}
                setShowFollowers={setShowFollowers}
              />
            ) : selectedRepo ? (
              <RepositoryDetails
                repo={selectedRepo}
                onBack={() => setSelectedRepo(null)}
                user={user}
              />
            ) : (
              <RepositoryList
                repositories={repositories}
                onSelect={setSelectedRepo}
                user={user}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
