const jwt = require('jsonwebtoken');

function auth(request, response, next){
    const token = request.headers('x-auth-token');

    // Check For Token
    if(!token) response.status(401)
    
}