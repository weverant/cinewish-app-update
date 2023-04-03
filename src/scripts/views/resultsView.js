import resultView from './resultView.js';
import View from './View.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.search-results');
    _errorMessage = 'No results found';
    _message = '';

    _generateMarkup() {
        return this._data
            .map((result) => resultView.render(result, false))
            .join('');
    }
}

export default new ResultsView();
