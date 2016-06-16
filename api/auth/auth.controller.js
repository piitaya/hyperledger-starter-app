'use strict';

var user_manager = require('../../utils/users');
var jwt = require('jsonwebtoken');

var SECRET = "mySecret";
/*
    Register to the app
    METHOD: POST
    URL: /api/auth/register
    Parameters:
        { username: username }
    Response:
        { username: username, password: password }
*/
exports.register = function(req, res) {
    var role = 1;

    user_manager.registerUser(req.body.username, role, function (err, creds) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Error during registration."
            });
        } else {
            res.status(200).json({
                username: creds.id,
                password: creds.secret
            });
        }
    });
}

/*
    Login to the app
    METHOD: POST
    URL: /api/auth/register
    Parameters:
        { username: username, password: password }
    Response:
        { token: token }
*/
exports.login = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    user_manager.login(username, password, function (err) {
        if (err) {
            console.log(err);
            res.status(401).json({
                message: "Wrong username or password."
            });
        } else {
            var token = generateToken({username: username});
            res.status(200).json({
                token: token
            });
        }
    });
}

exports.verify = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token;
    var authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
        token = req.headers['authorization'].split(" ")[1];
    }

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.account = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            message: 'No token provided.'
        });
    }
}

function generateToken(user) {
    return jwt.sign(user, SECRET, {
        expiresIn: 24 * 60 * 60 // expires in 24 hours
    });
}
