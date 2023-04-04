class Tab {
    _tab;
    _links = document.querySelectorAll('.tab-link');
    _currentTab = document.querySelector('.page--open');

    addHandlerClick() {
        this._links.forEach((link) => {
            link.addEventListener('click', () => this._render(link));
        });
    }

    _render(link) {
        const tab = document.querySelector(`.page--${link.dataset.tab}`);

        this._currentTab.classList.remove('page--open');
        tab.classList.add('page--open');
        this._currentTab = tab;

        this._onSearchTabSwicth();
    }

    _onSearchTabSwicth() {
        if (!this._currentTab.classList.contains('page--search')) return;

        document.querySelector('.search__field').focus();
    }
}

export default new Tab();
