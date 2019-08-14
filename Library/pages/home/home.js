let main;
let card;
let form;
let cardIsRotated = false;
let formName = null;

window.onload = function(){
    window.lms = new LMS();
    card = document.getElementById('card');
    form = document.getElementById('form');
    main = document.getElementById('main');

    form.addEventListener('keypress',submit);

}

function rotate (event){
    if(event)
    {
        if(event.target != main || !cardIsRotated){
            return;
        }
    }
    cardIsRotated = !cardIsRotated;
    if(cardIsRotated) {
        card.classList.add('card--rotate');
        form.addEventListener('keypress',submit);
    } else {
        card.classList.remove('card--rotate');
        form.innerHTML = '';
        form.removeEventListener('keypress',submit);
    }
}

window.addFormItems = function addFormItems(eventElement) {
    let login = "<span id='error-message' class='error-message'></span>" +
                "<div class=\"card__form__list\">\n" +
                "<input type=\"text\" name=\"username\" id=\"username\" placeholder=\"username\" class='shk-input' autocomplete='off'><br>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"card__form__list\">\n" +
                "<input type=\"password\" name=\"password\" id=\"password\" placeholder=\"password\" class='shk-input' autocomplete='off'><br>\n" +
                "</div>\n" +
                "<div class=\"card__form__Login_button\" onclick='login()'><span>Login<span></div>";

    let signUp = '<span id="error-message" class="error-message"></span>\n' +
                '<div class="card__form__list">\n' +
                '<input type="text" name="username" id="username" placeholder="username" required class="shk-input" autocomplete=\'off\'><br>\n' +
                '</div>\n' +
                '<div class="card__form__list">\n' +
                '<input type="password" name="password" id="password" placeholder="password" required class="shk-input" autocomplete=\'off\'><br>\n' +
                '</div>\n' +
                '\n' +
                '<div class="card__form__list">\n' +
                '<input type="email" name="email" id="email" placeholder="example@gmail.com" required class="shk-input" autocomplete=\'off\'><br>\n' +
                '</div>\n' +
                '\n' +
                '<button class="card__form__sign_up_button raised-button" onclick="signUp()">Sign Up</button>\n';

    if(eventElement === 'login'){
        form.insertAdjacentHTML( 'afterbegin' ,login );
        formName = 'login';
    } else if(eventElement === 'sign up'){
        form.insertAdjacentHTML( 'afterbegin' ,signUp );
        formName = 'signUp';
    }
}


function submit(event){
    if( event.key === 'Enter'){
        switch (formName) {
            case 'login':
                login();
                break;
            case 'signUp':
                signUp();
                break;
            default:
                console.log(event);
                return;
        }
    }
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let incorrect = false;

    if( username === '')
    {
        document.getElementById('username').classList.add('incorrect-input');
        incorrect = true;
    }
    if(password === '')
    {
        document.getElementById('password').classList.add('incorrect-input');
        incorrect = true;
    }

    if(incorrect){
        return;
    }

    try {
        let info = window.lms.authService.login(username, password);
        window.location = '../account/account.html';
    } catch (e) {
        console.log(e);
        document.getElementById('username').classList.add('incorrect-input');
        document.getElementById('password').classList.add('incorrect-input');
    }
}

function signUp() {
    document.getElementById('password').classList.remove('incorrect-input');
    document.getElementById('username').classList.remove('incorrect-input');
    document.getElementById('email').classList.remove('incorrect-input');

    let newUser = {};
    //newUser.name = document.getElementById('name').value;
    //newUser.surname = document.getElementById('surname').value;
    //newUser.age = document.getElementById('age').value;
    newUser.email = document.getElementById('email').value;
    //newUser.phoneNumber = document.getElementById('phoneNumber').value;
    newUser.username = document.getElementById('username').value;
    newUser.password = document.getElementById('password').value;

    let incorrect = false;
    if( newUser.email.match(/[^0-9,_,\-,@,.,a-z,A-z]/g) != null || newUser.email === '' || newUser.email.indexOf('@')=== -1)
    {
        document.getElementById('email').classList.add('incorrect-input');
        incorrect = true;
    }
    if( newUser.username.match(/[^0-9,_,\-,a-z,A-z]/g) != null || newUser.username === '')
    {
        document.getElementById('username').classList.add('incorrect-input');
        incorrect = true;
    }
    if(newUser.password === '')
    {
        document.getElementById('password').classList.add('incorrect-input');
        incorrect = true;
    }

    if(incorrect){
        return;
    }

    try{
        window.lms.authService.umService.addUser(newUser);
        window.location = '../account/account.html';
    }catch (e) {
        if(e instanceof UserAlreadyExists){
            document.getElementById('username').classList.add('incorrect-input');
            document.getElementById('username').value = '';
            document.getElementById('username').placeholder ='username is taken!';
        }
    }

    Window.aaa = newUser;

}

