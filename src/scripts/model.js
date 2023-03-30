import { AJAX } from './helpers';
import { MOVIE_URL, FEATURED_URL, UPCOMING_URL } from './config';

export const state = {
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
    const { movie } = data;
    return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        // genre: movie.genre,
        // note: movie.vote_average,
        ...(movie.key && { key: movie.key }),
    };
};

// export const loadMovie = async function (id) {
//     try {
//         const data = await AJAX(MOVIE_URL + id);
//         state.movie = createMovieObject(data);

//         if (state.wishlist.some((movie) => movie.id === id))
//             state.movie.isInWishlist = true;
//         else state.recipe.isInWishlist = false;
//     } catch (err) {
//         console.error(`${err} 💥💥💥💥`);
//         throw err;
//     }
// };

export const loadMovies = async function (url, source) {
    try {
        const data = await AJAX(url);

        state[source] = data.results.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                note: movie.vote_average,
                ...(movie.key && { key: movie.key }),
            };
        });

        console.log(state.featured);
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};

export const getMovies = (source) => {
    return state[source].slice(1, 20);
};

const init = () => {
    const storage = localStorage.getItem('wishlist');
    if (storage) state.wishlist = JSON.parse(storage);
};

init();
