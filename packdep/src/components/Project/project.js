import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import projectsActions from "../../redux/actions/projectsActions";
import { getOctokit, getAuthenticatedOctokit } from "../../github";
import { useCollection } from "react-firebase-hooks/firestore";

const Project = () => {
  const count = useSelector(state => state.projectsReducer.projectsCount);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.githubUser.accessToken);
  const githubUser = useSelector(state => state.githubUser.accessToken);
  const [orgs, setOrgs] = useState([]);
  const [repos, setRepos] = useState([]);
  const [reposBranches, setReposBranches] = useState({});

  function getUserGithubStatus() {
    if (accessToken) {
      const octokit = getAuthenticatedOctokit(accessToken);
      octokit.repos.list({ per_page: 10, page: 1 }).then(response => {
        // console.log(JSON.stringify(response))
        setRepos(response.data.map(repo => repo.name));
        response.data.map(repo => {
          octokit.repos
            .listBranches({
              owner: repo.owner.login,
              repo: repo.name
            })
            .then(response => {
              reposBranches[repo.name] = response.data;
              let newReposBranches = {...reposBranches }
              newReposBranches[repo.name] = response.data
              setReposBranches(newReposBranches);
              console.log(`JSON.stringify(reposBranches)${JSON.stringify(reposBranches)}`);
            })
            .catch(e => {
              console.log(e.message);
            });
          return true;
        });
      });
      octokit.orgs
        .listForAuthenticatedUser({ per_page: 10, page: 1 })
        .then(response => {
          console.log(JSON.stringify(response));
          setOrgs(response.data.map(org => org.login));
        });
    }
  }

  useEffect(() => {
    if (accessToken) getUserGithubStatus();
  }, [accessToken]);

  return (
    <div>
      <Typography>{count}</Typography>
      This project is with{" "}
      <button
        onClick={event => {
          dispatch(projectsActions.addProject());
          console.log("clicked!!");
        }}
      >
        Increase
      </button>
      {accessToken ? (
        <Typography>
          You have {repos.length} repos and you are member of {orgs.length} orgs
          orgs {JSON.stringify(orgs)} 
          branches {JSON.stringify(Object.keys(reposBranches).map(key => reposBranches[key].length).reduce((prev, curr) => prev+curr, 0))}
        </Typography>
      ) : (
        <Typography>No repos for you</Typography>
      )}
    </div>
  );
};

export default Project;
