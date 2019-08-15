class BookIssue{
    constructor(bookId,user,fromDate = new Date(),toDate){
        this.username = user.username;
        this.bookId = bookId;
        this.fromDate = fromDate;
        this.toDate = toDate;
        let id = window.localStorage.getItem('IssueLastId');
        id++;
        this.ID = '#' + id;
        window.localStorage.setItem('IssueLastId',id);
    }
}
