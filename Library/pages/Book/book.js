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

    addingNavBar();
    creatingBookInfo();
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

function creatingBookInfo() {
    let book = lms.bookManagementService.getBookById(localStorage.getItem('bookId'));
    let bookView = document.getElementById('content-view');

    bookView.innerHTML = `<img class="content-view__image" src="${book.url}">`
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

function issueBook(bookId){
    window.localStorage.setItem('bookId',bookId);
    window.location = '../IssueAbook/issue.html';
}
