const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');
  
    const a = document.createElement('a');
    a.setAttribute('href', `movie-details.html?id=${result.id}`);

    const img = document.createElement('img');

    result.poster_path ?
      img.setAttribute('src', `https://image.tmdb.org/t/p/w500${result.poster_path}`) :
      img.setAttribute('src', 'images/no-image.jpg');

    img.classList.add('card-img-top');
    img.setAttribute('alt', result.title);

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = result.title;

    const p = document.createElement('p');
    p.classList.add('card-text');

    const small = document.createElement('small');
    small.classList.add('text-muted');
    small.textContent = `Release: ${result.release_date}`;

    p.appendChild(small);
    
    divBody.appendChild(h5);
    divBody.appendChild(p);

    a.appendChild(img);

    div.appendChild(a);
    div.appendChild(divBody);

    document.querySelector('#popular-movies').appendChild(div);
  });
};

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log(results);

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');
  
    const a = document.createElement('a');
    a.setAttribute('href', `tv-details.html?id=${result.id}`);

    const img = document.createElement('img');

    result.poster_path ?
      img.setAttribute('src', `https://image.tmdb.org/t/p/w500${result.poster_path}`) :
      img.setAttribute('src', 'images/no-image.jpg');

    img.classList.add('card-img-top');
    img.setAttribute('alt', result.name);

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = result.name;

    const p = document.createElement('p');
    p.classList.add('card-text');

    const small = document.createElement('small');
    small.classList.add('text-muted');
    small.textContent = `Aired: ${result.first_air_date}`;

    p.appendChild(small);
    
    divBody.appendChild(h5);
    divBody.appendChild(p);

    a.appendChild(img);

    div.appendChild(a);
    div.appendChild(divBody);

    document.querySelector('#popular-shows').appendChild(div);
  });
};

async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieID}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
      <div>
        ${
          movie.poster_path ?
          `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` :
          `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
        }
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>${movie.tagline}</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${movie.production_companies.map(company => `${company.name}`).join(', ')}
      </div>
    </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
};

// Display tv shows details
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showID}`);
  console.log(show);

  displayBackgroundImage('show', show.backdrop_path);

  // Details Top
  const detailsTop = document.createElement('div');
  detailsTop.classList.add('details-top');

  // Show Image Poster
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.setAttribute('alt', show.name);
  if(show.poster_path) {
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${show.poster_path}`);
  } else {
    img.setAttribute('src', 'images/no-image.jpg')
  };

  // Details Top Text
  const div = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = show.name;

  const rating = document.createElement('p');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-star', 'text-primary');
  const ratingNumber = document.createTextNode(`${show.vote_average.toFixed(1)} / 10`);
  rating.appendChild(icon);
  rating.appendChild(ratingNumber);

  const releaseDate = document.createElement('p');
  releaseDate.classList.add('text-muted');
  releaseDate.textContent = `Release Date: ${show.first_air_date}`;

  const overview = document.createElement('p');
  overview.textContent = show.overview;

  const h5 = document.createElement('h5');
  h5.textContent = 'Genres';

  const genres = document.createElement('ul');
  genres.classList.add('list-group');
  for(let i = 0; i < show.genres.length; i++) {
    const li = document.createElement('li');
    li.textContent = show.genres[i].name;
    genres.appendChild(li);
  };

  const homepage = document.createElement('a');
  homepage.setAttribute('href', show.homepage);
  homepage.setAttribute('target', '_blank');
  homepage.classList.add('btn');
  homepage.textContent = 'Visit Show Homepage';

  div.appendChild(title);
  div.appendChild(rating);
  div.appendChild(releaseDate);
  div.appendChild(overview);
  div.appendChild(h5);
  div.appendChild(genres);
  div.appendChild(homepage);

  detailsTop.appendChild(img);
  detailsTop.appendChild(div);

  // Details Bottom
  const detailsBottom = document.createElement('div');
  detailsBottom.classList.add('details-bottom');
  
  const showInfoTitle = document.createElement('h2');
  showInfoTitle.textContent = show.tagline;

  const showInfoList = document.createElement('ul');

  const episodes = document.createElement('li');
  episodes.innerHTML = `<span class="text-secondary">Number of Episodes: </span>${show.number_of_episodes}`;

  const lastEpisode = document.createElement('li');
  lastEpisode.innerHTML = `<span class="text-secondary">Last Episode to Air: </span>${show.last_episode_to_air.name}`;

  const status = document.createElement('li');
  status.innerHTML = `<span class="text-secondary">Status: </span>${show.status}`;

  showInfoList.appendChild(episodes);
  showInfoList.appendChild(lastEpisode);
  showInfoList.appendChild(status);

  const h4 = document.createElement('h4');
  h4.textContent = 'Production Companies';

  const companies = document.createElement('div');
  companies.classList.add('list-group');
  for(let i = 0; i < show.production_companies.length; i++) {
    const text = document.createTextNode(show.production_companies[i].name);
    companies.appendChild(text);
    if(i < show.production_companies.length - 1) {
      const comma = document.createTextNode(', ');
      companies.appendChild(comma);
    }
  };

  detailsBottom.appendChild(showInfoTitle);
  detailsBottom.appendChild(showInfoList);
  detailsBottom.appendChild(h4);
  detailsBottom.appendChild(companies);

  document.querySelector('#show-details').appendChild(detailsTop);
  document.querySelector('#show-details').appendChild(detailsBottom);
}

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.left = '0';
  overlayDiv.style.opacity = '0.1';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.zIndex = '-1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href="movie-details.html?id=${result.id}">
      ${
        result.poster_path ?
        `<img
          src="https://image.tmdb.org/t/p/w500${result.poster_path}"
          class="card-img-top"
          alt="${result.title}"
        />` :
        `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${result.title}"
        />`
      }
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);
  });

  initSwiper();
};

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4200,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  });
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

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`
  );

  const data = await response.json();

  hideSpinner();

  return data;
};

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
};
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
};

// Highlight Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.getAttribute('href') === global.currentPage ? link.classList.add('active') : '');
};

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Init App
function init() {
  switch (global.currentPage) {
    case ('/'):
    case ('/index.html'):
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('search page');
      break;
  };

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);