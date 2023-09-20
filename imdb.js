let apiUrl = "https://www.omdbapi.com/";

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const moviesContainer = document.getElementById('moviesContainer');
    const moviePage = document.getElementById('moviePage');
    searchInput.value = "";
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Function to fetch search results
    async function fetchSearchResults(query) {
        const response = await fetch(`${apiUrl}?s=${query}&apikey=948c321b`);
        const data = await response.json();
        return data.Search || [];
    }

    // Function to display search results
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length > 0) {
            results.forEach(result => {
                const card = document.createElement('div');
                card.classList.add('card', 'searchResultItem', 'col-8');
                card.style.marginTop = "10px";
                card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-2">
                            <a href="./movieDetails/movieDetails.html?id=${result.imdbID}">
                                <img src="${result.Poster}" class="img-fluid rounded-start" alt="${result.Title}">
                            </a>
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <a class="nav-link" href="./movieDetails/movieDetails.html?id=${result.imdbID}">
                                    <h5 class="card-title" title="${result.Title}">${result.Title}</h5>
                                </a>
                                <p class="card-text">${result.Year}</p>
                                <button data-mdb-ripple-unbound="true" data-mdb-ripple-duration="0" class="btn btn-primary btn-sm favouriteBtn" data-movie='${JSON.stringify(result)}'>Add to Favorite</button>
                            </div>
                        </div>
                    </div>
            `;
                searchResults.appendChild(card);
            });
        } else {
            searchResults.innerHTML = "Movie not found";
        }
    }

    // Event listener for search input
    searchInput.addEventListener('input', async function () {
        const query = this.value.trim();
        if (query.length > 0) {
            const results = await fetchSearchResults(query);
            displaySearchResults(results);
        } else {
            searchResults.innerHTML = '';
        }
    });

    // Event listener for favorite buttons in search results and movie cards
    document.addEventListener('click', async function (event) {
        if (event.target.classList.contains('favouriteBtn')) {
            console.log(event);
            const movie = JSON.parse(event.target.dataset.movie); // Parse the JSON string
            const id = movie.imdbID;
            if (!favourites.some(favMovie => favMovie.imdbID === id)) {
                favourites.push(movie);
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }
        }
    });
});
