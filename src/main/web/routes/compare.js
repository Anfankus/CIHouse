'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/compare')
    .param('ids', async (ids, ctx, next) => {
        let re = /^\d{6}-\d{6}$/;
        if (re.test(ids)) {
            let paras = ids.split('-');
            ctx.ids = paras.map(x => parseInt(x));
            next();
        }
    })
    .get('/:ids', async (ctx, next) => {
        let data = {};
        if (ctx.ids !== undefined) {
            console.log(ctx.ids);

            //TODO
            //从HBASE中根据公司ID搜索企业详情

        }

        //await ctx.render('./compare',data);
    })

module.exports = router
