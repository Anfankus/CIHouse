//====返回所查看企业的信息页面(根据ID)，不接受根路径的请求

'use strict'
const router = require('koa-router')()
const hbase = require('../hbase/hbase-server');

router
    .prefix('/detail')
    .param('id', async (id, ctx, next) => {
        if (!isNaN(id) && id.length === 6) {
            ctx.id =id;
            return next();
        } else {
            return false;
        }
    })
    .get('/:id', async (ctx, next) => {
        await ctx.render('./detail', {
            pagetitle: '公司信息'
        });
    })

    // 基本信息
    .get('/:id/basic', async (ctx, next) => {
        //TODO 获取数据，格式为对象
        //hbase.get().then(async datas=>{
        await hbase.basic(ctx.id).then(async data=>{
            let tempholder=data.shareholder.trim().split(' ');
            let tempcount=data.account.trim().split(' ');
            let pieData=tempholder.map((each,index)=>{return {name:each,value:tempcount[index]}});
            await ctx.render('./info/basic', {
                title: '公司详情',
                listtitle: '公司概况',
                obj: data.info,
                pie:JSON.stringify(pieData)
            });
    
        }).catch(err=>{
            console.log(err);
            ctx.status=404;
        })
    })

    // 营收情况
    .get('/:id/finance', async (ctx, next) => {
        //TODO 获取数据，格式为对象
        await hbase.finance(ctx.id).then(async data => {
            await ctx.render('./info/finance', {
                title: '财务信息',
                obj: data.info
            })
        })
    })
    // 风险评估
    .get('/:id/risk', async (ctx, next) => {
        let data = {

        }

        await ctx.render('./info/risk', data);
    })

    // 
    .get('/:id/history', async (ctx, next) => {
        //TODO 获取数据，一次调用，三个对象（利润，资产负债，现金流量），
        ///每个对象为{keys:[年份],vals:[[单个统计量],...]},代表表格第一行和余下行
        await hbase.historyTable(ctx.id).then(async datas=>{
        let titles = ['利润', '资产负债', '现金流量'];

        let pagaParam = {
            title: '历史数据',
            tables: [0, 1, 2].map(
                index => {
                    return {
                        title: titles[index],
                        keys: datas[index].keys,
                        values: datas[index].values
                    }
                }),
            datas:JSON.stringify(datas)
        }
        await ctx.render('./info/history', pagaParam);
    });
})

module.exports = router
