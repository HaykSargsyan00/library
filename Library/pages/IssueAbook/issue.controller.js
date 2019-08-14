
function reserveBook (  ) {
    let fromDate = window.document.getElementById("fromDate").value;
    let toDate = window.document.getElementById("toDate").value;
    let bookId = window.localStorage.getItem("bookId");
    let book = window.lms._bookManagementService.getBookById(bookId);
    let user =  window.sessionStorage.getItem("authInfo")["user"];
    window.lms.issueService.addNewIssue(book, )
}