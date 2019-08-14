class Book{
    constructor({name,author,pageCount,genre,count = 1}){
        this.name = name;
        this.author = author;
        this.pageCount = pageCount;
        this.genre = genre;
        this.count = count;
        this.isAvailable = true;

        let id = window.localStorage.getItem('BookLastId');
        id++;
        this.ID = '#' + id;
        window.localStorage.setItem('BookLastId',id);
    }
}



