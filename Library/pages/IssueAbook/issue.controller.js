let main;
let card;
let form;
let book;
let cardIsRotated = false;


/*window.document.getElementById("fromDate").value = new Date();
window.document.getElementById("toDate").value = Date.now();*/

function loadFunction() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }

    today =  yyyy+ '-'+mm+'-'+dd;
    document.getElementById("fromDate").defaultValue =today+"";
    document.getElementById("toDate").defaultValue =today+"";
    return today;
}


window.onload = function(){
    let today = loadFunction();
    window.lms = new LMS();
    let bms = new BmService();
    card = document.getElementById('card');
    form = document.getElementById('form');
    main = document.getElementById('main');
    book = bms.getBookById(window.localStorage.getItem(spaceIgnor("bookId")));
    f();

}
function spaceIgnor (str) {
    let newStr= "";
    for( let i of str) {
        if (i !== " ") {
            newStr += i;
        }
    }
    return newStr;
}
function f (  ) {
    let img = document.createElement("img");
    img.src = book.url;
    img.style.height = "100%";
    let cardImg = document.getElementById('cardPic');
    cardImg.appendChild(img);
}
function reserveBook (  ) {
    let fromDate = window.document.getElementById("fromDate").value;
    let toDate = window.document.getElementById("toDate").value;

    let today = loadFunction();
    if(fromDate > toDate)
    {
        window.document.getElementById("fromDate").className += " incorrect-input";
        window.document.getElementById("toDate").className += " incorrect-input";
    }
    else if(fromDate < today)
    {

        window.document.getElementById("fromDate").className += " incorrect-input";
    }
    else {
        let bookId = window.localStorage.getItem("bookId");
        let user = JSON.parse(window.sessionStorage.getItem("authInfo"))["user"];

        reservationSent(window.lms.issueService.addNewIssue(bookId, user, fromDate, toDate));
    }
}


function rotate (event){
    if(event)
    {
        if(event.target !== main || !cardIsRotated){
            return;
        }
    }
    cardIsRotated = !cardIsRotated;
    if(cardIsRotated) {
        card.classList.add('card--rotate');
    } else {
        card.classList.remove('card--rotate');
        form.innerHTML = '';
    }
}

function reservationSent ( issue) {
    let message = `Issue ${issue.ID} was sent to Library`;
    window.location = "../account/account.html"
    alert(message);
}



