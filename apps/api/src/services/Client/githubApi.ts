import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubApi = (token: string) =>
  axios.create({
    baseURL: GITHUB_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  });
export default githubApi;
