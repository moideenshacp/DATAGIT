import React, { useState } from "react";
import RepositoryList from "./RepositoryList";
import UserProfile from "./UserProfile";
import { fetchUser } from "../api/api";
import { Repository } from "../interface/Irepository";
import { Ifollower } from "../interface/Ifollower";
import "../css/UserSearch.css";
import FollowerList from "./FollowersList";
import RepositoryDetails from "./RepositoryDetails";

function UserSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [followers, setFollowers] = useState<Ifollower[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);

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
    try {
      const res = await fetchUser(username);
      setUser(res.data.user);
      setRepositories(res.data.repositories);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch user data");
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

        {Object.keys(user).length > 0 && (
          <div className="profile-section">
            <UserProfile
              user={user}
              setFollowers={setFollowers}
              setShowFollowers={setShowFollowers}
              followers={followers}
              onBack={() => {
                setShowFollowers(false);
                setSelectedRepo(null);
              }}
            />

            {/* Conditional Rendering for Followers, Repository List, or Repository Details */}
            {showFollowers ? (
              <FollowerList
                followers={followers}
                onBack={() => setShowFollowers(false)}
                setRepositories={setRepositories}
                setUser={setUser}
                setShowFollowers={setShowFollowers}
                setFollowers={setFollowers}
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
