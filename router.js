const Authtication = require('./controller/authentication')
const passportService = require('./services/passport')
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {

    app.post('/signup', Authtication.signup)
    app.post('/signin', requireSignin, Authtication.signin)

    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: req.user });
    });
}