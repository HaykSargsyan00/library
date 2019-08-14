class Human{
    constructor({username,password,name,surname,age,email,phoneNumber,status}) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.username = username;
        this.password = password;

        let id = window.localStorage.getItem('UserLastId');
        id++;
        this.ID = '#' + id;
        window.localStorage.setItem('UserLastId',id);
    }
}

