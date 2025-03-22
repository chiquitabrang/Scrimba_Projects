import { showDetails } from "./utility.js";

const tmdbApiKey = "4bf3883f6b777dd0086dae920ffb1d44";
const movieGrid = document.getElementById("movie-grid");
const movieDetailsInModal = document.getElementById("movie-details");
let currentMovieDetails = null;

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

      renderMovieDetailsModal(movieDetails, director, casts);
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

async function showMovieDetails(movieId) {
  try {
    const movieDetails = await getMovieDetails(movieId);
    const movieCredits = await getMovieCredits(movieId);
    const director = movieCredits.crew.filter(
      (crew) => crew.job === "Director"
    )[0];
    const casts = movieCredits.cast
      .filter((cast) => cast.known_for_department === "Acting")
      .slice(0, 3);

    currentMovieDetails = {
      id: movieDetails.id,
      title: movieDetails.title,
      poster_path: movieDetails.poster_path,
      release_date: movieDetails.release_date,
      runtime: movieDetails.runtime,
      vote_average: movieDetails.vote_average,
      overview: movieDetails.overview,
      genres: movieDetails.genres,
      director: director.name,
      stars: casts.map((cast) => cast.name).join(", "),
    };

    renderMovieDetailsModal(currentMovieDetails, casts, director);

    movieDetailsInModal.style.display = "flex";
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

function renderMovieDetailsModal(movie, director, casts) {
  const runtime = movie.runtime;
  const minutes = runtime % 60;
  const hours = Math.floor(runtime / 60);
  console.log(movie.id);

  const currentMovie = {
    posterUrl: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
    year: movie.release_date.substring(0, 4),
    hoursInTime: `${hours}h ${minutes}m`,
    rating: movie.vote_average.toFixed(1),
    genre: movie.genres
      .map((genre) => genre.name)
      .join(`<i class="fa-solid fa-circle"></i>`),
    stars: casts
      .map((cast) => cast.name)
      .join(`<i class="fa-solid fa-circle"></i>`),
  };

  showDetails(currentMovie, movie, director);

  const movieDetailsInModal = document.getElementById("movie-details");
  const closeBtn = document.querySelector(".fa-xmark");
  closeBtn.addEventListener("click", function () {
    movieDetailsInModal.style.display = "none";
  });

  const addToWatchlist = document.getElementById("add-watchlist");
  addToWatchlist.addEventListener("click", () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    console.log("Stored watchlist:", localStorage.getItem("watchlist"));
    console.log(watchlist);
    console.log("movie added to watchlist");
    const movieExists = watchlist.some((item) => item.id === movie.id);
    console.log(movieExists);
    if (!movieExists) {
      watchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        runtime: movie.runtime,
        overview: movie.overview,
        genres: movie.genres,
        director: director,
        casts: casts,
      });
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    console.log("Updated watchlist:", localStorage.getItem("watchlist"));
    addToWatchlist.innerHTML = `
    <i class="fa-solid fa-check"></i>
        Added to Watchlist
  `;
  });
}

document.getElementById("watchlist").addEventListener("click", function () {
  window.location.href = "watchlist.html";
});
