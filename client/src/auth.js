class Auth{
    constructor() {
        this.authenticated = false;
        this.token = localStorage.getItem('token');
        this.user = "";
    }
    login(cb)
    {
        this.authenticated = true;
        cb();
    }
    logout(cb){
        this.authenticated = false;
        cb();
    }
    isAuthenticated(){
        return this.authenticated;
    }
    setToken(token){
        this.token = token;
    }
    getToken(){return this.token}
    setUserData(user){
        this.user = user;
    }
    getUserData(){return this.user}

}
export default new Auth();