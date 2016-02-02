var app = require('koa')();
var router = require('koa-router')();
var winston = require('winston');
var body = require('co-body');

router
  .get('/:text', function () {
    text = this.params.text;
    winston.info('GET: ' + text);
    this.body = text;
  })
  .post('/', function *() {
    text = yield body.text(this);
    winston.error('POST: ' + text);
    this.body = text;
  })
  .put('/', function *() {
    text = yield body.text(this);
    winston.warn('PUT: ' + text);
    this.body = text;
  })
;

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
winston.info('server started');
