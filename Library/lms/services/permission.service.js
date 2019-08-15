class Permissions {
    permissions = {
        canManageBook: false,
        issueBook: false,
        returnBook: false,
        acceptIssue: false,
        refuseIssue: false,
    };

    getPermissions(role) {
        let permissions = this.permissions;
        if (role === 'user') {
            permissions.issueBook = true;
            permissions.returnBook = true;
            permissions.issueBook = true;
            return permissions;
        }
        if (role === 'librarian') {
            permissions.canManageBook = true;
            permissions.issueBook = true;
            permissions.returnBook = true;
            permissions.acceptIssue = true;
            permissions.refuseIssue = true;

            return permissions;
        }
    }
}
