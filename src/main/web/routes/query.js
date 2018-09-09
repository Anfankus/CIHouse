//处理首页查询请求，返回查询结果页面
//查询内容：企业代码(id,int) [，名称(name,string)，企业领域(field,string)]

'use strict'

const router = require('koa-router')();

const hbase = require('../hbase/hbase-server');
const fs=require('fs');

let data=fs.readFileSync('./public/json/keyword.json','utf8');
let ws=fs.createWriteStream('./public/json/keyword.json',{flags:'w'});
let dataJson=JSON.parse(data);
setInterval(()=>{
    ws.write(JSON.stringify(dataJson));
},10000)
router
    .prefix('/query')
    .get('/', async (ctx, next) => {
        let parameters = {
            querySrc: `\"${ctx.query.search}\"`,
            keys: ["公司代码", "公司名称", "公司位置", "总股本", "总市值", "净利润"],
            values: []
        };
        if (ctx.query.search) {
            let query = ctx.query;
            dataJson[query.search]=dataJson[query.search]?dataJson[query.search]+1:1;
            if (isNaN(query.search)) {
                let name = query.search;
                await hbase.simple_name(name).then(data => {
                    parameters.values = data.map(each => each.simpleinfo);

                })
            }
            else {
                let id = query.search;
                await hbase.simple_ID(id).then(data => {
                    parameters.values.push(data.simpleinfo);
                })
            }
            parameters.count = parameters.values.length;
            await ctx.render('./query', parameters);

        }
        else
            await ctx.redirect('./index');
    })

module.exports = router
