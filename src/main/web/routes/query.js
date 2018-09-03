//处理首页查询请求，返回查询结果页面
//查询内容：企业代码(id,int) [，名称(name,string)，企业领域(field,string)]

'use strict'

const router = require('koa-router')();
//const hbase = require('hbase-server');

router
    .prefix('/query')
    .get('/', async (ctx, next) => {
        let data = {};
        if (ctx.queryString) {
            let query = ctx.query;
            if(isNaN(query.search)){
                let name=query.search;
            }
            else{
                let id=query.search;
            }

        }
        //=====测试用数据
        let parameters = {
            querySrc:`\"${ctx.query.search}\"`,
            keys: ["公司代码", "公司名称", "公司位置", "总股本", "总市值","净利润"],
            values: [
                [145623, 2, 3, 4, 5,6],
                [112255, 22, 33, 44, 55,66]
            ],
        }
        parameters.count=parameters.values.length;
        //======================================//

        await ctx.render('./query', parameters);
    })

module.exports = router
