import View from './View';

class DetailsView extends View {
    _parentElement = document.querySelector('.movie-details');

    _backdrop = document.querySelector('.backdrop');

    constructor() {
        super();
        this._addHandlerHideWindow();
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach((ev) =>
            window.addEventListener(ev, handler)
        );
    }

    addHandlerAddToWishlist(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-wishlist');
            if (!btn) return;
            handler();
        });
    }

    toggleWindow() {
        this._parentElement.classList.toggle('page--open');
    }

    setPointer(id) {
        const targetElement = document.querySelector(
            `.movie-link[href="#${id}"]`
        );

        if (!targetElement) return;

        targetElement.classList.add('loading-cursor');
    }

    _disablePointer() {
        const pointer = document.querySelector('.loading-cursor');

        if (!pointer) return;

        pointer.classList.remove('loading-cursor');
    }

    render(data, render = true) {
        this._disablePointer();

        super.render(data, (render = true));
    }

    _addHandlerHideWindow() {
        document.addEventListener('click', (e) => {
            if (
                ['backdrop', 'btn'].some((className) =>
                    e.target.classList.contains(className)
                )
            ) {
                this.toggleWindow();
                this._clearHash();
            }
        });
    }

    _clearHash() {
        window.location.hash = '';
    }

    _generateMarkup() {
        const releaseDate = this._data.release_date
            ? `(${this._data.release_date.substr(0, 4)})`
            : '';

        return `
        <button class="btn" data-section="index">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
            <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
            />
            </svg>
        </button>
        <div class="movie__content">
            <div class="movie__poster">
                <img src="${this._getPoster()}" alt="${this._data.title}">
                <div class="movie__info">
                    <span class="movie__el">${this._data.runtime}min</span>
                    <span class="movie__el">${this._data.note}</span>
                </div>
            </div>
            <div class="movie__poster--deco">
                <img src="${this._getPoster()}" alt="${this._data.title}">
            </div>
            <div class="movie__desc">
                <h2 class="movie__title title">${
                    this._data.title
                }<span>${releaseDate}</span></h2>
                <p class="movie__overview">${this._data.overview}</p>
            </div>
        </div>
        <button class="trigger btn-wishlist ${
            this._data.isInWishlist ? 'trigger--added' : ''
        }"></button>
        <div class="backdrop"></div>
    `;
    }
}

export default new DetailsView();
