const authentication = require("./Authentication");
function userController(userSchema)
{
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
    return {register};
}

module.exports = userController;