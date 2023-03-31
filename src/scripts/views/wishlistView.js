import View from './View.js';
import posterView from './posterView.js';

class WishlistView extends View {
    _parentElement = document.querySelector('.wishlist');

    _window = document.querySelector('.page--wishlist');
    _open = document.querySelector('.wishlist__btn');

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        return this._data
            .map((result) => posterView.render(result, false))
            .join('');
    }
}

export default new WishlistView();
