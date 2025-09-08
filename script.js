const API_KEY = "bb1f543"; 
const APILINK = `http://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`;
const SEARCHAPI = `http://www.omdbapi.com/?s=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(function (data) {
      console.log(data);

      main.innerHTML = ""; // clear before appending

      if (data.Search) {
        data.Search.forEach(element => {
          const div_card = document.createElement("div");
          div_card.setAttribute("class", "card");

          const div_column = document.createElement("div");
          div_column.setAttribute("class", "column");

          const div_row = document.createElement("div");
          div_row.setAttribute("class", "row");

          const image = document.createElement("img");
          image.setAttribute("class", "thumbnail");
          image.setAttribute("id", "image");
          image.src = element.Poster !== "N/A" ? element.Poster : "images.jpg";

          const title = document.createElement("h3");
          title.setAttribute("class", "title");
          title.innerHTML = `${element.Title}`;

          const centerDiv = document.createElement("div");
          centerDiv.className = "img-center";
          centerDiv.appendChild(image);

          div_card.appendChild(centerDiv);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);

          main.appendChild(div_row);
        });
      } else {
        main.innerHTML = "<h2>No results found</h2>";
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchItem = search.value.trim();

  if (searchItem) {
    returnMovies(`${SEARCHAPI}${searchItem}&apikey=${API_KEY}`);
    search.value = "";
  }
});
