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

        //await ctx.render('./statistics', data);
    })

module.exports = router
