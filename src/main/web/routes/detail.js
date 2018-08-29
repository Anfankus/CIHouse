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
        await ctx.render('./info/basic',{title:'基本信息',obj:data});
    })

    // 营收情况
    .get('/:id/finance',async (ctx,next)=>{
        let data={
            '营业收入':12134,
            '营业利润':456789,
            '净利润':123456
        }
        await ctx.render('./info/finance',{title:'财务信息',obj:data})
    })

    // 风险评估
    .get('/:id/risk',async(ctx,next)=>{
        let data={
            title_1:'经营风险',
            titile_2:'司法风险',
            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]],
        }

        await ctx.render('./info/risk',data);
    })

    // 
    .get('/:id/history',async(ctx,next)=>{
        let title1='利润';
        let title2='资产负债';
        let title3='现金流量';
        let option1={
            title:{
                text:'利润'
            },
            tooltip:{},
            legend:{
                data:['净利润','销售费用']
            },
            xAxis:{
                data:['2014年','2015年','2016年','2017年']
            },
            yAxis:{},
            series:[{
                name:'净利润',
                type:'line',
                data:[100,120,150,180]
            },{
                name:'销售费用',
                type:'line',
                data:[130,160,200,250]
            }]
        };

        let data={
            title_1:title1,
            title_2:title2,
            title_3:title3,

            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]],
            keys_3:[4,5,6,7],
            values_3:[[3,3,3,3],[4,4,4,4]],
            option_1:JSON.stringify(option1),
            option_2:JSON.stringify(option1) 
        }
        await ctx.render('./info/history',data);
    })

module.exports = router
