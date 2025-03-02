const apiKey = "5df4e406";
const movieGrid = document.getElementById("movie-grid");

const movieIds = [
  "tt0245429", // Spirited Away
  "tt6472976", // 5 Feet Apart
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt3281548", // Little Women
  "tt1790809", // Dead Men Tell No Tales
  "tt29623480",
];

movieIds.forEach((ids) => fetchMovieData(ids));

async function fetchMovieData(id) {
  const response = await fetch(
    `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  if (data.Response === "True") {
    displayMovieGridItem(data);
  } else {
    console.error(`Error fetching movie with ID ${id}:`, data.Error);
  }
}

function displayMovieGridItem(movieData) {
  const movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");
  const movieLength = parseInt(movieData.Runtime);
  const hours = convertMinutes(movieLength);

  movieItem.innerHTML = `
    <img src="${movieData.Poster}" alt="${movieData.Title} Poster" class="movie-poster">
    <div class="movie-details">
        <div class="rating">
            <i class="fa-solid fa-star"></i>
            <p>${movieData.imdbRating}</p>
        </div>
        <h2 class="title">${movieData.Title}</h2>
        <div class="year-runtime">
            <p class="year">${movieData.Year}</p>
            <p>${hours}</p>
        </div>
        <button id="details-btn">Details</button>
    </div>
    `;

  movieGrid.appendChild(movieItem);
}

function convertMinutes(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
