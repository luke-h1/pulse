import githubApi from './Client/githubApi';

interface GithubUser {
  id: string;
  email: string;
  name: string;
  login: string;
  avatar_url: string;
}

const githubService = {
  async getUser(token: string): Promise<GithubUser> {
    const { data } = await githubApi(token).get<GithubUser>('/user');
    // TODO LH: double check data shape here
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      login: data.login,
      avatar_url: data.avatar_url,
    };
  },
};

export default githubService;
