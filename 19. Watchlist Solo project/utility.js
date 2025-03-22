export function showDetails(array, movie, director) {
  const movieDetailsInModal = document.getElementById("movie-details");

  movieDetailsInModal.innerHTML = `
    <div class="detail-top">
      <i class="fa-solid fa-xmark"></i>
      <img src="${array.posterUrl}" alt="${movie.title}">
      <div class="text-details">
        <h2>${movie.title}</h2>
        <div class="year-hour">
          <p>${array.year} <i class="fa-solid fa-circle"></i>${array.hoursInTime}</p>
        </div>
        <p class="genre">${array.genre}</p>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <p>${array.rating}</p>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <p>${movie.overview}</p>
      <p>Director: ${director.name}</p>
      <p class="stars">Stars: ${array.stars}</p>
      <button class="watchlist" id="add-watchlist">
        <i class="fa-solid fa-plus"></i>
        Add to Watchlist
      </button>
    </div>
  `;
}
