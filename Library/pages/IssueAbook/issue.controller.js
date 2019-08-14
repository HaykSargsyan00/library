function reserveBook (  ) {
    let fromDate = window.document.getElementById("fromDate").value;
    let toDate = window.document.getElementById("toDate").value;
    let bookId = window.lms.localStorage.getItem("bookId");
    let book = lms.bookManagementService.getBookById(bookId);
    let user =  window.lms.sessionStorage.getItem("authInfo")["user"];
    window.lms.issueService.addNewIssue(book, )
}