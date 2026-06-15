# Overview

Movie Companion is a web application that helps users discover and explore movies using real-time data from The Movie Database (TMDb) API. Users can search for movies, browse popular titles, view detailed movie information, and save their favorite movies for later viewing.

The purpose of this project was to strengthen my web application development skills by working with external APIs, asynchronous JavaScript, DOM manipulation, browser storage, and responsive user interface design. This project provided practical experience building an interactive application that retrieves and displays live data from a third-party service.

[Software Demo Video](https://youtube.link.here)

# Web Pages

## Home Page

The home page displays a collection of popular movies retrieved from the TMDb API. Users can browse movies and search for specific titles using the search bar.

## Movie Details Modal

When a movie card is selected, a modal window opens and displays additional information about the movie, including its poster, rating, release date, and overview.

## Favorites View

Users can save movies to their favorites list. Favorite movies are stored using Local Storage, allowing them to persist between browser sessions.

# Development Environment

## Tools Used

- Visual Studio Code
- Git
- GitHub
- Google Chrome Developer Tools

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- TMDb API
- Local Storage API

# Useful Websites

- https://developer.mozilla.org
- https://developer.themoviedb.org
- https://javascript.info
- https://www.w3schools.com/js/

# Future Work

- Add pagination for search results
- Add movie genre filtering
- Add dark/light theme support
- Add the ability to remove movies from favorites
- Display additional movie details such as cast, trailers, and reviews
- Deploy the application online using GitHub Pages

# Code Highlights

The application uses JavaScript's Fetch API to retrieve movie data from the TMDb API and dynamically display results on the page.

```javascript
const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
);

const data = await response.json();
displayMovies(data.results);
```

Movie cards are created dynamically and added to the page:

```javascript
const movieCard = document.createElement("div");

movieCard.classList.add("movie-card");

movieCard.innerHTML = `
    <h3>${movie.title}</h3>
`;
```

Favorites are stored using Local Storage:

```javascript
const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

favorites.push(movie);

localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);
```

The application includes error handling to manage failed API requests and provide feedback to users when data cannot be loaded.