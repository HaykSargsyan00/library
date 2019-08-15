class AuthService {

    constructor(umService, permissionService) {
        this.umService = umService;
        this.permissionService = permissionService;
        this.sessionStorage = new StorageMService(window.sessionStorage, 'authInfo');
    }

    login(username, password) {
        let user = this.umService.getUserByUsername(username);

        if(user == null) {
            throw new Error(`user with ${username} not found`);
        }


        if(user.password === EncryptionHelper.encrypt(password)) {
            //let userPermissions = this.permissionService.getPermissions(user.role);
            let permissions =  window.lms._permissions.getPermissions(user.status);
            this.sessionStorage.setIntoStorage( {user: user,permissions: permissions} );
        } else {
            throw new Error(`incorrect username or password`);
        }

        return user;
    }

    logout() {
        sessionStorage.removeItem('authInfo');
        window.location = '../home/home.html';
    }

    /*isLoggedIn*/
    isLogined() {
            return sessionStorage.getItem('authInfo') != null;
    }

    signUp(){

    }
}
