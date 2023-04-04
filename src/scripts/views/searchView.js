import { debounce } from '../helpers';

class SearchView {
    _searchField = document.querySelector('.search__field');

    getQuery() {
        const query = this._searchField.value;
        return query;
    }

    addHandlerSearch(handler) {
        this._searchField.addEventListener(
            'input',
            debounce(() => {
                handler();
            }, 400)
        );
    }
}

export default new SearchView();
