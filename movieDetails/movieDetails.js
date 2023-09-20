document.addEventListener('DOMContentLoaded', function () {
    const moviePage = document.getElementById('moviePage');

    // Get the movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');

    // Fetch and display movie details
    if (movieID) {
        fetchMovieDetails(movieID)
            .then(movie => {
                displayMovieDetails(movie);
            })
            .catch(error => console.error(error));
    }
    // Function to fetch movie details
    async function fetchMovieDetails(id) {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=755f786c`);
        const data = await response.json();
        return data;
    }

    // Function to display movie details
    function displayMovieDetails(movie) {
        moviePage.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0" style="padding:25px;background-color: #000;color:#fff">
                    <div class="col-md-4" style="margin-left:25px">
                        <img src="${movie.Poster}" class="img-fluid rounded-start" alt="${movie.Title}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h4 class="card-title" style="font-weight:bold;color:#ff6a00;">${movie.Title}</h4>
                            <p class="card-text"><small>Year: ${movie.Year}</small></p>
                            <p class="card-text">Plot: ${movie.Plot}</p>
                            <p class="card-text">Actors: <span style="font-weight:bold;">${movie.Actors}<span></p>
                            <p class="card-text">Director: ${movie.Director}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


});
