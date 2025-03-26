/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Repository {
  id: number;
  name: string;
  description: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  user:any
}

