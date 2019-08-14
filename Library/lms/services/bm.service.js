function addBooksForNewPc() {
    let books = [
        {
            "name": "the world of abstract art",
            "author": "Emily Robbins",
            "count": 1,
            "isAvailable": true,
            "url": "https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png",
            "ID": "#3"
        },
        {
            "name": "the old man and the sea",
            "author": "Ernest Hemingway",
            "count": 1,
            "isAvailable": true,
            "url": "https://klacey.com/wp-content/uploads/2014/09/Hemingway_OldManAndTheSea_front_cover_design_classic_book_cover_featuredim_tall-669x1024.jpg",
            "ID": "#4"
        },
        {
            "name": "me before you",
            "author": "Jojo Moyes",
            "count": 1,
            "isAvailable": true,
            "url": "https://www.asiabooks.com/media/catalog/product/cache/1/image/264x/17f82f742ffe127f42dca9de82fb58b1/9/7/9780718157838_1_1.jpg",
            "ID": "#5"
        },
        {
            "name": "the lives inside your head",
            "author": "Winston Brown",
            "count": 1,
            "isAvailable": true,
            "url": "https://d2w9rnfcy7mm78.cloudfront.net/3396287/original_65abb1ff2a3dadd3db17e7d054dfd4a2.jpg?1547331358",
            "ID": "#6"
        },
        {
            "name": "you, me and the goldfish",
            "author": "M. T. Straker",
            "count": 1,
            "isAvailable": true,
            "url": "https://buzbooks.com/wp-content/uploads/2018/02/017-6x9-Standing-Hardcover-PSD-Mockup-COVERVAULT.png",
            "ID": "#7"
        },
        {
            "name": "javaScript",
            "author": "David Flanaga",
            "count": 1,
            "isAvailable": true,
            "url": "https://images-na.ssl-images-amazon.com/images/I/71oUHJ6uO7L.jpg",
            "ID": "#8"
        },


        {
            "name": "women, men & the whole damn thing",
            "author": "David Leser",
            "count": 1,
            "isAvailable": true,
            "url": "https://www.dymocks.com.au/Pages/ImageHandler.ashx?q=9781925266108&w=&h=375",
            "ID": "#9"
        },
        {
            "name": "Հեքիաթներ",
            "author": "Հովհաննես Թումանյան",
            "count": 1,
            "isAvailable": true,
            "url": "https://armenpress.am/static/add/011/hovh.%20tumanyan%20heqiatner.jpg",
            "ID": "#10"
        },
        {
            "name": "C# for beginners",
            "author": "Jonas Fagerberg",
            "count": 1,
            "isAvailable": true,
            "url": "https://images-na.ssl-images-amazon.com/images/I/51eImdRQv%2BL._SX260_.jpg",
            "ID": "#11"
        },
        {
            "name": "html&css design and build websites",
            "author": "John Duckett",
            "count": 1,
            "isAvailable": true,
            "url": "https://images-na.ssl-images-amazon.com/images/I/41p7u2kJACL._SX258_BO1,204,203,200_.jpg",
            "ID": "#12"
        },
    ];

    return books;
}


class BmService{
    constructor(){
        this.storage = new StorageMService(window.localStorage, 'Books');
        this.storage.setIntoStorage(addBooksForNewPc());
        this.books = this.storage.getFromStorage();
    }
    getBooksById(bookId){
        for(let book of this.books){
            if(book.bookId === bookId){
                return book;
            }
        }

        throw new Error('There are no book whit such name');

    }

    getBooksByName(bookName){
        let booksWithThisName = [];
        for(let book of this.books){
            if(book.name === bookName){
                booksWithThisName.push(book);
            }
        }
        if(booksWithThisName.length === 0){
            throw new Error('There are no book whit such name');
        }

        return booksWithThisName;
    }

    getTopBooks(){
        let book = [];
        let ids = {};
        for(let i = 0; i < 5 ; i++){
            let j;
            do{
                j = parseInt(( Math.random()*(this.books.length) ));
            }while( ids[j] !== undefined );
            book.push(this.books[j]);
            ids[j] = j;
        }
        return book;
    }

    getNewBooks(){
        let book = [];
        for(let i = 1; i <= 5 ; i++){
            book.push(this.books[this.books.length-i]);
        }
        return book;
    }

    addBook(newBook){
        for(let book of this.books){
            if(book === newBook){
                book.count++;
            }
        }
        this.books.push(newBook);
        this.storage.addIntoStorage(newBook);
    }

    deleteBook(ID){
        let t1 = [];
        for(let i = 0; i<ID; i++)
            t1.push(this.books[i]);

        let t2 = [];
        for(let i = ID + 1; i<= this.books.lengh; i++)
            t2.push(this.books[i]);

        this.books = [];
        this.books = t1 + t2;
        this.storage.setIntoStorage(this.books);
    }

    updateAvailability(book){
        if(book.isAvailable  === false)
            book.isAvailable = true;
        else
            book.isAvailable = false;
        this.storage.setIntoStorage(this.books);
    }
}