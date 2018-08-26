//====返回所查看企业的信息页面(根据ID)，不接受根路径的请求

'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/detail')
    .param('id', async (id, ctx, next) => {
        if (!isNaN(id)&&id.length===6) {
            ctx.id = parseInt(id);
            return next();
        } else {
            return false;
        }
    })
    .get('/:id', async (ctx, next) => {
        let data = {};
        if (ctx.id !== undefined) {
            //TODO
            //从HBASE中根据公司ID搜索企业详情

        }

        await ctx.render('./detail', data);
    })

module.exports = router
