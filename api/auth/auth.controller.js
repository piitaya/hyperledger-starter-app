'use strict';

var user_manager = require('../../utils/users');
var jwt = require('jsonwebtoken');

/**
 * Handles form posts for registering new users.
 * @param req The request containing the registration form data. {username: username}
 * @param res The response.
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

/**
 * Handles form posts for login requests.
 * @param req The request containing the login form data. {username: username, password: password}
 * @param res The response.
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

function generateToken(user) {
    return jwt.sign(user, "mySecret", {
        expiresIn: 24 * 60 * 60 // expires in 24 hours
    });
}
