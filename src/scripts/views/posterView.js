import View from './View';

class PosterView extends View {
    _generateMarkup() {
        return `
        <li class="movies__el" data-movie-id="${this._data.id}">
            <a class="movie-link" href="#${this._data.id}">
                <img 
                class="movies__img" 
                src="${this._getPoster()}" 
                alt="${this._data.title}">
            </a>
        </li>
    `;
    }
}

export default new PosterView();
