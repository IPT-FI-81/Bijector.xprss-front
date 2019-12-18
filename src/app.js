const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('cookie-session');
// const {auth, requiresAuth} = require('express-openid-connect');

const crypto = require('crypto');

const indexRouter = require('./routes/index');
const workflowRouter = require('./routes/workflow');
const wfnodeRouter = require('./routes/wfnode');

const app = express();

app.set('trust proxy', 1); // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Authentication

app.use(session({
    secret: 'SAMPLE_KEY_DEBUG_ONLY',
    resave: true,
    saveUninitialized: false
}));

const asyncHandler = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .catch(next);

// Auth
const auth = require('./helpers/auth');
app.use(asyncHandler(auth.isAuthenticated));

//
// app.use(auth({
//   required: false,
//   // auth0Logout: true,
//   baseURL: 'http://localhost:3000',
//   issuerBaseURL: 'http://localhost:5000',
//   clientID: 'bijector.ng-front',
//   authorizationParams: {
//     response_type: "id_token token",
//     scope: "openid profile api.v1"
//   }
// }));

// // Middleware to make the `user` object available for all views
// app.use(function (req, res, next) {
//     res.locals.user = req.openid.user;
//     next();
// });

// Index and Dashboard
app.use('/', indexRouter);
//
app.use('/workflow', workflowRouter);
//
app.use('/wfnode', wfnodeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
