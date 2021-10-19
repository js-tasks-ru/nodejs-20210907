const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const bodyParse = require('koa-bodyparser');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();

const router = new Router();

app.use(bodyParse());
app.use(serve(path.join(__dirname, 'public')));

router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello!';
});

router.post('/upload', async (ctx, next) => {
    ctx.body = ctx.request.body.message;
});

app.use(router.routes());

app.listen(3000);
