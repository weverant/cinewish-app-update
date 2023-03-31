import { POSTER_URL, POSTER_404 } from '../config';

export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
    }

    _getPoster() {
        return this._data.poster
            ? POSTER_URL('400') + this._data.poster
            : POSTER_404;
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}
