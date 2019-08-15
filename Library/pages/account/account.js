let isAccountHidden = true;
let header;
let card;
let accountHideButton;
let headerMiniCard;
let logoutButton;
let sesStorage;
let thisUser;

window.onload = function(){
    window.lms = new LMS();
    sesStorage = new StorageMService(window.sessionStorage, 'authInfo');
    thisUser = sesStorage.getFromStorage()['user'];

    getDefaultElementsFromDOM();
    createPageStaticComponents();

};

function getDefaultElementsFromDOM() {
    header = document.getElementById('header');
    card = document.getElementById('card');
    accountHideButton = document.getElementById('accountHideButton');
    headerMiniCard = document.getElementById('headerMiniCard');
    logoutButton = document.getElementById('logoutButton');
}



function createPageStaticComponents() {
    let usernameElements = document.getElementsByClassName('username');
    for(let item of usernameElements){
        item.innerText = thisUser.username;
    }

    let userIDElements = document.getElementsByClassName('userID');
    for(let item of userIDElements){
        item.innerText = thisUser.ID;
    }

    let mostSearchedSection = document.getElementById('most-searched__books');
    let mostSearchedBooks = window.lms.bookManagementService.getTopBooks();
    for(let book of mostSearchedBooks){
        let books = `<div class="book">
                        <img style="height: 100%;width: 100%;" onclick="vewBook('${book.ID}')" src="${book.url}">
                        <button onclick="issueBook('${book.ID}')">reserve</button>
                    </div>`;
        mostSearchedSection.insertAdjacentHTML( 'afterbegin' ,books );
    }

    let newestBooksSection = document.getElementById('newestBooks');
    let newestBooks = window.lms.bookManagementService.getNewBooks();
    for(let book of newestBooks){
        let books = `<div class="book">
                        <img style="height: 100%;width: 100%;" src="${book.url}">
                        <button onclick="issueBook(${book.ID})" class="raised-button shk-button">Issue</button>
                    </div>`;
        newestBooksSection.insertAdjacentHTML( 'afterbegin' ,books );
    }

    let navCard = document.getElementById('navCard');
    let navBar = `<li><button class="shk-button raised-button" onclick="window.location = '../account/account.html'">Home</button></li>
                  <li><button class="shk-button raised-button" onclick="window.location = '../search/search.html'">Search</button></li>
                  <li><button class="shk-button raised-button" onclick="window.location = '../history/history.html'">History</button></li>`;
    let storage = new StorageMService(window.sessionStorage, 'authInfo');
    let permissions = storage.getFromStorage().permissions;
    if( permissions.canManageBook === true ) {
        navBar += `<li><button class="shk-button raised-button" onclick="window.location = '../requests/requests.html'">Requests</button></li>`;
    }

    if( permissions.canManageBook === false ) {
        navBar += `<li><button class="shk-button raised-button" onclick="window.location = '../requests/requests.html'">became librarian</button></li>`;
    }

    navBar += `<li><button class="shk-button raised-button" onclick="logout()">Logout</button></li>`;
    navCard.innerHTML = `<ul class="button_list"> ${navBar} </ul>`;
}





function switchAccountVisibility() {
    isAccountHidden = !isAccountHidden;
    if(isAccountHidden) {
        header.classList.add('header--mini');
        card.classList.add('header-card--hide');
        headerMiniCard.classList.add('header-mini_card--show');
        logoutButton.classList.add('logout_button--show');


        accountHideButton.classList.remove('account_hide_button--show');
    } else {
        header.classList.remove('header--mini');
        card.classList.remove('header-card--hide');
        headerMiniCard.classList.remove('header-mini_card--show');
        logoutButton.classList.remove('logout_button--show');

        accountHideButton.classList.add('account_hide_button--show');
    }
}

function logout(){
    window.lms.authService.logout();
}

function searching(event) {
    let searchBar = document.getElementById('search');
    if(event.target === searchBar) {
        document.getElementById('mainBefore').classList.add('main-before');
    }
    if(event.target === document.getElementById('mainBefore')){
        searchBar.value = '';
        let resultList = document.querySelector(".result").innerHTML = '';
        document.getElementById('mainBefore').classList.remove('main-before');
    }
}

function updateResult(query) {
    let resultList = document.querySelector(".result");
    resultList.innerHTML = "";
    let books = lms.bookManagementService.getBooksByName(query);
    for(let i = 0; i < 10 && i<books.length; i++){
        resultList.innerHTML += `<li class="list-group-item" onclick="vewBook(' ${books[i].ID} ')"><span>${books[i].name} </span> <span> ${books[i].author} </span></li>`;
    };
}

function vewBook(bookId) {
    window.localStorage.setItem('bookId',bookId);
    window.location = '../book/book.html';
}

function issueBook(bookId){
    window.localStorage.setItem('bookId',bookId);
    window.location = '../IssueAbook/issue.html';
}
