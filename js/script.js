let startActive = document.getElementById("start").text;
let start = startActive.toLowerCase();

window.onload = getData(start);

let list = [];

let links = document.querySelectorAll("li a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    let gameType = e.target.innerHTML.toLowerCase();
    console.log(gameType);

    for (let x = 0; x < links.length; x++) {
      links[x].classList.remove("active");
    }
    e.target.classList.add("active");

    document.querySelector(".loading").classList.remove("d-none");
    getData(gameType).then(hideLoader);
  });
}

function hideLoader() {
  document.querySelector(".loading").classList.add("d-none");
}

async function getData(type) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "43e6463cf0mshbc883b78dc2f77dp18bfc2jsne2562fdeb8d3",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const url = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`,
    options
  );
  let response = await url.json();
  list = [...response];

  displayGames(list);
}

function displayGames(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `
        <div class="col-lg-3 col-md-4 my-2 game" >
        <div class="card text-white bg-transparent h-100" onclick="getDetails(${list[i].id})">
        <div class="image position-relative">
           <img src="${list[i].thumbnail}" class="card-img-top p-3 rounded-5"/>
           <div class="layer m-3 rounded-4 position-absolute"></div>
        </div>

          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <h5 class="card-title fw-medium">${list[i].title}</h5>
            <span class="badge text-bg-primary p-2">Free</span>
          </div>
          <p class="card-text px-3 fw-normal text-center opacity-50">
           ${list[i].short_description}
          </p>
          <div
            class="card-footer border-top border-black border-opacity-10 d-flex justify-content-between"
          >
            <span class="badge badge-color">${list[i].genre}</span>
            <span class="badge badge-color">${list[i].platform}</span>
          </div>
        </div>
      </div>
        `;
    document.getElementById("games").innerHTML = cartona;
  }
}

async function getDetails(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "43e6463cf0mshbc883b78dc2f77dp18bfc2jsne2562fdeb8d3",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  displayDetails(result);
}

function displayDetails(details) {
  document.getElementById("games2").classList.add("d-none");
  document.getElementById("details").classList.remove("d-none");
  let cartona;

  cartona += ` 
  <div class="container">
  <div class="header d-flex justify-content-between my-3">
    <h1>Details Game</h1>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      id="closeButton"
      onclick="closeBtn()"
    ></button>
  </div>
  <div class="row">
    <div class="col-md-4">
      <img src="${details.thumbnail}" alt="gameImg" class="w-100" />
    </div>
    <div class="col-md-8 mt-4">
      <h2 class="bold">Title: Diablo Immortal</h2>
      <div>
        <span class="bold">Category:</span>
        <button class="btn btn-info my-2">${details.genre}</button>
      </div>
      <div>
        <span class="bold">Platform:</span>
        <button class="btn btn-info my-2">${details.platform}</button>
      </div>
      <div>
        <span class="bold">Status: </span>
        <button class="btn btn-info my-2">${details.status}</button>
      </div>
      <div class="description">
        <p>${details.description}</p>
        <button class="btn btn-outline-warning my-3" onclick=' window.open("${details.game_url}", "_blank")'>
          Show Game
        </button>
      </div>
    </div>
  </div>
</div>

  `;
  document.querySelector("#details").innerHTML = cartona;
}

function closeBtn() {
  document.getElementById("games2").classList.remove("d-none");
  document.getElementById("details").classList.add("d-none");

  // window.history.back();
}
