import '../styles/app.scss';

import * as model from './model';

import {
    displayMoviesViewInstance,
    featuredMoviesViewInstance,
    upcomingMoviesViewInstance,
} from './views/displayMoviesView';
import highlightedMovieView from './views/highlightedMovieView';
import detailsView from './views/detailsView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import wishlistView from './views/wishlistView';

import tab from './tabs/Tab';

import { FEATURED_URL, UPCOMING_URL } from './config';

const controlMovieList = async () => {
    try {
        document.body.style.cursor = 'progress';

        await model.loadMovieList(FEATURED_URL, 'featured');
        await model.loadMovieList(UPCOMING_URL, 'upcoming');
        await model.loadHighlightedMovie(model.state.featured[0]);

        document.body.style.cursor = '';
        setTimeout(
            () =>
                (document.body.style =
                    '--move-from: 0; --scale-from: 1; --fade-from: 1;'),
            1000
        );

        featuredMoviesViewInstance.render(model.getMovies('featured'));
        upcomingMoviesViewInstance.render(model.getMovies('upcoming'));
        highlightedMovieView.render(model.getHighlightedMovie());
    } catch (err) {
        console.error(err);
    }
};

const controlMovieDetails = async () => {
    try {
        const id = Number(window.location.hash.slice(1));
        if (!id) {
            detailsView.hideWindow();
            return;
        }

        detailsView.setPointer(id);

        wishlistView.update(model.state.wishlist);

        await model.loadMovie(id);

        detailsView.render(model.state.movie);
        detailsView.toggleWindow();
    } catch (err) {
        console.log(err);
    }
};

const controlSearchResults = async function () {
    try {
        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);

        resultsView.render(model.getSearchResults());
    } catch (err) {
        console.log(err);
    }
};

const controlAddToWishlist = async () => {
    if (!model.state.movie.isInWishlist) model.addToWishlist(model.state.movie);
    else model.deleteFromWishlist(model.state.movie.id);

    detailsView.update(model.state.movie);

    wishlistView.render(model.state.wishlist);
};

const controlWishlist = async () => {
    wishlistView.render(model.state.wishlist);
};

const init = () => {
    tab.addHandlerClick();
    wishlistView.addHandlerRender(controlWishlist);
    displayMoviesViewInstance.addHandlerRender(controlMovieList);
    detailsView.addHandlerRender(controlMovieDetails);
    detailsView.addHandlerAddToWishlist(controlAddToWishlist);
    searchView.addHandlerSearch(controlSearchResults);
};

init();
