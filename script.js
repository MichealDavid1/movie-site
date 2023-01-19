const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7d6b78924dea73cf49472af37da16f7c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=7d6b78924dea73cf49472af37da16f7c&query=';

const mainSection = document.getElementById('main');
const from = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APILINK);
function getMovies(url){
    fetch(url).then(res => res.json()).then(function(data){
        let i = 0
        let list = []
        data.results.forEach(element => {
            const column = document.createElement('div');
            column.setAttribute('class', 'column')
            const card = document.createElement('div');
            card.setAttribute('class', 'card')
            const center = document.createElement('center');
            const image = document.createElement('img');
            const title = document.createElement('h5');
            title.setAttribute('id', 'title')

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            card.appendChild(center);
            card.appendChild(title);
            column.appendChild(card);
            list.push(column);
            i += 1
            if (i === 5){
                row = document.createElement('div');
                row.setAttribute('class', 'row')
                for (let i = 0; i < list.length; i++){
                    row.appendChild(list[i])
                }
                mainSection.appendChild(row);
                i = 0
                list = []
            }
        });
    });
}


from.addEventListener("submit", (e) => {
    e.preventDefault();
    mainSection.innerHTML = '';

    const searchedMovie = search.value;

    if (searchedMovie && searchedMovie !== '') {
        getMovies(SEARCHAPI + searchedMovie);
    } else {
        getMovies(APILINK)
    }
})
