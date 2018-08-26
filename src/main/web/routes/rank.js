//处理排名功能的请求，返回排名结果页面
//排名类型：

'use strict'
const router = require('koa-router')();

router
    .prefix('/rank')
    .get('/', async (ctx, next) => {
        //await ctx.render('rank');
    })

module.exports = router;