//处理对首页的GET请求，返回首页页面

'use strict'
const router = require('koa-router')()

router
    .prefix('/index')
    .get('/', async (ctx, next) => {
        let parameters = {
            title: '首页页面'
        }
        await ctx.render('./query', parameters);
    })

module.exports = router
