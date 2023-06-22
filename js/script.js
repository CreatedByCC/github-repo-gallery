// overview div = show profile information
const overview = document.querySelector(".overview");

// GitHub username
const username = "CreatedByCC";

// Fetch API JSON Data
const getProfile = async function(username) {
    const info = await fetch(`https://api.github.com/users/${username}`);
    const res = await info.json();
    console.log(res);
    displayProfile(res);
};

getProfile(username);

// Display Data
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
    overview.append(div);
};