const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const xtpl = require('koa-xtpl')

const path = require('path');
const fs=require('fs');

const mylogger=require('./middlewares/logger')

const index = require('./routes/index')
const detail=require('./routes/detail')
const query=require('./routes/query');
const rank = require('./routes/rank')
const compare=require('./routes/compare')
const statistics=require('./routes/statistics');
const admin=require('./routes/admin');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
let loggerfile=fs.createWriteStream('./logs/access.log',{flags:'a',encoding:'utf-8'});
app.use(mylogger(loggerfile));

app.use(require('koa-static')(__dirname + '/public'));

app.use(xtpl({
  root:path.join(__dirname,'views'),
  extname:'html'}));

// logger
app.use(async (ctx, next) => {
  if(ctx.originalUrl==='/')
    ctx.redirect('/index');
  else{
    await next()
   }
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(query.routes(),query.allowedMethods());
app.use(detail.routes(),detail.allowedMethods());
app.use(compare.routes(),compare.allowedMethods());
app.use(rank.routes(), rank.allowedMethods());
app.use(statistics.routes(),statistics.allowedMethods());
app.use(admin.routes(),admin.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
