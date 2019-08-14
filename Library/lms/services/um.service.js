class UmService {
    constructor(){
        this.Storage = new StorageMService(window.localStorage, 'Users');
        this.sessionStorage = new StorageMService(window.sessionStorage, 'authInfo');
    }

    addUser(NewUser) {
        if ( !this.doesUserExist(NewUser.username)) {
            NewUser.password = EncryptionHelper.encrypt(NewUser.password);
            let user = new Human(NewUser);
            this.Storage.addIntoStorage(user);
            this.sessionStorage.setIntoStorage({
                user: user,
                permissions: 'permission'
            });
        }
         else {
            throw new UserAlreadyExists("Sorry there are user with such username");
        }
    }

    doesUserExist(username){
        let users = this.Storage.getFromStorage();
        for(let user of users){
            if(user.username === username){
                return true;
            }
        }
        return false;
    }

    getUserByUsername(username) {
        let users = this.Storage.getFromStorage();
            for(let user of users) {
                if (user.username === username) {
                    return user;
                }
            }
            throw new UserAlreadyExists("Sorry there are no user with such username");
    }

    /*
    * login,bookID
    * */
    requestBook(book){
        window.lms.issueService.addNewIssue(book);
    }


}
