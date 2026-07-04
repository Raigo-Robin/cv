document.addEventListener("DOMContentLoaded", () => {
  const username = "Raigo-Robin";
  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

  const card = document.getElementById("github-card");
  const avatar = document.getElementById("avatar");
  const name = document.getElementById("name");
  const bio = document.getElementById("bio");
  const profileLink = document.getElementById("profile-link");

  const reposContainer = document.getElementById("github-repos-container");
  const reposList = document.getElementById("repos-list");

  fetch(profileUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      avatar.src = data.avatar_url;
      name.textContent = data.name || data.login;
      bio.textContent = data.bio || "No bio description provided yet.";
      profileLink.href = data.html_url;
      card.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      name.textContent = "Profile unavailable";
      card.style.display = "flex";
    });

  fetch(reposUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return response.json();
    })
    .then((repos) => {
      reposList.innerHTML = "";

      if (repos.length === 0) {
        reposList.innerHTML =
          '<p class="repo-status-msg">No public repositories found.</p>';
      } else {
        repos.forEach((repo) => {
          const repoItem = document.createElement("div");
          repoItem.className = "repo-item";

          repoItem.innerHTML = `
            <div class="links repo-title">
              <a href="${repo.html_url}" target="_blank" class="active">${repo.name}</a>
            </div>
            <p>${repo.description || "No description provided."}</p>
            <span>⭐ ${repo.stargazers_count} | 🌐 ${repo.language || "Mixed"}</span>
          `;
          reposList.appendChild(repoItem);
        });
      }
      reposContainer.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
      reposList.innerHTML =
        '<p class="repo-error-msg">Failed to load repositories.</p>';
      reposContainer.style.display = "flex";
    });
});
