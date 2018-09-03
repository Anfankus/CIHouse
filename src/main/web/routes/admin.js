//====返回管理员页面

'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/admin')
    .get('/', async (ctx, next) => {
        //TODO
        //返回日志、查询记录

        await ctx.render('./admin');
    })
    .get('/log', async(ctx,next)=>{
        ctx.body='test';
    })
    .get('/record',async(ctx,next)=>{
        
    })

module.exports = router
