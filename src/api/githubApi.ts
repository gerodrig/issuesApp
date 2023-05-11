import axios from 'axios';

export const githubApi = axios.create({
  baseURL: `https://api.github.com/repos/${
    import.meta.env.GITHUB_USER ?? process.env.GITHUB_USER
  }/${import.meta.env.GITHUB_REPO ?? process.env.GITHUB_REPO}`,
  headers: {
    Authorization: `token ${
      import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN
    }`,
  },
});
