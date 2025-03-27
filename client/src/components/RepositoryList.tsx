import React from "react";
import { Repository } from "../interface/Irepository";
import "../css/RepositoryList.css";
import { IUser } from "../interface/Iuser";

interface RepositoryListProps {
  repositories: Repository[];
  onSelect: (repo: Repository) => void;
  user: IUser;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  onSelect,
  user,
}) => {
  
  return (
    <div className="repository-grid">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="repository-card"
          onClick={() => onSelect(repo)}
        >
          <div className="repo-icon">
            <img
              src={user?.avatar_url || "default-avatar.png"}
              alt={repo.name}
              className="repo-avatar"
            />
          </div>

          <div className="repo-content">
            <h3>{repo.name}</h3>
            <p>{repo.description || "No description"}</p>
            <div className="repo-meta">
              {repo.language && (
                <span className="repo-language">{repo.language}</span>
              )}
              <div className="repo-stats">
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
