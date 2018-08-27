//====返回管理员页面

'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/admin')
    .get('/', async (ctx, next) => {
        let data = {};
        //TODO
        //返回日志、查询记录

        await ctx.render('./admin',data);
    })

module.exports = router
