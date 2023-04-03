import View from './View';

class ResultView extends View {
    _generateMarkup() {
        const shortOverview =
            this._data.overview.length > 150
                ? `${this._data.overview.substring(0, 150)}…`
                : this._data.overview;

        return `
        <li class="result">
            <a class="movie-link result__inner" href="#${this._data.id}">
                <img 
                    class="result__img" 
                    src="${this._getPoster()}"  
                    alt="${this._data.title}"
                >
                <div class="result__content">
                    <h2 class="title result__title">${
                        this._data.title
                    } <span>${this._getReleaseDate()}</span></h2>
                    <span class="result__overview">${shortOverview}</span>
                </div>
            </a>
        </li>
    `;
    }
}

export default new ResultView();
