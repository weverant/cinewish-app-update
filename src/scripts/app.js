'use strict';

// import '../styles/app.scss';

const API_KEY = import.meta.env.TMDB_API_KEY;

console.log(API_KEY);

const link = document.querySelector('.link');

var existOverview = document.getElementsByClassName('link');
if (existOverview.length > 0) {
    const activeLink = document.querySelector('.link__el');
    activeLink.addEventListener('click', function (e) {
        let currentLink = this.href;
        let bg = document.querySelector('.bg-transition');

        document.body.classList.add('animation');
        document.body.addEventListener('animationend', function () {
            window.location = currentLink;
        });
        e.preventDefault();
    });
}

const mainHideId = document.querySelector('.mainHide');

var existMain = document.getElementsByClassName('mainHide');
if (existMain.length > 0) {
    const mainMovie = document.querySelector('.movie-hl');
    const header = document.querySelector('.header__el--text');
    const genre = document.querySelector('.header__el--genre');
    const genreMovie = document.querySelector('.movie-genre__el');
    const moviesList = document.querySelector('.popular-movies__el');
    const moviesListUp = document.querySelector('.upcoming-movies__el');
    const movieWrapper = document.querySelector('.movie');
    const movieContent = document.querySelector('.movie__content');
    const navigationButtons = document.querySelectorAll('.btn');
    const movieHeader = document.querySelector('.header');
    const movieHeaderInfo = document.querySelector('.header__info');
    const wishListPage = document.querySelector('.page--wishlist');
    const wishListUl = document.querySelector('.wishlist');
    const headerTime = document.querySelector('.header__time');

    // Fonction qui permet d'ajouter un id à la wishlist
    function addToWishlist(id) {
        let wishlist = getWishlist();
        if (!isInWishlist(id)) {
            wishlist.push(id);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }

    // Fonction qui permet d'enlever un id de la wishlist
    function removeFromWishlist(id) {
        let wishlist = getWishlist();
        let updatedList = wishlist.filter((value) => {
            return value != id;
        });
        localStorage.setItem('wishlist', JSON.stringify(updatedList));
    }

    // Fonction qui permet de vérifier si un id est dans la wishlist
    function isInWishlist(id) {
        let wishlist = getWishlist();
        let element = wishlist.find((value) => {
            return value == id;
        });
        return element !== undefined;
    }

    // Retourne la wishlist sous la forme d'un tableau
    function getWishlist() {
        let wishlistJSON = localStorage.getItem('wishlist');
        let wishlist = [];

        if (wishlistJSON === null) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            wishlist = JSON.parse(wishlistJSON);
        }

        return wishlist;
    }

    fetch(
        'https://garith.be/b2/tmdb/api/movie/now_playing&region=FR&language=fr-FR'
    )
        .then((response) => response.json())
        .then((json) => {
            // Image + infos film highlighted (N°1 dans "popular")
            let featuredMovie = json.results.slice(1, 2);
            var movie;
            for (movie of featuredMovie) {
                let posterUrl = '../assets/images/404.jpg';
                if (movie.poster_path) {
                    posterUrl =
                        'https://image.tmdb.org/t/p/original' +
                        movie.poster_path;
                }

                let movieElement = document.createElement('div');
                movieElement.classList.add('movie-hl__el');
                movieHeader.setAttribute('data-api-id', movie.id);

                header.innerHTML = `
        <h1 class="title header__title">${movie.title}<span class="header__runtime"></span></h1>
        <span class="header__note">${movie.vote_average}</span>
      `;
                movieElement.innerHTML = `
        <img src="${posterUrl}" alt="Poster de ${movie.title}" />
      `;

                mainMovie.appendChild(movieElement);
            }

            // Genres du film
            let value = movie.id;
            let url =
                'https://garith.be/b2/tmdb/api/movie/' +
                encodeURI(value) +
                '&language=fr-FR';
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    let genreMovie = json.genres;

                    for (var i = 0; i < genreMovie.length; i++) {
                        let genreElement = document.createElement('li');
                        genreElement.classList.add('header__genre');
                        genreElement.innerHTML = `
              <span>${genreMovie[i].name}</span>
            `;
                        genre.appendChild(genreElement);
                    }
                });

            // Liste des films populaires

            let filteredMovies = json.results.slice(1, 20);
            for (movie of filteredMovies) {
                // On récupère l'url du poster du film
                let posterUrl = '../assets/images/404.jpg';
                if (movie.poster_path) {
                    posterUrl =
                        'https://image.tmdb.org/t/p/w400' + movie.poster_path;
                }
                // On créé un nouveau élément de type li
                let movieElement = document.createElement('li');

                // On lui ajoute le classe "movie__el"
                movieElement.classList.add('movies__el');
                // On définit un data-attribut pour pouvoir identifier le film à afficher si l'utilisateur clique dessus
                movieElement.setAttribute('data-api-id', movie.id);
                // On crée le code HTML de l'élément
                movieElement.innerHTML = `
            <img class="movies__img" src="${posterUrl}" alt="Poster de ${movie.title}" />
          `;
                // On ajoute le nouveau li dans le ul
                moviesList.appendChild(movieElement);
                // On ajoute un gestionnaire d'événement pour réagir au clic sur un film
                movieElement.addEventListener('click', (e) => {
                    displayMovie(e.currentTarget.getAttribute('data-api-id'));
                    let index = 'index';
                    let btn = document.querySelector('.btn');
                    btn.setAttribute('data-section', index);
                    let add = document.querySelector('.trigger');
                    let currentId = e.currentTarget.getAttribute('data-api-id');
                    add.setAttribute('data-api-id', currentId);

                    let trigger = document.querySelector('.trigger');
                    if (!isInWishlist(currentId)) {
                        trigger.classList.remove('trigger--added');
                    } else {
                        trigger.classList.add('trigger--added');
                    }
                });
                movieHeader.addEventListener('click', (e) => {
                    displayMovie(e.currentTarget.getAttribute('data-api-id'));
                    let index = 'index';
                    let btn = document.querySelector('.btn');
                    btn.setAttribute('data-section', index);
                    let add = document.querySelector('.trigger');
                    let currentId = e.currentTarget.getAttribute('data-api-id');
                    add.setAttribute('data-api-id', currentId);
                    let trigger = document.querySelector('.trigger');
                    if (!isInWishlist(currentId)) {
                        trigger.classList.remove('trigger--added');
                    } else {
                        trigger.classList.add('trigger--added');
                    }
                });

                // On ajoute un gestionnaire d'événement pour les boutons avec la classe navigation
                var navigationButton;
                for (navigationButton of navigationButtons) {
                    navigationButton.addEventListener('click', (e) => {
                        // On récupére la valeur contenue dans le champ de recherche.
                        let section =
                            e.currentTarget.getAttribute('data-section');
                        // On utilise la fonction setActiveSection(définie plus bas) pour changer la section active en fonction de l'attribut data-section
                        setActiveSection(section);
                    });
                }
            }
        });

    fetch(
        'https://garith.be/b2/tmdb/api/movie/upcoming&region=FR&language=fr-FR'
    )
        .then((response) => response.json())
        .then((json) => {
            // Liste des films à bientôt

            let filteredMovies = json.results.slice(0, 20);
            var movie;
            for (movie of filteredMovies) {
                // On récupère l'url du poster du film
                let posterUrl = '../assets/images/404.jpg';
                if (movie.poster_path) {
                    posterUrl =
                        'https://image.tmdb.org/t/p/w400' + movie.poster_path;
                }
                // On créé un nouveau élément de type li
                let movieElement = document.createElement('li');

                // On lui ajoute le classe "movie__el"
                movieElement.classList.add('movies__el');
                // On définit un data-attribut pour pouvoir identifier le film à afficher si l'utilisateur clique dessus
                movieElement.setAttribute('data-api-id', movie.id);
                // On crée le code HTML de l'élément
                movieElement.innerHTML = `
              <img class="movies__img" src="${posterUrl}" alt="Poster de ${movie.title}" />
            `;
                // On ajoute le nouveau li dans le ul
                moviesListUp.appendChild(movieElement);
                // On ajoute un gestionnaire d'événement pour réagir au clic sur un film
                movieElement.addEventListener('click', (e) => {
                    displayMovie(e.currentTarget.getAttribute('data-api-id'));
                    let index = 'index';
                    let btn = document.querySelector('.btn');
                    btn.setAttribute('data-section', index);
                    let add = document.querySelector('.trigger');
                    let currentId = e.currentTarget.getAttribute('data-api-id');
                    add.setAttribute('data-api-id', currentId);

                    let trigger = document.querySelector('.trigger');
                    if (!isInWishlist(currentId)) {
                        trigger.classList.remove('trigger--added');
                    } else {
                        trigger.classList.add('trigger--added');
                    }
                });

                // On ajoute un gestionnaire d'événement pour les boutons avec la classe navigation
                var navigationButton;
                for (navigationButton of navigationButtons) {
                    navigationButton.addEventListener('click', (e) => {
                        // On récupére la valeur contenue dans le champ de recherche.
                        let section =
                            e.currentTarget.getAttribute('data-section');

                        // On utilise la fonction setActiveSection(définie plus bas) pour changer la section active en fonction de l'attribut data-section
                        setActiveSection(section);
                    });
                }
            }
        });

    // Détails film
    function displayMovie(id) {
        setActiveSection('movie');
        let url =
            'https://garith.be/b2/tmdb/api/movie/' + id + '&language=fr-FR';
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                let posterUrl = '../assets/images/404.jpg';
                if (json.poster_path) {
                    posterUrl =
                        'https://image.tmdb.org/t/p/original' +
                        json.poster_path;
                }
                let movieTime = 'Unknown';
                if (json.runtime) {
                    movieTime = json.runtime + 'min';
                }
                let movieDateYearFinal = '';
                let movieDateYear = json.release_date.substr(0, 4);
                if (json.release_date) {
                    movieDateYearFinal = '(' + movieDateYear + ')';
                }

                movieContent.innerHTML = `
        <div class="movie__poster">
          <img src="${posterUrl}" alt="Poster de ${json.title}" />
          <div class="movie__info">
            <span class="movie__el">${movieTime}</span>
            <span class="movie__el">${json.vote_average}</span>
          </div>

        </div>
        <div class="movie__poster--deco">
          <img src="${posterUrl}" alt="Poster de ${json.title}" />
        </div>
        <div class="movie__desc">
          <h2 class="movie__title title">${json.title}<span>${movieDateYearFinal}</span></h2>
          <p class="movie__overview">${json.overview}</p>
        </div>
      `;
            });
    }

    function setActiveSection(name) {
        if (window.matchMedia('(min-width: 1000px)').matches) {
            let openedSection = document.querySelector('.page--open');
            let random = document.querySelector('.page--movie');
            let bg = document.querySelector('.bg');
            let bgActive = document.querySelector('.bg--on');

            random.classList.remove('page--open');
            bg.classList.toggle('bg--on');

            window.onclick = function (e) {
                if (e.target == bg) {
                    random.classList.remove('page--open');
                    bg.classList.toggle('bg--on');
                }
            };

            if (openedSection) {
                // openedSection.classList.remove("page--open");
            }
            let openSection = document.querySelector('.page--' + name);
            if (openSection) {
                openSection.classList.add('page--open');
            }
        } else {
            let openedSection = document.querySelector('.page--open');
            if (openedSection) {
                openedSection.classList.remove('page--open');
            }
            let openSection = document.querySelector('.page--' + name);
            if (openSection) {
                openSection.classList.add('page--open');
            }
        }
    }

    const searchInput = document.querySelector('.search__field');
    const moviesSearchList = document.querySelector('.search__movies');
    const searchBtn = document.querySelector('.search__btn');
    const searchPage = document.querySelector('.page--search');
    const homeBtn = document.querySelector('.home__btn');
    const mainPage = document.querySelector('.page--index');
    const listBtn = document.querySelector('.wishlist__btn');
    let timeout;

    // Bidouillage pour cacher les "pages" non voulues lors de la navigation
    homeBtn.addEventListener('click', (e) => {
        mainPage.classList.add('page--open');
        searchPage.classList.remove('page--open');
        movieWrapper.classList.remove('page--open');
        wishListPage.classList.remove('page--open');
    });
    searchBtn.addEventListener('click', (e) => {
        searchPage.classList.add('page--open');
        mainPage.classList.remove('page--open');
        movieWrapper.classList.remove('page--open');
        wishListPage.classList.remove('page--open');
    });
    listBtn.addEventListener('click', (e) => {
        wishListPage.classList.add('page--open');
        mainPage.classList.remove('page--open');
        movieWrapper.classList.remove('page--open');
        searchPage.classList.remove('page--open');
        location.reload();
    });

    let storageMode = localStorage.getItem('mode');
    setDisplayMode(storageMode);

    const memory = document.querySelectorAll('.mode-trigger');
    for (let i = 0; i < memory.length; i++) {
        let trigger = memory[i];
        trigger.addEventListener('click', (e) => {
            let mode = e.currentTarget.getAttribute('data-mode');
            setDisplayMode(mode);
        });
    }

    function setDisplayMode(mode) {
        if (mode == 'home') {
            mainPage.classList.add('page--open');
            searchPage.classList.remove('page--open');
            movieWrapper.classList.remove('page--open');
            wishListPage.classList.remove('page--open');

            localStorage.setItem('mode', 'home');
        } else if (mode == 'wish') {
            wishListPage.classList.add('page--open');
            mainPage.classList.remove('page--open');
            movieWrapper.classList.remove('page--open');
            searchPage.classList.remove('page--open');

            localStorage.setItem('mode', 'wish');
        } else if (mode == 'search') {
            searchPage.classList.add('page--open');
            mainPage.classList.remove('page--open');
            movieWrapper.classList.remove('page--open');
            wishListPage.classList.remove('page--open');

            localStorage.setItem('mode', 'search');
        }
    }

    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let value = searchInput.value;
            // Si la valeur est vide
            if (!value) {
                // on supprime le contenu HTML de l'élément moviesList
                moviesSearchList.innerHTML = '';
                // ... et on arrête la fonction.
                return;
            }
            // encodeURI permet d'encoder la valeur en paramètre GET.
            let url =
                'https://garith.be/b2/tmdb/api/search/movie?query=' +
                encodeURI(value) +
                '&language=fr-FR';
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    moviesSearchList.innerHTML = '';
                    // On limite le nombre d'élément à afficher.

                    let filteredMovies = json.results.slice(0, 20);
                    // On parcourt la liste des films pour les afficher
                    var movie;
                    for (movie of filteredMovies) {
                        // On récupère l'url du poster du film
                        let posterUrl = '../assets/images/404.jpg';
                        if (movie.poster_path) {
                            posterUrl =
                                'https://image.tmdb.org/t/p/w200' +
                                movie.poster_path;
                        }
                        let movieDateYearFinal = '';
                        let movieDate = movie.release_date;
                        let movieDateYear = movieDate.substr(0, 4);
                        if (movie.release_date) {
                            movieDateYearFinal = '(' + movieDateYear + ')';
                        }
                        let overview = movie.overview;
                        let length = 150;
                        let overviewShort = overview.substring(0, length);

                        // On créé un nouveau élément de type li
                        let movieElement = document.createElement('li');
                        // On lui ajoute le classe "movie__el"
                        movieElement.classList.add('search__el');
                        // On définit un data-attribut pour pouvoir identifier le film à afficher si l'utilisateur clique dessus
                        movieElement.setAttribute('data-api-id', movie.id);
                        // On crée le code HTML de l'élément
                        movieElement.innerHTML = `
            <img src="${posterUrl}" alt="Poster de ${movie.title}" />
            <div class="search__content">
              <h2 class="title">${movie.title} <span>${movieDateYearFinal}</span></h2>
              <span class="search__overview">${overviewShort}…</span>
            </div>
          `;

                        // On ajoute le nouveau li dans le ul
                        moviesSearchList.appendChild(movieElement);

                        movieElement.addEventListener('click', (e) => {
                            displayMovie(
                                e.currentTarget.getAttribute('data-api-id')
                            );
                            let search = 'search';
                            let btn = document.querySelector('.btn');
                            btn.setAttribute('data-section', search);
                            let add = document.querySelector('.trigger');
                            let currentId =
                                e.currentTarget.getAttribute('data-api-id');
                            add.setAttribute('data-api-id', currentId);
                            let trigger = document.querySelector('.trigger');
                            if (!isInWishlist(currentId)) {
                                trigger.classList.remove('trigger--added');
                            } else {
                                trigger.classList.add('trigger--added');
                            }
                        });
                    }
                });
        }, 250);
    });

    // Wishlist
    const triggers = document.querySelectorAll('.trigger');
    for (let i = 0; i < triggers.length; i++) {
        // au chargement de la page, on remet si nécessaire la class wishlist__el--selected
        if (isInWishlist(triggers[i].getAttribute('data-api-id'))) {
            triggers[i].classList.add('o');
        }
        // Au click ...
        triggers[i].addEventListener('click', (e) => {
            // On récupère l'attribut data-id de l'élément qui vient d'être cliqué.
            let id = e.currentTarget.getAttribute('data-api-id');
            // Si l'élément ne fait pas partie de la wishlist
            if (!isInWishlist(id)) {
                // On l'ajoute l'élément dans la liste
                addToWishlist(id);
                // ... et on lui ajoute la classe wishlist__el--selected
                e.currentTarget.classList.add('trigger--added');
            } else {
                // On enlève l'élément de la wishlist
                removeFromWishlist(id);
                // On lui enléve la classe wishlist__el--selected
                e.currentTarget.classList.remove('trigger--added');
            }
        });
    }

    function refresh() {
        let wishlistJSON = localStorage.getItem('wishlist');
        let wishlist = [];

        if (wishlistJSON === null) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            wishlist = JSON.parse(wishlistJSON);
        }

        for (let i = 0; i < wishlist.length; i++) {
            let url = 'https://garith.be/b2/tmdb/api/movie/' + wishlist[i];
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    let posterUrl = '../assets/images/404.jpg';
                    if (json.poster_path) {
                        posterUrl =
                            'https://image.tmdb.org/t/p/w500' +
                            json.poster_path;
                    }
                    let wishElement = document.createElement('li');
                    wishElement.classList.add('wishlist__el');

                    wishElement.setAttribute('data-api-id', wishlist[i]);
                    // On crée le code HTML de l'élément
                    wishElement.innerHTML = `
            <img src="${posterUrl}" alt="Poster de ${json.title}" />
          `;

                    // On ajoute le nouveau li dans le ul

                    wishElement.addEventListener('click', (e) => {
                        displayMovie(
                            e.currentTarget.getAttribute('data-api-id')
                        );
                        let wish = 'wishlist';
                        let btn = document.querySelector('.btn');
                        btn.setAttribute('data-section', wish);
                        let add = document.querySelector('.trigger');
                        let currentId =
                            e.currentTarget.getAttribute('data-api-id');
                        add.setAttribute('data-api-id', currentId);
                        let trigger = document.querySelector('.trigger');
                        if (!isInWishlist(currentId)) {
                            trigger.classList.remove('trigger--added');
                        } else {
                            trigger.classList.add('trigger--added');
                        }
                        btn.addEventListener('click', (e) => {
                            location.reload();
                        });
                    });
                    wishListUl.appendChild(wishElement);
                });
        }
    }
    refresh();
}
