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
    getConfig(){
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        }
        const token = this.getToken();
        if(token){
            config.headers['x-auth-token'] = token;
        }
        return config;
    }

}
export default new Auth();