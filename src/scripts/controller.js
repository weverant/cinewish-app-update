import '../styles/app.scss';

import * as model from './model';

import {
    displayMoviesViewInstance,
    featuredMoviesViewInstance,
    upcomingMoviesViewInstance,
} from './views/displayMoviesView';
import highlightedMovieView from './views/highlightedMovieView';
import detailsView from './views/detailsView';
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

        featuredMoviesViewInstance.render(model.getMovies('featured'));
        upcomingMoviesViewInstance.render(model.getMovies('upcoming'));
        highlightedMovieView.render(model.getHighlightedMovie());
    } catch (err) {
        console.error(err);
    }
};

const controlMovieDetails = async () => {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        detailsView.setPointer(id);

        await model.loadMovie(id);

        detailsView.render(model.state.movie);
        detailsView.toggleWindow();
    } catch (err) {
        console.log(err);
    }
};

const controlWishlist = async () => {
    wishlistView.render(model.state.wishlist);
};

const controlAddToWishlist = async () => {
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    recipeView.update(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);
};

const init = () => {
    displayMoviesViewInstance.addHandlerRender(controlMovieList);
    detailsView.addHandlerRender(controlMovieDetails);
    wishlistView.addHandlerRender(controlWishlist);
};

init();
const test = new tab();
