'use strict'
const router = require('koa-router')()
const hbase = require('../hbase/hbase-server');

router
    .prefix('/compare')
    .get('/',async(ctx,next)=>{
        await ctx.render('./compare');
    })
    .param('ids', async (ids, ctx, next) => {
        let re = /^\d{6}-\d{6}$/;
        if (re.test(ids)) {
            let paras = ids.split('-');
            ctx.ids = paras;
            return next();
        }
        else
            return false;
    })
    .get('/:ids', async (ctx, next) => {
        //返回一个对象，{keys:[],values:[[]],x:[[]]}，分别代表表格键，表格值，图值
        let datas = await hbase.returnComparison(ctx.ids[0], ctx.ids[1]).then(datas =>datas);
        let data = {
            title: '企业信息对比',
            //chartData:{keys[0]:}
            keys: datas.keys,
            values: datas.values,
            chartkeys:JSON.stringify(datas.keys),
            chartvalues:JSON.stringify(datas.values)
        };
        await ctx.render('./info/compareinfo', data);
    })

module.exports = router
