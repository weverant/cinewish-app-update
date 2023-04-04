import imgUrl from '../assets/images/404.jpg';

const ORIGINAL_POSTER_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_URL = (size) => `https://image.tmdb.org/t/p/w${size}`;
const POSTER_404 = imgUrl;

const MOVIE_URL = `/.netlify/functions/fetch-movies?id=`;
const FEATURED_URL = `/.netlify/functions/fetch-featured-movies`;
const UPCOMING_URL = `/.netlify/functions/fetch-upcoming-movies`;
const SEARCH_URL = `/.netlify/functions/fetch-searched-movies?query=`;

export {
    ORIGINAL_POSTER_URL,
    POSTER_URL,
    POSTER_404,
    MOVIE_URL,
    FEATURED_URL,
    UPCOMING_URL,
    SEARCH_URL,
};
