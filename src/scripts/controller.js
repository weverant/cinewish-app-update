import '../styles/app.scss';

import * as model from './model';

import {
    displayMoviesViewInstance,
    featuredMoviesViewInstance,
    upcomingMoviesViewInstance,
} from './views/displayMoviesView';
import highlightedMovieView from './views/highlightedMovieView';

import { FEATURED_URL, UPCOMING_URL } from './config';

const controlMovieList = async () => {
    try {
        await model.loadMovieList(FEATURED_URL, 'featured');
        await model.loadMovieList(UPCOMING_URL, 'upcoming');
        await model.loadHighlightedMovie(model.state.featured[0]);

        featuredMoviesViewInstance.render(model.getMovies('featured'));
        upcomingMoviesViewInstance.render(model.getMovies('upcoming'));
        highlightedMovieView.render(model.getHighlightedMovie());
    } catch (err) {
        console.error(err);
    }
};

const init = () => {
    displayMoviesViewInstance.addHandlerRender(controlMovieList);
};

init();
