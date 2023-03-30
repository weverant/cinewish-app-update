import * as model from './model';
import posterView from './views/posterView';
import {
    displayMoviesViewInstance,
    featuredMoviesViewInstance,
    upcomingMoviesViewInstance,
} from './views/displayMoviesView';

import '../styles/app.scss';
import { FEATURED_URL, UPCOMING_URL } from './config';

const controlMovies = async function () {
    try {
        await model.loadMovies(FEATURED_URL, 'featured');
        await model.loadMovies(UPCOMING_URL, 'upcoming');

        featuredMoviesViewInstance.render(model.getMovies('featured'));
        upcomingMoviesViewInstance.render(model.getMovies('upcoming'));
    } catch (err) {
        console.error(err);
    }
};

const init = () => {
    displayMoviesViewInstance.addHandlerRender(controlMovies);
};

init();
