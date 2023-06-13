// middle ware is also a kind of funation
// here we are creating a middleware as we could be using the app for various other
// purpose in future and in those purpose we would require to get the user id from the jwt token, do to do that awe are making the use of the middleware
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'JaiIsAGoodBoy';

const fetchuser = (req, res, next) => {
    //get the user from the jwt token ans add id to the request

    //here auth-token is the name we have given to the header now only, so that when we will be sending our request, then the header we will be sending will be sent with the name auth-token only
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        // middle ware take three arguments , herer next is the next function to be called, here it is the function that is written after the middleware where the routing is done
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;