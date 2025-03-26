import React, { useState } from "react";
import RepositoryList from "./RepositoryList";
import UserProfile from "./UserProfile";
import { fetchUser } from "../api/api";
import "../css/UserSearch.css";
import RepositoryDetails from "./RepositoryDetails";
import { Repository } from "../interface/Irepository";

function UserSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

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
    <div>

    <div className="user-search-container">

      <div className="search-and-repos-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <div className="repositories-container">
            {selectedRepo ? (
              <RepositoryDetails
                repo={selectedRepo}
                onBack={() => setSelectedRepo(null)}
                user={user}
              />
              
            ) : (
              <div className="profile-section" >

                <UserProfile user={user}/>
                <RepositoryList
                  repositories={repositories}
                  onSelect={setSelectedRepo}
                  user={user}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserSearch;
