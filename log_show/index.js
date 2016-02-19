var app = require('koa')();
var router = require('koa-router')();
var winston = require('winston');
var body = require('co-body');
var kstatic = require('koa-static');
var views = require('koa-views');
var socket = require('koa-socket');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ],
  exitOnError: false
});

var counts = {
    error: 0,
    warn: 0,
    info: 0,

  add_counts: function(data) {
    logger.info(data);
    this.error += data['0'] === 'error:' ? data['1']: 0;
    this.warn += data['0'] === 'warn:' ? data['1']: 0;
    this.info += data['0'] === 'info:' ? data['1']: 0;
  },
  print: function() {
    logger.error('total error:' + this.error);
    logger.warn('total warn:' + this.warn);
    logger.info('total info:' + this.info);
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
logger.info('server started');
