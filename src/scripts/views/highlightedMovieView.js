import View from './View';

class HighlightedMovieView extends View {
    _parentElement = document.querySelector('.header__wrapper');

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        const genres = this._data.genres.map(
            (genre) => `
                <li class="header__genre"><span>${genre.name}</span></li>
            `
        );

        return `
        <a class="header__inner movie-link" data-movie-id="${
            this._data.id
        }" href="#${this._data.id}" >
            <div class="header__content">
                <div class="header__el header__el--text">
                    <h1 class="title header__title">${
                        this._data.title
                    }<span class="header__runtime"></span></h1>
                    <span class="header__note">${this._data.note}</span>
                </div>
                <ul class="header__el header__el--genre">
                    ${genres.join('')}
                </ul>
            </div>
            <div class="movie-hl">
                <div class="movie-hl__gradient"></div>
                <div class="movie-hl__el">
                    <img src="${this._getPoster()}" alt="${this._data.title}">
                </div>
            </div>
        </a>
    `;
    }
}

export default new HighlightedMovieView();
