const { KoaPassport } = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');
const vkontakteStrategy = require('./strategies/vkontakte');
// const githubStrategy = require('./strategies/github');
// const facebookStrategy = require('./strategies/facebook');

passport.use('email-password', localStrategy);
passport.use(vkontakteStrategy);
// passport.use(githubStrategy);
// passport.use(facebookStrategy);

module.exports = passport;
