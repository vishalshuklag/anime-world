const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("cat").value;
  const search = document.getElementById("search").value;
  getData(category, search);
  searchForm.reset();
});

async function getData(category = "anime", search) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v3/search/${category}?q=${search}`
    );
    const data = await response.json();
    console.log(data.results);
    createCardList(data.results, category);
  } catch (error) {
    console.log(`Something went wrong !! `);
  }
}

function createCardList(dataList, category) {
  document.querySelector(".content").innerHTML = `
    <table class="content-table">
      <thead>
        <tr>
        <th>Poster</th>
        <th>Title</th>
        </tr>
      </thead>
      <tbody>
      ${dataList
        .map((data) => {
          return `<tr>
            <td><img src="${data.image_url}"></td>
            <td>
              <a href="details.html?id=${data.mal_id}&cat=${category}" class="link">${data.title} </a>
              <p>${data.type}</p>
              <p>Score : ${data.score}</p>
              <p>${data.members} members</p>
            </td>
          </tr>`;
        })
        .join("")}
      </tbody>
    </table>
    `;
}
