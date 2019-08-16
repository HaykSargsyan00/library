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
    if(sesStorage.getFromStorage().length ===0){
        window.location = '../home/home.html'
    }
    thisUser = sesStorage.getFromStorage()['user'];

    getDefaultElementsFromDOM();
    createPageStaticComponents();
    updateResult('');

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

    addingNavBar();
}

function addingNavBar(){
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
    if(event.target === document.getElementById('mainBefore')){
        searchBar.value = '';
        let resultList = document.querySelector(".result").innerHTML = '';
        document.getElementById('mainBefore').classList.remove('main-before');
    }
}

function updateResult(query) {
    let resultList = document.querySelector(".result");
    resultList.innerHTML = "";
    let books;
    if(query === ''){
        books = lms.bookManagementService.getTopBooks(15);
    } else {
        books = lms.bookManagementService.getBooksByName(query);
    }
    let i = 0;
    let booksRow = '';
    for(book of books){
         i++;
         booksRow += `<div class="book">
                                    <img style="height: 100%;width: 100%;" onclick="vewBook('${book.ID}')" src="${book.url}">
                                    <button onclick="issueBook('${book.ID}')">reserve</button>
                                </div>`;
        if( i % 5 === 0 ){
            resultList.innerHTML += `<div class="main-content__books_section">${booksRow}</div>`;
            booksRow = '';
        }
    }

    for( ; i % 5 !== 0; i++){
            booksRow += `<div class="subBook"></div>`;
        }
    resultList.innerHTML += `<div class="main-content__books_section">${booksRow}</div>`;
}

function vewBook(bookId) {
    window.localStorage.setItem('bookId',bookId);
    window.location = '../book/book.html';
}

function issueBook(bookId){
    window.localStorage.setItem('bookId',bookId);
    window.location = '../IssueAbook/issue.html';
}
