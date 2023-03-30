import View from './View';
import { POSTER_URL, POSTER_404 } from '../config';

class PreviewView extends View {
    _generateMarkup() {
        console.log(this._data);
        const posterURL = this._data.poster
            ? POSTER_URL('400') + this._data.poster
            : POSTER_404;

        return `
        <li class="movies__el" data-movie-id="${this._data.id}">
            <img class="movies__img" src="${posterURL}" alt="${this._data.title}">
        </li>
    `;
    }
}

export default new PreviewView();
