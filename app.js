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
        const StoredAnimes = [
            {
                title : 'Naruto Shippuden',
                studio : 'Studio Pierrot'
            },
            {
                title : 'Naruto',
                studio : 'Studio Pierrot'
            },
            {
                title : 'Fairy Tail',
                studio : 'A-1 Pictures'
            },
            {
                title : 'Bleach',
                studio : 'Studio Perrot'
            },
            {
              title : 'FullMetal Alchemist',
              studio : 'Studio Bones'  
            }
        ];

        const animes = StoredAnimes;

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

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#studio').value = '';
    }
}
//Store Class: Handles Storage

//Event: Display Animes
document.addEventListener('DOMContentloaded', UI.displayAnimes());
//Event: Add an Anime
document.querySelector('#anime-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //Get Form Values
    const title = document.querySelector('#title').value;
    const studio = document.querySelector('#studio').value;

    // Instatiate anime
    const anime = new Anime(title, studio);

    //ADD Anime TO UI
    UI.addAnimeToList(anime);

    //clear Form Fields

    UI.clearFields();
})

//Event: Remove an Anime
document.querySelector('#anime-list').addEventListener('click', (e) => {
    UI.deleteAnime(e.target)
});
