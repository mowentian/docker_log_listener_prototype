var app = require('koa')();
var router = require('koa-router')();
var winston = require('winston');
var body = require('co-body');

router
  .post('/', function *() {
    data = yield body.json(this);
    winston.info('POST: ');
    winston.info(data);
    this.body = data;
  })
;

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
winston.info('server started');
