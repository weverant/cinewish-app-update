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

        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(
            this._parentElement.querySelectorAll('*')
        );

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            if (!curEl) return;

            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            // Updates changed ATTRIBUES
            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach((attr) =>
                    curEl.setAttribute(attr.name, attr.value)
                );
        });
    }

    _getPoster() {
        return this._data.poster
            ? POSTER_URL('400') + this._data.poster
            : POSTER_404;
    }

    _getReleaseDate() {
        return this._data.release_date
            ? `(${this._data.release_date.substr(0, 4)})`
            : '';
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}
