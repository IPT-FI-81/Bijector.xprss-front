// const crypto = require('crypto');
//
// const algorithm = 'aes-192-cbc';
// const password = 'SAMPLE_KEY_DEBUG_ONLY';
// const key = crypto.scryptSync(password, 'SAMPLE_SALT_DEBUG_ONLY', 24);
// const iv = Buffer.alloc(16, 0); // Initialization vector.
// const cipher = crypto.createCipheriv(algorithm, key, iv);

const userdb = require('../connectors/fakeback').UserAuthRepo;

// Returns promise with token
module.exports.getToken = function (username, password) {
    return userdb.getBy('username', username).then(user => {
        if (!user[0]) return false;
        if (password === user[0].password) {
            return process.env.OAUTH_ACCESS_TOKEN;
        }
        return false;
    })
};

module.exports.isAuthenticated = function (req, res, next) {
    if (req.session.isNew || !req.session.hasOwnProperty('username')) {
        req.isAuthenticated = false;
        next();
    } else {
        let token = req.session.token;
        let username = req.session.username;
        userdb.getBy('username', username).then(u => {
            req.isAuthenticated = token === process.env.OAUTH_ACCESS_TOKEN;
            next();
        })
    }
};