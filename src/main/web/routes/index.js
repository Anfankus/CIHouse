//处理对首页的GET请求，返回首页页面

'use strict'
const router = require('koa-router')()

router
    .prefix('/index')
    .get('/', async (ctx, next) => {
        await ctx.render('./index');
    })

module.exports = router
