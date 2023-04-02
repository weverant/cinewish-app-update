import View from './View.js';
import posterView from './posterView.js';

class WishlistView extends View {
    _parentElement = document.querySelector('.wishlist');

    _window = document.querySelector('.page--wishlist');
    _open = document.querySelector('.wishlist__btn');

    render(data, render = true) {
        if (!data) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        console.log('rendddddddd');
    }

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        console.log('generate', this._data);
        return this._data
            .map((result) => posterView.render(result, false))
            .join('');
    }
}

export default new WishlistView();
