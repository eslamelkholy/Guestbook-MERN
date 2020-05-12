const jwt = require('jsonwebtoken');

function auth(request, response, next){
    const token = request.header('x-auth-token');
    // Check For Token
    if(!token) response.status(401).json({msg: "No Token, authorization Denied"})
    // Verify Token
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // Add user from payload
        request.user = decoded;
        next();
    }catch(err){
        response.status(400).json({msg: "Token is Not Valid"});
    }
}
module.exports = auth;
