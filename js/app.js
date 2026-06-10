const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

const movieModal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");


async function searchMovies(query) {
    try {
        movieContainer.innerHTML = "<p>Loading...</p>";

        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );

        const data = await response.json();

        if (data.results.length === 0) {
            movieContainer.innerHTML =
                "<h2>No movies found.</h2>";
            return;
        }

        displayMovies(data.results);

    } catch (error) {

        console.error(error);

        movieContainer.innerHTML =
            "<p>Failed to load movies.</p>";
    }
}

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

        const movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.title}" loading="lazy">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>
                    <strong>Rating:</strong>
                    ${movie.vote_average ?? "N/A"}
                </p>

                <p>
                    <strong>Release:</strong>
                    ${movie.release_date ?? "N/A"}
                </p>

                <p>
                    ${movie.overview
                        ? movie.overview.substring(0, 120) + "..."
                        : "No description available."}
                </p>

                <button class="favorite-btn">
                    Add to Favorites
                </button>

            </div>
        `;

        movieCard.addEventListener("click", () => {
            showMovieDetails(movie);
        });

        const favoriteBtn =
            movieCard.querySelector(".favorite-btn");

        favoriteBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            const favorites =
                JSON.parse(
                    localStorage.getItem("favorites")
                ) || [];

            const exists = favorites.some(
                fav => fav.id === movie.id
            );

            if (!exists) {

                favorites.push(movie);

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(favorites)
                );

                alert(`${movie.title} added to favorites.`);

            } else {
                alert(`${movie.title} already exists in favorites.`);

            }
        });

        movieContainer.appendChild(movieCard);
    });
}

async function getPopularMovies() {
    console.log("Fetching popular movies...");

    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );

        const data = await response.json();

        console.log(data);

        displayMovies(data.results);

    } catch (error) {
        console.error(error);
    }
}

function showMovieDetails(movie) {

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    modalBody.innerHTML = `
        <h2>${movie.title}</h2>

        <img
            src="${poster}"
            alt="${movie.title}"
            style="
                width:100%;
                max-height:450px;
                object-fit:cover;
                border-radius:10px;
            "
        >

        <p>
            <strong>Rating:</strong>
            ${movie.vote_average ?? "N/A"}
        </p>

        <p>
            <strong>Release:</strong>
            ${movie.release_date ?? "N/A"}
        </p>

        <p>
            ${movie.overview ?? "No description available."}
        </p>
    `;

    movieModal.style.display = "block";
    movieModal.scrollTop = 0;
}


if (closeModal && movieModal) {

    closeModal.addEventListener("click", () => {
        movieModal.style.display = "none";
    });

    movieModal.addEventListener("click", (e) => {
        if (e.target === movieModal) {
            movieModal.style.display = "none";
        }
    });

}

closeModal.addEventListener("click", () => {
    movieModal.style.display = "none";
});

movieModal.addEventListener("click", (e) => {

    if (e.target === movieModal) {
        movieModal.style.display = "none";
    }

});

function showFavorites() {

    const favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    displayMovies(favorites);
}

const viewFavoritesBtn =
    document.getElementById("viewFavoritesBtn");

viewFavoritesBtn.addEventListener(
    "click",
    showFavorites
);

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query) {
        searchMovies(query);
    }
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchMovies(searchInput.value.trim());
    }
});

document.addEventListener("DOMContentLoaded", () => {
    getPopularMovies();
});