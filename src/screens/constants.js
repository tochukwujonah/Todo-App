const users = JSON.parse(localStorage.getItem('users')) || [];
let check_user = false;
for(let user of users){
        if(user.loggedIn) {
            check_user = true;
        }
}


export const auth = {
    isAuth: check_user ? check_user : false,
    signIn(cb){
        this.isAuth = true;
        cb();
    },

    signOut(cb){
        this.isAuth = false;
        cb();
    }
}