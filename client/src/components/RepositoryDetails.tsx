import React from "react";
import { Repository } from "../interface/Irepository";
import "../css/RepositoryDetails.css";
import { IUser } from "../interface/Iuser";

interface RepositoryDetailsProps {
  repo: Repository;
  onBack: () => void;
  user: IUser;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  repo,
  onBack,
  user,
}) => {

  
  return (
    <div className="repository-details-container">
      <div className="back-navigation">
        <button onClick={onBack} className="back-link">
          ← Back to Repositories
        </button>
      </div>

      <div className="app-details-card">
        <div className="app-header">
          <div className="app-logo">
            <img
              src={user?.avatar_url || "default-avatar.png"}
              alt={`${repo.name} logo`}
              className="logo-image"
            />
          </div>
          <div className="app-info">
            <h2 className="app-name">{repo.name}</h2>
            <div className="verification-status">
              <span className="verified-badge">✓ Verified by GitHub</span>
            </div>
            <p className="app-description">
              {repo.description || "No description provided"}
            </p>
          </div>
        </div>

        <div className="app-categories">
          <div className="category-item">
            <span className="category-label">Code review</span>
          </div>
          <div className="category-item">
            <span className="category-label">IDEs</span>
          </div>
          <div className="category-item">
            <span className="category-label">Free</span>
          </div>
        </div>

        <div className="app-actions">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="set-up-button"
          >
            View on GitHub
          </a>
        </div>

        <div className="repo-additional-details">
          <div className="detail-section">
            <h3>Repository Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Language</span>
                <span className="detail-value">
                  {repo.language || "Not specified"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Stars</span>
                <span className="detail-value">{repo.stargazers_count}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Forks</span>
                <span className="detail-value">{repo.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetails;
