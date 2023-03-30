import View from './View.js';
import posterView from './posterView.js';

class DisplayMoviesView extends View {
    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        return this._data
            .map((result) => posterView.render(result, false))
            .join('');
    }
}

class FeaturedMoviesView extends DisplayMoviesView {
    _parentElement = document.querySelector('.popular-movies__el');
}
class UpcomingMoviesView extends DisplayMoviesView {
    _parentElement = document.querySelector('.upcoming-movies__el');
}

export const displayMoviesViewInstance = new DisplayMoviesView();
export const featuredMoviesViewInstance = new FeaturedMoviesView();
export const upcomingMoviesViewInstance = new UpcomingMoviesView();
