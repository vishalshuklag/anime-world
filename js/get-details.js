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
  console.log(data);
  document.getElementById("main").innerHTML = `
  <div class="container-fluid" id="">
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-3 col-3 mt-4 v-line-r">
      <img src="${data.image_url}" class="img-fluid" alt="${data.title}" style="height: 400px; width: 240px; background-color: #1e1e1e"> 
      <div class="list-group mt-2">
        <div class="title">
          <p class="lead">Alternate Titles</p> <hr class="my-0">
        <b>English: <small>${data.title_english ? data.title_english : 'Not Available'}</small></b> <br>
        <b>Japanese : <small>${data.title_japanese ? data.title_japanese : 'Not Available'}</small></b>
        </div>
        <div class="information mt-4">
          <p class="lead">Information</p> <hr class="my-0">
          <b>Type: <small>${data.type}</small></b> <br>
          ${ data.episodes? `<b>Episodes: <small>${data.episodes}</small></b> <br>`: ''}
          ${ data.chapters ? `<b>Chapters: <small>${data.chapters}</small></b> <br>` : ''}
          <b>Status: <small class="text-justify text-wrap">${data.status}</small></b> <br>
          
          <b>Genres: <small class="text-justify text-wrap">${data.genres.map(genre => {
            return genre.name
          }).join(', ')}</small></b> <br>
          
          <b>Rating: <small class="text-justify text-wrap">${data.rating}</small></b> <br>
        </div>
      </div>

    </div>
    
    <div class="col-lg-9 col-md-9 col-sm-9 col-9 mt-4" >
      <h1>${data.title}</h1><hr class="my-0">
<div class="row mt-4">
<div class="col-lg-12">
  <div class="row no-gutters">
    <div class="col-lg-2 col-md-2 col-sm-2 col-2 " title="Indicates a weighted score">
      <p class="badge badge-primary" >Score</p>
      <h4>${data.score?data.score : 'Not voted'}</h4>
      <small class="text-muted text-justify">voted by ${
        data.scored_by? data.scored_by : 'unknown'
      } users.</small>
    </div>
    <div class="col-lg-10 col-md-10 col-sm-10 col-10 ">
      <div class="row no-gutters">
        <div class="col">
          <p >Ranked <span class="lead">#${data.rank}</span></p>
        </div>
        <div class="col">
          <p >Popularity <span class="lead">#${data.popularity}</span></p>
        </div>
        <div class="col">
          <p >Members <span class="lead">#${data.members}</span></p>
        </div>
      </div>
      <div class="row no-gutters d-flex justify-content-start mt-4">
        <div class="col">
          <p >Favourite: <span class="lead">${data.favorites}</span></p>
        </div>
        <div class="col form-check-inline">
          <p class="v-line-r mr-2 text-justify">${data.rating ? data.rating : ''}</p>
          <p class="v-line-r mr-2">${data.type}</p>
          <p >${data.status}</p>
        </div>
      </div>
    </div>

    <div class="cotainer mt-2">
            <h4>Synopsis</h4> <hr>
            <p class="text-justify">${data.synopsis}</p>

            <h4>Background</h4> <hr>
            <p class="text-justify">${data.background ? data.background : "No Background"}</p>
          </div>
        </div>
      </div>
    </div>
      <div class="row mt-4 pt-2">
      </div>
     
    </div>
  </div>
</div>
`;
}
