import axios from 'axios';

export const githubApi = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.VUE_APP_GITHUB_USER}/${process.env.VUE_APP_GITHUB_REPO}`,
  headers: {
    Authorization: `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
  },
});
