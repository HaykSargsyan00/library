class LMS {

    constructor() {
        this._authService = new AuthService(new UmService());
        this._bookManagementService = new BmService();
        this._issueService = new IssueService();
        this._permissions = new Permissions();
    }

    get permissions() {
        return this._permissions;
    }
    get authService() {
        return this._authService;
    }

    get bookManagementService(){
        return this._bookManagementService;
    }

    get issueService(){
        return this._issueService;
    }
}

window.onload = function () {
    window.lms = new LMS();
};

