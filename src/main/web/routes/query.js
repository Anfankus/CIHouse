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
            if (query.id) {
                //TODO
                //调用hbase根据id搜索
            } else if (query.name) {
                //TODO
                //根据query.name搜索
            } else if (query.field) {
                //TODO 
                //根据query.field
            }
        }
        //=====测试用数据
        let parameters = {
            keys: ["公司名称", 2, 3, 4, 5],
            values: [
                [145623, 2, 3, 4, 5],
                [112255, 22, 33, 44, 55]
            ]
        }
        //======================================//

        await ctx.render('./query', parameters);
    })

module.exports = router
