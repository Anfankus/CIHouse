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
    
    // 进入详情时默认先展示 basic
    // .get('/:id', async (ctx, next) => {
    //     await ctx.render('./detail');
    // })

    // 基本信息
    .get('/:id/basic',async (ctx,next)=>{
        let data={
            '公司名称':'张可的公司',
            '高管':'张可',
            '公司位置':'不知道'
        }
        await ctx.render('./info/basic',{obj:data});
    })

    // 营收情况
    .get('/:id/finance',async (ctx,next)=>{
        let data={
            '营业收入':12134,
            '营业利润':456789,
            '净利润':123456
        }
        await ctx.render('./info/finance',{obj:data})
    })

    // 风险评估
    .get('/:id/risk',async(ctx,next)=>{
        let data={
            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]]
        }
        await ctx.render('./info/risk',data);
    })

    // 
    .get('/:id/history',async(ctx,next)=>{
        let data={
            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]],
            keys_3:[4,5,6,7],
            values_3:[[3,3,3,3],[4,4,4,4]] 
        }
        await ctx.render('./info/history',data);
    })

module.exports = router
