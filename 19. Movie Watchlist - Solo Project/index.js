const tmdbApiKey = "4bf3883f6b777dd0086dae920ffb1d44";
const movieGrid = document.getElementById("movie-grid");
const movieDetailsInModal = document.getElementById("movie-details");

async function getRandomRelease(apiKey, numberOfMovies) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}`
    );
    const data = await response.json();
    const results = data.results;

    if (results === 0) {
      return [];
    }

    const shuffledResults = results.sort(() => 0.5 - Math.random());
    const randomMovies = shuffledResults.slice(0, numberOfMovies);

    randomMovies.forEach((movie) => displayMovieGridItem(movie));
  } catch (error) {
    console.log("Error fetching random new releases:", error);
    return [];
  }
}

getRandomRelease(tmdbApiKey, 20);

async function displayMovieGridItem(movieData) {
  let movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");

  try {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const imgSize = "w342";
    const posterUrl = baseUrl + imgSize + movieData.poster_path;
    const yearReleased = movieData.release_date;
    const year = yearReleased.substring(0, 4);

    movieItem.innerHTML = `
    <img src="${posterUrl}" alt="${movieData.title} Poster" class="movie-poster">
    <div class="movie-details">
        <div class="rating">
            <i class="fa-solid fa-star"></i>
            <p>${movieData.vote_average}</p>
        </div>
        <h2 class="title">${movieData.title}</h2>
        <div class="year-runtime">
            <p class="year">${year}</p>
        </div>
        <button id="details-btn" class="details-btn" data-movieid="${movieData.id}">Details</button>
    </div>
    `;

    movieGrid.appendChild(movieItem);

    const detailsBtn = movieItem.querySelector(".details-btn");
    detailsBtn.addEventListener("click", async function () {
      movieDetailsInModal.style.display = "flex";
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { runtime: null, rating: null };
  }
}

function convertMinutes(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("details-btn")) {
    const movieId = e.target.dataset.movieid;

    if (!movieId) return;

    try {
      const movieDetails = await getMovieDetails(movieId);
      const movieCredits = await getMovieCredits(movieId);
      const director = movieCredits.crew.filter(
        (crew) => crew.job === "Director"
      )[0];
      const casts = movieCredits.cast
        .filter((cast) => cast.known_for_department === "Acting")
        .slice(0, 3);
      casts.map((cast) => console.log(cast.name));

      detailsInModal(movieDetails, director, casts);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }
});

async function getMovieCredits(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${tmdbApiKey}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
  }
}

function detailsInModal(detail1, detail2, detail3) {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const imgSize = "w342";
  const posterUrl = baseUrl + imgSize + detail1.poster_path;
  const runtime = detail1.runtime;
  const yearReleased = detail1.release_date;
  const year = yearReleased.slice(0, 4);
  const hoursInTime = convertMinutes(runtime);
  const rating = detail1.vote_average;
  const genres = detail1.genres;
  const genre = genres
    .map((genre) => {
      return genre.name;
    })
    .join(`<i class="fa-solid fa-circle"></i>`);
  const stars = detail3
    .map((star) => {
      return star.name;
    })
    .join(`<i class="fa-solid fa-circle"></i>`);

  movieDetailsInModal.innerHTML = `
    <div class="detail-top">
      <img src="${posterUrl}" alt="${detail1.title}">
      <div class="text-details">
        <h2>${detail1.title}</h2>
        <div class="year-hour">
          <p>${year} <i class="fa-solid fa-circle"></i>${hoursInTime}</p>
        </div>
        <p class="genre">${genre}</p>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <p>${rating}</p>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <p>${detail1.overview}</p>
      <p>Director: ${detail2.name}</p>
      <p class="stars">Stars: ${stars}</p>
      <button class="watchlist">
        <i class="fa-solid fa-plus"></i>
        <p>My Watchlist</p>
      </button>
    </div>
  `;
}
