const authentication = require("./Authentication");
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
    return {register, login};
}

module.exports = userController;