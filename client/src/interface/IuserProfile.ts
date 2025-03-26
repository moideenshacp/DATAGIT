export interface UserProfileProps {
  user: {
    avatar_url?: string;
    name?: string;
    login?: string;
    bio?: string;
    followers?: number;
    following?: number;
    public_repos?: number;
    company?: string;
    location?: string;
    blog?: string;
  };
}
