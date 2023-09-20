const favouritesList = document.getElementById('favoriteMovieContainer');
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

//get movie data from api
async function getData(movieID) {
    const result = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=948c321b`);
    const movieDetails = await result.json();
    return movieDetails;
}

async function displayFavourites() {
    favouritesList.innerHTML = '';
    for (const movie of favourites) {
        const movieDetails = await getData(movie.imdbID); //get movie details
        const listItem = document.createElement('div');
        listItem.classList.add('favouriteListItem');
        listItem.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0" style="padding:25px;background-color: #352f2f;color:#fff">
                    <div class="col-md-4" style="margin-left:25px">
                        <img src="${movieDetails.Poster}" class="img-fluid rounded-start" alt="${movieDetails.Title}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h4 class="card-title" style="font-weight:bold;color:#ff6a00;">${movieDetails.Title}</h4>
                            <p class="card-text"><small>Year: ${movieDetails.Year}</small></p>
                            <p class="card-text">Plot: ${movieDetails.Plot}</p>
                            <p class="card-text">Actors: <span style="font-weight:bold;">${movieDetails.Actors}<span></p>
                            <p class="card-text">Director: ${movieDetails.Director}</p>
                            <button class="btn btn-danger btn-sm removeBtn" data-id="${movieDetails.imdbID}">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        favouritesList.appendChild(listItem);
    }
}

// Event listener for remove buttons in favourites list
document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('removeBtn')) {
        const id = event.target.dataset.id;
        favourites = favourites.filter(item => item.imdbID !== id);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        const snackbar = document.getElementById('removeFavSnackbar');
        snackbar.style.visibility = 'visible';
        setTimeout(() => {
            snackbar.style.visibility = 'hidden';
        }, 3000);
        displayFavourites();
    }
});

displayFavourites();
