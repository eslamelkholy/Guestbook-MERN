const bcrypt = require("bcrypt");
module.exports = {
    saveUserData: async (userSchema, request) =>{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        console.log(hashedPassword);
        const user = new userSchema({
            username: request.body.username,
            password: hashedPassword,
            email: request.body.email
        });
        return user;
    },
    validateHashedPassword: async(userPassword, hashedPassword) =>{
        return await bcrypt.compare(userPassword, hashedPassword);
    }
}