import React, { useState } from 'react';
// import UserInfo from './UserInfo';
// import RepositoryList from './RepositoryList';
import { fetchUser } from '../api/api';

function UserSearch() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});
  // const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e:React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Save user details to backend
      const res = await fetchUser(username)
      
      setUser(res.data);
      
      // // Fetch repositories
      // const userRepos = await GitHubService.fetchRepositories(username);
      // setRepositories(userRepos);
    } catch (err) {
      setError('Failed to fetch user data');
      console.error(err);
    }
  };

  console.log(user,"user---------------------");
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {/* {user && (
        <>
          <UserInfo user={user} />
          <RepositoryList repositories={repositories} username={username} />
        </>
      )} */}
    </div>
  );
}

export default UserSearch;