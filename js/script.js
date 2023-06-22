// overview div = show profile information
const profileInfo = document.querySelector(".overview");
// ul displays repos list
const reposList = document.querySelector(".repo-list");

// GitHub username
const username = "CreatedByCC";

// fetch profile data
const getProfile = async function(username) {
    const info = await fetch(`https://api.github.com/users/${username}`);
    const res = await info.json();
    displayProfile(res);
};

getProfile(username);

// display Data
const displayProfile = function(res) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${res.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${res.name}</p>
        <p><strong>Bio:</strong> ${res.bio}</p>
        <p><strong>Location:</strong> ${res.location}</p>
        <p><strong>Number of public repos:</strong> ${res.public_repos}</p>
    </div>`;
    profileInfo.append(div);
};

// fetch repos data
const getRepos = async function(username) {
    const repoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoRes = await repoData.json();
    console.log(repoRes);
    displayRepos(repoRes);
};

getRepos(username);

// display repos
const displayRepos = function(repoRes) {
        for (let repo of repoRes) {
        let repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};