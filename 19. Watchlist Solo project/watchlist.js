document.getElementById("search-movie").addEventListener("click", function () {
  window.location.href = "index.html";
  console.log("button is clicked!");
});

function displayWatchlist() {
  const watchlistContainer = document.getElementById("watchlist-container");

  watchlistContainer.innerHTML = "";

  let movieList = document.createElement("div");
  movieList.classList.add("movies");

  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
  console.log(watchlist);

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `
        <div class="empty-watchlist">
            <h2>Your watchlist is empty. Add some movies!</h2>
        </div>
    `;
    return;
  }

  watchlist.forEach((movie, index) => {
    const runtime = movie.runtime;
    const minutes = runtime % 60;
    const hours = Math.floor(runtime / 60);
    const casts = movie.casts;
    const topCasts = casts.map((cast) => cast.name).join(", ");
    const director = movie.director;
    const direcctorName = director.name;
    console.log(direcctorName);

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

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-item");
    movieDiv.innerHTML = `
    <div class="detail-top">
      <img src="${currentMovie.posterUrl}" alt="${movie.title}">
      <div class="text-details">
        <h2>${movie.title}</h2>
        <div class="year-hour">
          <p>${currentMovie.year} <i class="fa-solid fa-circle"></i>${currentMovie.hoursInTime}</p>
        </div>
        <p class="genre">${currentMovie.genre}</p>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <p>${currentMovie.rating}</p>
        </div>
      </div>
      <i class="fa-solid fa-xmark remove-movie" data-index="${index}"></i>
    </div>
    <div class="detail-bottom">
      <p>${movie.overview}</p>
      <p>Director: ${director.name}</p>
      <p class="stars">Stars: ${topCasts}</p>
    </div>
    `;
    movieList.appendChild(movieDiv);
  });

  watchlistContainer.appendChild(movieList);

  const removeMovie = document.querySelectorAll(".fa-xmark");
  removeMovie.forEach((button) => {
    button.addEventListener("click", function () {
      const movieIndex = this.getAttribute("data-index");
      watchlist.splice(movieIndex, 1);

      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      displayWatchlist();
    });
  });
}

document.addEventListener("DOMContentLoaded", displayWatchlist);
