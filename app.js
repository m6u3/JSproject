//Anime class: Represents an Anime
class Anime {
    constructor(title, studio) {
        this.title = title;
        this.studio = studio;
    }
}
//UI Class: Handle UI Tasks
class UI {
    static displayAnimes() {
        const animes = Store.getAnimes();

        animes.forEach((anime) => UI.addAnimeToList(anime));
    }

    static addAnimeToList(anime) {
        const list = document.querySelector('#anime-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${anime.title}</td>
        <td>${anime.studio}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteAnime(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} `;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#anime-form');
        container.insertBefore(div, form);

        //Vanish in 5 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3500);


    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#studio').value = '';
    }
}
//Store Class: Handles Storage
class Store {
    static getAnimes(){
        let animes;
        if(localStorage.getItem('animes') === null){
            animes = [];
        } else {
            animes = JSON.parse(localStorage.getItem('animes'));
        }
        
        return animes;
    }
    static addAnime(anime){
        const animes = Store.getAnimes();
        animes.push(anime);
        localStorage.setItem('animes',JSON.stringify(animes));
    }
    static removeAnime(title){
        const animes = Store.getAnimes();
        animes.forEach((anime, index) => {
            if(anime.title === title) {
                animes.splice(index, 1);
            }
        });

        localStorage.setItem('animes', JSON.stringify(animes));
    }
}

//Event: Display Animes
document.addEventListener('DOMContentloaded', UI.displayAnimes());
//Event: Add an Anime
document.querySelector('#anime-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //Get Form Values
    const title = document.querySelector('#title').value;
    const studio = document.querySelector('#studio').value;

    //Validate all Field are Filled
    if(title === '' || studio === ''){
        UI.showAlert('Please fill in all fields', 'danger text-light');
    } else {

    // Instatiate anime
    const anime = new Anime(title, studio);

    //ADD Anime TO UI
    UI.addAnimeToList(anime);

    //Add Anime to Store
    Store.addAnime(anime);

    //Show Success Message
    UI.showAlert('Anime Added','success text-light');

    //clear Form Fields

    UI.clearFields();
    }
})

//Event: Remove an Anime
document.querySelector('#anime-list').addEventListener('click', (e) => {
    //Remove Book from UI
    UI.deleteAnime(e.target);

    //Remove Book from Store
    Store.removeAnime(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    //Show Warning Massege of Removed
    UI.showAlert('Anime Removed','warning text-dark');
});
