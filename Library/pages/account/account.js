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
                        <img style="height: 100%;width: 100%;" src="${book.url}">
                        <button onclick="issueBook(' ${book.ID} ')" class="raised-button shk-button">Issue</button>
                    </div>`;
        mostSearchedSection.insertAdjacentHTML( 'afterbegin' ,books );
    }

    let newestBooksSection = document.getElementById('newestBooks');
    let newestBooks = window.lms.bookManagementService.getNewBooks();
    for(let book of newestBooks){
        let books = `<div class="book">
                        <img style="height: 100%;width: 100%;" src="${book.url}">
                        <button onclick="issueBook( ${book.ID} )" class="raised-button shk-button">Issue</button>
                    </div>`;
        newestBooksSection.insertAdjacentHTML( 'afterbegin' ,books );
    }
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

names = ["Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz", "Ahoua", "Ahtasham", "Aiadan", "Aidan", "Aiden", "Aiden-Jack", "Aiden-Vee", "Aidian", "Aidy", "Ailin", "Aiman", "Ainsley", "Ainslie", "Airen", "Airidas", "Airlie", "AJ", "Ajay", "A-Jay", "Ajayraj", "Akan", "Akram", "Al", "Ala", "Alan", "Alanas", "Alasdair", "Alastair", "Alber", "Albert", "Albie", "Aldred", "Alec", "Aled", "Aleem", "Aleksandar", "Aleksander", "Aleksandr", "Aleksandrs", "Alekzander", "Alessandro", "Alessio", "Alex", "Alexander", "Alexei", "Alexx", "Alexzander", "Alf", "Alfee", "Alfie", "Alfred", "Alfy", "Alhaji", "Al-Hassan", "Ali", "Aliekber", "Alieu", "Alihaider", "Alisdair", "Alishan", "Alistair", "Alistar", "Alister", "Aliyaan", "Allan", "Allan-Laiton", "Allen", "Allesandro", "Allister", "Ally", "Alphonse", "Altyiab", "Alum", "Alvern", "Alvin", "Alyas", "Amaan", "Aman", "Amani", "Ambanimoh", "Ameer", "Amgad", "Ami", "Amin", "Amir", "Ammaar", "Ammar", "Ammer", "Amolpreet", "Amos", "Amrinder", "Amrit", "Amro", "Anay", "Andrea", "Andreas", "Andrei", "Andrejs", "Andrew", "Andy", "Anees", "Anesu", "Angel", "Angelo", "Angus", "Anir", "Anis", "Anish", "Anmolpreet", "Annan", "Anndra", "Anselm", "Anthony", "Anthony-John", "Antoine", "Anton", "Antoni", "Antonio", "Antony", "Antonyo", "Anubhav", "Aodhan", "Aon", "Aonghus", "Apisai", "Arafat", "Aran", "Arandeep", "Arann", "Aray", "Arayan", "Archibald", "Archie", "Arda", "Ardal", "Ardeshir", "Areeb", "Areez", "Aref", "Arfin", "Argyle", "Argyll", "Ari", "Aria", "Arian", "Arihant", "Aristomenis", "Aristotelis", "Arjuna", "Arlo", "Armaan", "Arman", "Armen", "Arnab", "Arnav", "Arnold", "Aron", "Aronas", "Arran", "Arrham", "Arron", "Arryn", "Arsalan", "Artem", "Arthur", "Artur", "Arturo", "Arun", "Arunas", "Arved", "Arya", "Aryan", "Aryankhan", "Aryian", "Aryn", "Asa", "Asfhan", "Ash", "Ashlee-jay", "Ashley", "Ashton", "Ashton-Lloyd", "Ashtyn", "Ashwin", "Asif", "Asim", "Aslam", "Asrar", "Ata", "Atal", "Atapattu", "Ateeq", "Athol", "Athon", "Athos-Carlos", "Atli", "Atom", "Attila", "Aulay", "Aun", "Austen", "Austin", "Avani", "Averon", "Avi", "Avinash", "Avraham", "Awais", "Awwal", "Axel", "Ayaan", "Ayan", "Aydan", "Ayden", "Aydin", "Aydon", "Ayman", "Ayomide", "Ayren", "Ayrton", "Aytug", "Ayub", "Ayyub", "Azaan", "Azedine", "Azeem", "Azim", "Aziz", "Azlan", "Azzam", "Azzedine", "Babatunmise", "Babur", "Bader", "Badr", "Badsha", "Bailee", "Bailey", "Bailie", "Bailley", "Baillie", "Baley", "Balian", "Banan"];
function updateResult(query) {
    let resultList = document.querySelector(".result");
    resultList.innerHTML = "";

    names.map(function(algo){
        query.split(" ").map(function (word){
            if(algo.toLowerCase().indexOf(word.toLowerCase()) != -1){
                resultList.innerHTML += `<li class="list-group-item">${algo}</li>`;
            }
        })
    })
}

function issueBook(bookId){
    window.localStorage.setItem('bookId',bookId);
    window.location = '../IssueAbook/issue.html';
}
