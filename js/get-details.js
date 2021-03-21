const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const category = urlParams.get("cat");
async function getDetails() {
  try {
    const response = await fetch(`https://api.jikan.moe/v3/${category}/${id}`);
    const result = await response.json();
    displayDetails(result);
  } catch (error) {
    console.log("Something went wrong !!");
  }
}
getDetails();

function displayDetails(data) {
  document.getElementById("main").innerHTML = `
  <div class="side-panel">
          <div class="img-holder">
            <img src="${data.image_url}">
          </div>
          <div class="other-info"></div>
        </div>
        <div class="main-panel">
          <div class="title">
          <h1>${data.title}</h1>
          </div>
          <div class="type-score">
          <h4>Type : <span>${data.type}</span></h4>
          <h4>Score: <span>${data.score}, scored by ${
    data.scored_by
  }</span></h4>
          </div>
          <div class="rank-popular">
          <h4>Ranked <span>#${data.rank}</span></h4>
          <h4>Popularity <span>#${data.popularity}</span></h4>
          <h4>Members<span>${data.members}</span></h4>
          <h4>Favorite <span>${data.favorites}</span></h4>
          </div>
          <div class="synopsis">
          <h4>Synopsis</h4><hr>
          <p>${data.synopsis}</p>
          <br>
          <h4>Background</h4><hr>
          <p>${data.background ? data.background : "No Background"}</p>
          </div>
        </div>
        <div class="alt-panel"></div>
        <div class="info-panel"></div>
        <div class="stats-panel"></div>
        <div class="characters-panel"></div>
        <div class="xtra-panel"></div>
`;
}
