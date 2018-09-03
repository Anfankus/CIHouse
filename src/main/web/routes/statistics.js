'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/statistics')
    .get('/', async (ctx, next) => {
        let data = {};
        if (ctx.queryString) {
            let query = ctx.query;

            //TODO
            //从HBASE中根据所需统计量搜索
        }
        await ctx.render('./statistics');
    })
    .get('/map',async (ctx,next)=>{
        await ctx.render('./info/map');
    });
module.exports = router
