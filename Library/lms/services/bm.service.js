class BmService{
    constructor(){
        this.storage = new StorageMService(window.localStorage, 'Books');
        this.books = this.storage.getFromStorage();
    }

    getBooksByName(bookName){
        let booksWithThisName = [];
        for(let book of this.books){
            if(book.name === bookName){
                booksWithThisName.push(book);
            }
        }
        if(booksWithThisName.length == 0){
            throw new Error('There are no book whit such name');
        }

        return booksWithThisName;
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
