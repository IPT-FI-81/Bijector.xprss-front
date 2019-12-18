const express = require('express');
const router = express.Router();
const debug = require('debug')('routes:index');
const auth = require('../helpers/auth');
const db = require('../connectors/repos');

/* GET dashboard or index. */
router.get('/', function (req, res, next) {
    if (req.isAuthenticated) {
        console.debug(`user ${req.session.username} is authenticated`);
        db.WorkflowRepo.getAll().then(wfs => {
            res.render('dashboard', {
                title: `Dashboard (${req.session.token})`,
                workflows: wfs
            })
        });
    } else {
        res.render('index', {title: 'This is Bijector.'});
    }
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

const loginform = {
    action: "/login",
    method: "post",
    fields: [
        { type: "string", name: "username", label: "username" },
        { type: "password", name: "password", label: "password" },
    ]
};

router.get('/login', function (req, res) {
    if (req.isAuthenticated) {
        res.redirect('/');
        return;
    }
    res.render('login', {title: 'Login', form: loginform})
});

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        auth.getToken(req.body.username, req.body.password).then(token => {
            if (token) {
                req.session.token = token;
                req.session.username = req.body.username;
                res.redirect('/');
                return;
            } else {
                let form = loginform;
                form.fields[0].value = req.body.username;
                res.render('login', {title: 'Login', form: form, error: 'No user with such credentials found'})
            }
        })
    }
});

module.exports = router;
