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
    createCardList(data.results, category);
  } catch (error) {
    console.log(`Something went wrong !! `);
  }
}

function createCardList(dataList, category) {
  document.querySelector(".content").innerHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
        <th scope="col">Poster</th>
        <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
      ${dataList
        .map((data) => {
          return `<tr>
            <td><img src="${data.image_url}" class="img-thumbnail" style="height:100px"></td>
            <td class="text-center">
              <a href="details.html?id=${data.mal_id}&cat=${category}" class="text-decoration-none">${data.title} </a>
              <p>${data.type} | ${data.members} members</p>
              <p>Score : <span class="lead">${data.score}</span></p>
            </td>
          </tr>`;
        })
        .join("")}
      </tbody>
    </table>
    `;
}
