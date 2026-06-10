# TODO

## Completed
- [x] Fix load on open by fetching popular movies on `DOMContentLoaded`.
- [x] Implement `showMovieDetails(movie)` and wire modal close.
- [x] Remove repeated `getPopularMovies()` call from Enter key handler.

## Steps to complete
1. [x] Inspect existing JS/HTML to locate why nothing loads on open.
2. [x] Update `js/app.js` to fetch popular movies on initial page load (`DOMContentLoaded`).
3. [x] Add/implement missing `showMovieDetails(movie)` to populate `#modalBody` and display `#movieModal`.
4. [x] Ensure modal closes on `#closeModal` click and clicking outside.
5. [x] Remove/avoid unintended repeated `getPopularMovies()` calls on every Enter (make Enter only trigger search).
6. [ ] Test by loading `index.html` and verifying movies appear immediately and modal works.


