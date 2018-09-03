//====返回所查看企业的信息页面(根据ID)，不接受根路径的请求

'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/detail')
    .param('id', async (id, ctx, next) => {
        if (!isNaN(id) && id.length === 6) {
            ctx.id = parseInt(id);
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

        let data={
            '1':'1',
            '2':'2'
        }
        await ctx.render('./info/basic', {
            title: '基本信息',
            obj: data
        });
    })

    // 营收情况
    .get('/:id/finance', async (ctx, next) => {
        //TODO 获取数据，格式为对象
        //hbase.get().then(async datas=>{
        await ctx.render('./info/finance', {
            title: '财务信息',
            obj: data
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
        //hbase.get().then(async datas=>{
        let datas=[{keys:[1,2,3,4,5,6],values:[[0,0,0,0,0,0],[1,1,1,1,1,1]]},
                    {keys:[1,2,3,4,5,6],values:[[3,3,3,3,3,3],[4,4,4,4,4,4]]},
                    {keys:[1,2,3,4,5,6],values:[[5,5,5,5,5,5],[6,6,6,6,6,6]]}];

        let rep=/率$/.compile();
        let op_legends_data = [];//统计量名，即每行数据第一列
        let op_xAxis = [];
        let op_series = [];     //每个统计量的图表内容即样式
        let titles=['利润','资产负债','现金流量'];
        datas.forEach(element => {
            op_xAxis.push(element.keys.slice(1));
            op_series.push(element.values.map(each => {
                op_legends_data.push(each[0]);
                return {
                    name: each[0],
                    type: 'line',
                    //yAxisIndex:rep.test(each[0])?1:0,
                    data: each.slice(1)
                };
            }));
        });
        let lineOps=[];
        for(let i=0;i<3;i++){
            lineOps.push({
                title:{
                    x:'center',
                    text:titles[i]
                },
                tooltip:{},
                legend:{
                    width:'1000px',
                    orient: 'vertical',
                    right:10,
                    data:op_legends_data[i]
                },
                xAxis:{data:op_xAxis[i]},
                yAxis:[{
                    name:'金额',
                    type:'value'
                }],
                series:op_series[i]
            })
        }


        let pagaParam = {
            tables: [0,1,2].map(
                index=>{return {title:titles[index],keys:datas[index].keys,values: datas[index].values}}),
            optionLine:lineOps.map(each=>JSON.stringify(each))
            // option_2: JSON.stringify(option2)
        }
        await ctx.render('./info/history', pagaParam);
    })

module.exports = router
