
const fs=require('fs');

const logger=stream=>{
    return async (ctx,next)=>{
        const start = new Date()
        await next();
        let ms = new Date() - start
        stream.write(`${ctx.method}  ${ctx.url}  ${ctx.hostname}  ${ctx.status}  --${ms}ms \n`);

    }
}

module.exports=logger;