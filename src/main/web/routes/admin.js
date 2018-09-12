//====返回管理员页面

'use strict'
const router = require('koa-router')()
const fs = require('fs');
const readline = require('readline');
//const hbase = require('hbase-server');
router
    .prefix('/admin')
    .get('/', async (ctx, next) => {
        await ctx.render('./admin');
    })
    .get('/1', async (ctx, next) => {
        let x = parseInt(ctx.request.query.x);
        await readLines(x).then(async data => {
            ctx.body = data;
        })
    })
    .get('/2', async (ctx, next) => {
        let data=fs.readFileSync('./public/json/keyword.json','utf8');
        ctx.body=data;
    })
async function readLines(x) {
    return new Promise(async (resolve, rejected) => {
        let index = 0;
        let data = [];
        let inputsteam = fs.createReadStream('./logs/access.log');
        const rl = readline.createInterface({
            input: inputsteam,
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {
            index++;
            if (index >= x + 16) {
                rl.close();
                rl.removeAllListeners('line');
            } else if (index >= x)
                data.push(line);
        });
        rl.on('close', () => {
            resolve(data);
        })
    })

}
module.exports = router
