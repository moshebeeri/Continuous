const { Octokit } = require("@octokit/rest")

export function getAuthenticatedOctokit(accessToken) {
  const octokit = new Octokit({
      auth: accessToken
  })
  return octokit
}

export function getOctokit() {
  return  new Octokit()
}
