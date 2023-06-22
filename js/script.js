// overview div = show profile information
const profileInfo = document.querySelector(".overview");
// ul displays repos list
const reposList = document.querySelector(".repo-list");
// section: repos
const reposSection = document.querySelector(".repos");
// section: repo-data
const repoData = document.querySelector(".repo-data");
// back to repo gallery button
const backToRepo = document.querySelector(".view-repos");
// input to "search by name"
const filterInput = document.querySelector(".filter-repos");

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
    const reposInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposRes = await reposInfo.json();
    displayRepos(reposRes);
};

getRepos(username);

// display repos
const displayRepos = function(reposRes) {
    filterInput.classList.remove("hide");
    filterInput.focus();
        for (let repo of reposRes) {
        let repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};

reposList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }    
});

// fetch specific repo info
const getRepoInfo = async function(repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepo.json();
    const fetchLanguages = await fetch (repoInfo.languages_url); 
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo,languages);
};

// display specific repo info
const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    backToRepo.classList.remove("hide");
};

backToRepo.addEventListener("click", function() {
    reposSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepo.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = searchText.toLowerCase();
    for (let repo of repos) {
        let repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(searchLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});