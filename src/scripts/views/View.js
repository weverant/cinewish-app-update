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

    _clear() {
        this._parentElement.innerHTML = '';
    }
}
