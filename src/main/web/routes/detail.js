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
        await ctx.render('./detail');
    })
    .get('/:id/basic',async (ctx,next)=>{
        let data={
            '公司名称':'张可的公司',
            '高管':'张可',
            '公司位置':'不知道'
        }
        await ctx.render('./info/basic',{obj:data});
    })
    .get('/:id/finance',async (ctx,next)=>{
        let data={
            '营业收入':12134,
            '营业利润':456789,
            '净利润':123456
        }
        await ctx.render('./info/finance',{obj:data})
    })
    .get('/:id/risk',async(ctx,next)=>{
        let data={
            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]],
            d:'123'
        }

        await ctx.render('./info/risk',data);
    })
    .get('/:id/history',async(ctx,next)=>{
        var option_1 = {
            title: {
                text: '条形图'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        let option_2={
            title:{
                text:'折线图'
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
            keys_1:[1,2,3],
            values_1:[[1,1,1],[2,2,2]],
            keys_2:[4,5,6,7],
            values_2:[[3,3,3,3],[4,4,4,4]],
            keys_3:[4,5,6,7],
            values_3:[[3,3,3,3],[4,4,4,4]],
            option1:JSON.stringify(option_1),
            option2:JSON.stringify(option_2) 
        }
        await ctx.render('./info/history',data);
    })

module.exports = router
