/**
 * 
 * 
 * @author 
 * @link 
 */
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import mount from 'koa-mount';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import compress from 'koa-compress';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Proxy from 'http-proxy';

const https = require('https');
const fs = require('fs');
const console = require('console');
const process = require('process');
const version = require('../package.json').version;
const app = new Koa();
const router = new Router();

router.get('/ping', ctx => {
  ctx.body = 'pong';
}).get('/version', ctx => {
  ctx.body = version;
}).get('/env', ctx => {
  ctx.body = env;//envDetector.metadata || {};
}).get('/config', ctx => {
  ctx.body = config;
});

app.name = 'RskCon';

const proxy = Proxy.createProxyServer({ secure: false });
const ps = (prefix, target) => {
  app.use(mount(prefix, ctx => {
    proxy.web(ctx.req, ctx.res, {
      target
    }, err => {
      console.log(err);
    })
    ctx.respond = false
  }))
}


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(logger());
app.use(conditional());
app.use(etag());
app.use(compress());
app.use(bodyParser());

app.use(async (ctx, next) => {
  await next();
  if (!ctx.body || !ctx.body.length || ctx.get('Content-Length')) return;
  ctx.set('Content-Length', ctx.body.length);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(mount('/vendor', serve('node_modules')));
app.use(serve('web'));


app.listen(process.env.PORT || 8080, () => console.log(`${app.name} started at ${process.env.PORT || 8080}`));

app.listen(process.env.SSLPORT || 8082, () => {
  console.log(`${app.name} started at ${process.env.SSLPORT || 8082}`)
});


export default app;