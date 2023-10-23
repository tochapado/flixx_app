const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const results = await fetchAPIData('movie/popular');
  console.log(results);
};

// Fetch data from TMDB Api
async function fetchAPIData(endpoint) {
  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '0d13c1b88ff7b5734e9fcae3ecc97306';
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDEzYzFiODhmZjdiNTczNGU5ZmNhZTNlY2M5NzMwNiIsInN1YiI6IjY1MzY5NjgwOGNmY2M3MDBhYTAzOTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNt7raDwXUZMf2RNDPoKeG8s81EwcXF0vVfIJsdvxAs';

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDEzYzFiODhmZjdiNTczNGU5ZmNhZTNlY2M5NzMwNiIsInN1YiI6IjY1MzY5NjgwOGNmY2M3MDBhYTAzOTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNt7raDwXUZMf2RNDPoKeG8s81EwcXF0vVfIJsdvxAs'
  //   }
  // };

  const response = await fetch(
    `${API_URL}${endpoint}?language=en-US&page=1`
  );

  return await response.json();
};

// Highlight Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.getAttribute('href') === global.currentPage ? link.classList.add('active') : '');
};

// Init App
function init() {
  switch (global.currentPage) {
    case ('/'):
    case ('/index.html'):
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('movie details');
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case '/search.html':
      console.log('search page');
      break;
  };

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);

console.log(global.currentPage)