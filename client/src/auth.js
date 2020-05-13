class Auth{
    constructor() {
        this.authenticated = false;
        this.token = localStorage.getItem('token');
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

}
export default new Auth();