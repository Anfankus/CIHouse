var assert = require('assert');
var hbase = require('hbase');
//连接HBase
var client=hbase({ 
    host: '192.168.161.128',
    port: 8585 
});

function Test(value)
{
    this.name=value[2].$;
    this.manager=value[1].$;
    this.profit=value[0].$;
    this.netAsset=value[3].$;
}

// function ttttest(x)
// {
//     return new Promise(function(resolve,rejected){
//         client.table('basicinfo')
//         .row(x)
//         .get((err, value) => {
//             if(value){
//                 let t=new Test(value);
//                 resolve(t);
//             }
//             if(err){
//                 rejected(err);
//             }
//         });
    
//     })
// }
// ttttest('10001')
// .then(val=>{console.log('2:');console.log(val)})
// .catch(err=>console.log(err));
// console.log('3')
//searchByName('Apple').then(val=>{console.log('2:');console.log(val)});


//基本信息构造函数
function BasicInfo(value){
    this.name=value[10].$;                //企业全称
    this.code=value[1].$;                //公司代码
    this.simplename=value[8].$;          //公司简称
    this.legalPerson=value[4].$;         //法人代表
    this.director=value[5].$;            //公司股东
    this.profits=value[9].$;             //  公司利润
    this.taking=value[13].$;             //营业收入
    this.date=value[6].$;                //股票日期
    this.classify=value[7].$;            //行业分类           
    this.generalCapital=value[15].$;        //总股本
    this.postcode=value[14].$;          //邮政编码
    this.fax=value[0].$;                //公司传真
    this.area=value[2].$;               //公司地区
    this.address=value[3];             //公司地址
    this.brokerage=value[11].$;          //主办券商
    this.netAddr=value[12].$;            //网址
    this.transfer=value[16].$;           //转让类型
    this.totalValue=value[17];           //总市值
}
 //client.table('basicinfo').row('10002').put('finance:aaa','中国');


//返回基本信息
function basic(x){
    return new Promise(function(resolve,rejected){
        client.table('CIHouse')
        .row(x)
        .get('basic_inf',(err, value) => {
            if(value){
                let t=new BasicInfo(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}

//简单信息
function SimpleInfo(value){
     this.code=value[1].$;
     this.name=value[10].$;
     this.addr=value[3].$;
     this.zgb=value[15].$;
     this.totalvalue=value[17].$;
     this.profit=value[9].$;
}

function returnSimple(x){
    return new Promise(function(resolve,rejected){
        client.table('CIHouse')
        .row(x)
        .get('basic_inf',(err, value) => {
            if(value){
                let t=new returnSimple(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}
//输入公司名称查询
function searchByName(value){
    return new Promise(function(resolve,rejected){
    client.table('CIHouse')
    .scan({
         filter: {
            "op":"EQUAL",
            "type":"ValueFilter",
            "comparator":{"value":value,"type":"BinaryComparator"}
            }
        }, (error, cells) => {
         if(cells){
          let x=cells[0].key;
          returnSimple(x).then(val=>{ resolve(val);});
        }
    });
 });  
}
//财务信息构造函数
function FinanceInfo(value){
    this.taking=value[0].$;       //营业收入
    this.tradingProfit=value[1].$;    //营业利润
    this.retainedProfit=value[2].$;   //净利润
    this.undisProfitt=value[3].$;      //未分配利润
    this.totalAssett=value[4].$;       //总资产
    this.totalIndebtednesst=value[5].$;  //总负债
    this.netAssett=value[6].$;           //净资产
    this.perSharet=value[7].$;           //每股收益
    this.perAssett=value[8].$;           //每股净资产
    this.netRatet=value[9].$;            //净资产收益率
}

//返回财务信息
function finance(x){
    return new Promise(function(resolve,rejected){
        client.table('basicinfo')
        .row(x)
        .get((err, value) => {
            if(value){
                let t=new FinanceInfo(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}

//利润表构造函数
function Profit(value){
    this.title=[null,'2017年报','2017中报','2016年报','2016中报','2015年报','2015中报'];
    this.profit=new Array();
    this.profit[0]=['每股收益',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[1]=['营业收入',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[2]=['同比增长率',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[3]=['净利润',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[4]=['净利润(扣费)',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[5]=['同比增长率',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[6]=['销售费用',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[7]=['管理费用',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.profit[9]=['财务费用',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
}

//返回利润表信息(二维数组)
function profitTable(x){
    return new Promise(function(resolve,rejected){
        client.table('basicinfo')
        .row(x)
        .get((err, value) => {
            if(value){
                let t=new Profit(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}


//资产负债表
function BalanceSheet(value){
    this.title=[null,'2017年报','2017中报','2016年报','2016中报','2015年报','2015中报'];
    this.sheet=new Array();
    this.sheet[0]=['资产负债率',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[1]=['每股净资产',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[2]=['净资产收益率',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[3]=['流动资产',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[4]=['非流动资产',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[5]=['资产总计',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[6]=['流动负债',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[7]=['非流动负债',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[8]=['负债合计',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.sheet[9]=['股东权益',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
}

//返回负债表信息（二维数组）
function balancesheet(x){
    return new Promise(function(resolve,rejected){
        client.table('basicinfo')
        .row(x)
        .get((err, value) => {
            if(value){
                let t=new BalanceSheet(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}

//现金流量表
function CashFlow(value){
    this.title=[null,'2017年报','2017中报','2016年报','2016中报','2015年报','2015中报'];
    this.cashflow=new Array();
    this.cashflow[0]=['每股现金流净额',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.cashflow[0]=['经营现金流净额',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.cashflow[0]=['投资现金流净额',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
    this.cashflow[0]=['筹资现金流净额',value[0].$,value[0].$,value[0].$,value[0].$,value[0].$,value[0].$];
}

//返回流量表信息（二维数组）
function flow(x){
    return new Promise(function(resolve,rejected){
        client.table('basicinfo')
        .row(x)
        .get((err, value) => {
            if(value){
                let t=new CashFlow(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}

module.exports={
     searchByName:searchByName,
     basic:basic
}