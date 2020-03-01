const { Octokit } = require("@octokit/rest");


const github_feature = (token) => {
  const octokit = new Octokit({
    auth: token
  });

  const getProjects = () => {
    return []
  }
  
}

// github_feature("").getProjects()

export default github_feature;