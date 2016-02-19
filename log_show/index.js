var app = require('koa')();
var router = require('koa-router')();
var winston = require('winston');
var body = require('co-body');
var kstatic = require('koa-static');
var views = require('koa-views');
var socket = require('koa-socket');

var counts = {
    error: 0,
    warn: 0,
    info: 0,

  add_counts: function(data) {
    this.error += data.error === undefined ? 0 : data.error;
    this.warn += data.warn === undefined ? 0 : data.warn;
    this.info += data.info === undefined ? 0 : data.info;
  },
  print: function() {
    winston.error('total error:' + this.error);
    winston.warn('total warn:' + this.warn);
    winston.info('total info:' + this.info);
  },
  diagram_data: function() {
    return [
      {label: "error", value: this.error},
      {label: "warn", value: this.warn},
      {label: "info", value: this.info}
    ];
  }
};

app
  .use(kstatic('./public'))
  .use(views(__dirname +'/views', 'jade', {}))
  .use(router.routes())
;

var io = new socket();
io.attach(app);
io.on('connection', (ctx, data) => {
  counts.print();
  io.broadcast('counts', counts.diagram_data());
});

router
  .post('/', function *() {
    var data = yield body.json(this);

    counts.add_counts(data);
    counts.print();
    io.broadcast('counts', counts.diagram_data());

    this.body = data;
  })
  .get('/', function *(next) {
    yield this.render('index.jade');
  })
;

app.server.listen(3001);
winston.info('server started');
