import Axios from 'axios';
class Auth{
    constructor() {
        this.authenticated = false;
        this.token = localStorage.getItem('token');
        this.user = "";
        this.TokenValidation();
    }
    login(cb)
    {
        this.authenticated = true;
        cb();
    }
    logout(cb){
        this.authenticated = false;
        this.token = localStorage.removeItem('token');
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
    async TokenValidation(){
        if(this.getToken())
        {
            await Axios.get("http://localhost:8000/user",this.getConfig())
            .then((res) => {
                res.data.id = res.data._id;
                this.setUserData(res.data);
                this.authenticated = true;
            }).catch((err) =>{
                console.log(err)
                this.authenticated = false;
            })
        } 
    }

}
export default new Auth();