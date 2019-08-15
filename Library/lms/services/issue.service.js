class IssueService{
    constructor(){
        this.PendingIssueStorage = new StorageMService(window.localStorage, 'PendingIssues');
        this.AcceptedIssuStorage = new StorageMService(window.localStorage, 'AcceptedIssues');
        this.RejectedIssuStorage = new StorageMService(window.localStorage, 'RejectedIssues');

        this.BookManager = new BmService();
    }

    addNewIssue(bookId,user,fromDate,toDate){
        let newIssue = new BookIssue(bookId,user,fromDate,toDate);
        this.PendingIssueStorage.addIntoStorage(newIssue);
        return newIssue;
    }

    /*chenq nayum*/
    requestToRenewalTheBook(){

    }

    getHistoryOfUser(user){
        let result = [[],[],[]];
        for (let issue of this.PendingIssueStorage.getFromStorage())
        {
            if(issue.username ===  user.username)
            {
                result[0].push(issue);
            }
        }
        for (let issue of this.AcceptedIssuStorage.getFromStorage())
        {
            if(issue.username ===  user.username)
            {
                result[1].push(issue);
            }
        }
        for (let issue of this.RejectedIssuStorage.getFromStorage())
        {
            if(issue.username ===  user.username)
            {
                result[2].push(issue);
            }
        }
        return result;
    }

    getAllPendingIssues(){
        return this.PendingIssueStorage.getFromStorage();
    }

    acceptIssue(issueId){

        let pendingArr = this.PendingIssueStorage.getFromStorage();

        for (let i = 0; i < pendingArr.length; i++) {
            if(pendingArr[i].Id===issueId)
            {
                this.AcceptedIssuStorage.addIntoStorage(pendingArr[i]);
                pendingArr[i]=pendingArr[pendingArr.length-1];
                pendingArr = pendingArr.slice(0,pendingArr.length-1);
                break;
            }
        }
        this.PendingIssueStorage.setIntoStorage(pendingArr);

    }

    rejectIssue(issue){


        let pendingArr = this.PendingIssueStorage.getFromStorage();

        for (let i = 0; i < pendingArr.length; i++) {
            if(pendingArr[i].Id===issueId)
            {
                this.RejectedIssuStorage.addIntoStorage(pendingArr[i]);
                pendingArr[i]=pendingArr[pendingArr.length-1];
                pendingArr = pendingArr.slice(0,pendingArr.length-1);
                break;
            }
        }
        this.PendingIssueStorage.setIntoStorage(pendingArr);
    }
}

