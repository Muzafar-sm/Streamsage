// Set dark mode as default
document.body.classList.add('dark-mode');
document.getElementById('toggle-theme').textContent = '🌞'; // Light mode icon by default

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light-mode') {
  document.body.classList.remove('dark-mode');
  document.getElementById('toggle-theme').textContent = '🌗'; // Dark mode icon
}

// Toggle theme on button click
document.getElementById('toggle-theme').addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light-mode');
    document.getElementById('toggle-theme').textContent = '🌗';
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
    document.getElementById('toggle-theme').textContent = '🌞';
  }
});
// const searchBtn = document.getElementById("search-btn");
// const searchInput = document.getElementById("search-input");
// const resultsContainer = document.getElementById("results");

// searchBtn.addEventListener("click", async (e) => {
//   const query = searchInput.value.trim();

//   if (!query) return;

//   resultsContainer.innerHTML = "<p>🔍 Searching...</p>";

//   try {
//     const res = await fetch(`/api/movies/${encodeURIComponent(query)}`);
//     const data = await res.json();

//     if (data.error) {
//       resultsContainer.innerHTML = `<p>❌ ${data.error}</p>`;
//     } else {
//       displayMovieCard(data);
//     }
//   } catch (err) {
//     resultsContainer.innerHTML = `<p>⚠️ Something went wrong.</p>`;
//     console.error(err);
//   }
// });

// function displayMovieCard(movie) {
//   resultsContainer.innerHTML = `
//     <div class="movie-card">
//       <img src="${movie.Poster}" alt="${movie.Title}" />
//       <h2>${movie.Title} (${movie.Year})</h2>
//       <p><strong>Genre:</strong> ${movie.Genre}</p>
//       <p><strong>Plot:</strong> ${movie.Plot}</p>
//       <p><strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}</p>
//     </div>
//   `;
// }
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return;

  resultsContainer.innerHTML = "<p>🔍 Searching...</p>";

  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.results.length === 0) {
      resultsContainer.innerHTML = `<p>❌ No results found.</p>`;
    } else {
      displayMovieCard(data.results[0]); // You can loop if you want multiple results
    }
  } catch (err) {
    resultsContainer.innerHTML = `<p>⚠️ Something went wrong.</p>`;
    console.error(err);
  }
});

function displayMovieCard(movie) {
  resultsContainer.innerHTML = `
    <div class="movie-card">
      <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" />
      <h2>${movie.title} (${movie.release_date?.split('-')[0]})</h2>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
    </div>
  `;
}
