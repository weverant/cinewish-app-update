export default class Tab {
    _tab;
    _links = document.querySelectorAll('.tab-link');
    _currentTab = document.querySelector('.page--open');

    constructor() {
        this._addHandlerClick();
    }

    _addHandlerClick() {
        this._links.forEach((link) => {
            link.addEventListener('click', () => this._render(link));
        });
    }

    _render(link) {
        const tab = document.querySelector(`.page--${link.dataset.tab}`);

        this._currentTab.classList.remove('page--open');
        tab.classList.add('page--open');
        this._currentTab = tab;
    }
}
