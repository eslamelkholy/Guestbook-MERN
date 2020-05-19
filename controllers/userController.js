const authentication = require("./Authentication");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const client = new OAuth2Client("457064280855-fon6ji3u3aqgi3kpjp03e4lhtfgtshmj.apps.googleusercontent.com");
function userController(userSchema)
{
    // User Registeration
    register = async(request, response) =>{
        try{
            const user = await authentication.saveUserData(userSchema, request);
            await user.save();
            return response.status(201).json(user);
        }catch(err){
            response.status(500);
            return response.send("Please Fill Required Fields");
        }
    }
    // Google Login
    googleLogin = (request, response) =>{
        try{
            const { tokenId } = request.body;
            client.verifyIdToken({idToken: tokenId, audience:"457064280855-fon6ji3u3aqgi3kpjp03e4lhtfgtshmj.apps.googleusercontent.com"})
            .then((_response) =>{
                const {email_verified, name, email} = _response.payload;
                if(email_verified){
                    userSchema.findOne({"email": email},(err, user) =>{
                        if(err){response.status(500).json({message: "Something Went Wrong.."})}
                        if(user){
                            const accessToken = authentication.generateAccessToken(user);
                            response.status(200).json({accessToken, isAuthenticated: true, user: {id: user._id,email:email,role: user.role ,username: user.username}});
                        }else{
                            let password = email + name;
                            let newUser = new userSchema({username:name, email, password});
                            newUser.save((err, data) =>{
                                if(err){console.log(err);response.status(500).json({message: {msgBody: "Something Went Wrong",msgError: true }})}
                                console.log(newUser)
                                const accessToken = authentication.generateAccessToken(newUser);
                                response.status(201).json({accessToken, isAuthenticated: true, user: {id: newUser._id,email:email,role: newUser.role ,username: name}});
                            });
                        }
                    });
                }
            })
        }catch(err){
            response.status(500).json({message: "Something Went Wrong.."});
        }
    }
    // Facebook Login
    facebooklogin = (request, response) =>{
        const{userID, accessToken } = request.body;
        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
        fetch(urlGraphFacebook, {method: "GET"})
        .then(res => res.json())
        .then(res =>{
            const { email, name} = res;
            userSchema.findOne({email}, (err, user) =>{
                if(err){response.status(500).json({message: {msgBody: "Sorry SOmething went Wrong",msgError: true }})}
                if(user){
                    const accessToken = authentication.generateAccessToken(user);
                    response.status(200).json({accessToken, isAuthenticated: true, user: {id: user._id,email:email,role: user.role ,username: user.username}});
                }else{
                    let password = email + name;
                    let newUser = new userSchema({username:name, email, password});
                    newUser.save((err, data) =>{
                        if(err){console.log(err);response.status(500).json({message: {msgBody: "Something Went Wrong",msgError: true }})}
                        console.log(newUser)
                        const accessToken = authentication.generateAccessToken(newUser);
                        response.status(201).json({accessToken, isAuthenticated: true, user: {id: newUser._id,email:email,role: newUser.role ,username: name}});
                    });
                }
            })
        })
    }
    // User Login
    login = async(request, response) =>{
        try{
            const user = await userSchema.findOne({"username" : request.body.username});
            if(user == null)
                return response.status(400).send("User Not Found");
            if(await authentication.validateHashedPassword(request.body.password, user.password))
            {
                const accessToken = authentication.generateAccessToken(user);
                response.status(201).json({accessToken, userData: {id: user._id, name: user.username}});
            }
            response.send({authenticated: false});
        }catch{
            response.status(500).send("Authentication Failed");
        }
    }
    authUser = async(request, response) =>{
        try{
            const user = await userSchema.findById(request.user.id);
            if(user == null)
                return response.status(400).send("User Not Found");
            return response.status(200).json(user);
        }catch{
            response.status(500).send("Authentication Failed");
        }
    }
    return {register, login, authUser, googleLogin, facebooklogin};
}

module.exports = userController;