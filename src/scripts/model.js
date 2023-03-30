import { AJAX } from './helpers';
import { MOVIE_URL, FEATURED_URL, UPCOMING_URL } from './config';

export const state = {
    highlightedMovie: {},
    movie: {},
    search: {
        query: '',
        results: [],
    },
    featured: [],
    upcoming: [],
    wishlist: [],
};

const createMovieObject = (data) => {
    const movie = data;
    return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        genres: [...movie.genres],
        note: movie.vote_average,
        ...(movie.key && { key: movie.key }),
    };
};

/*
 *
 *   Loading data
 *
 */
export const loadMovie = async (id) => {
    try {
        const data = await AJAX(MOVIE_URL + id);
        state.movie = createMovieObject(data);

        if (state.wishlist.some((movie) => movie.id === id))
            state.movie.isInWishlist = true;
        else state.recipe.isInWishlist = false;
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};

export const loadMovieList = async (url, source) => {
    try {
        const data = await AJAX(url);

        state[source] = data.results.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                ...(movie.key && { key: movie.key }),
            };
        });
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};

export const loadHighlightedMovie = async (object) => {
    try {
        const data = await AJAX(MOVIE_URL + object.id);

        state.highlightedMovie = createMovieObject(data);
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};

/*
 *
 *   Get data
 *
 */
export const getMovies = (source) => {
    return state[source].slice(1, 20);
};

export const getHighlightedMovie = () => {
    return state.highlightedMovie;
};

const init = () => {
    const storage = localStorage.getItem('wishlist');
    if (storage) state.wishlist = JSON.parse(storage);
};

init();
