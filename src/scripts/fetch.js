import { AJAX } from './helpers';
import * as config from './config';

export const loadMovies = async function (parameter) {
    try {
        const featuredMovies = await AJAX(config.FEATURED_URL);
        const upcomingMovies = await AJAX(config.UPCOMING_URL);

        return { featuredMovies, upcomingMovies };
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};
