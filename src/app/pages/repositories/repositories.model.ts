export interface RepositoriesResponse {
  username: string;
  repositories: Repository[];
}

interface Repository {
  name: string;
  full_name: string;
  description: null | string;
  url: string;
  stars: number;
  forks: number;
  language: null | string;
  created_at: string;
  updated_at: string;
}

export const repositories = {
  username: '',
  repositories: [],
};
