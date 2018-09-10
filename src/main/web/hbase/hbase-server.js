var hbase = require('hbase');  //连接HBase的包

let tablename='CIHouse';
//连接HBase
var client=hbase({ 
    host: '192.168.137.25',
    port: 8111
});

//基本信息构造函数
function BasicInfo(value){
    this.info={}
    this.info["公司代码(元)"]=value[1]?value[1]:'-';                //公司代码
    this.info["公司全称"]=value[10]?value[10]:'-';                //企业全称
    this.info["公司简称"]=value[8]?value[8]:'-';               //公司简称
    this.info["行业分类"]=value[7]?value[7]:'-';              //行业分类           
    this.info["法人代表"]=value[4]?value[4]:'-';               //法人代表
    this.info["公司股东"]=value[5]?value[5]:'-';              //公司股东
    this.info["邮政编码"]=value[14]?value[14]:'-';            //邮政编码
    this.info["公司传真"]=value[0]?value[0]:'-';                //公司传真
    this.info["所在地区"]=value[2]?value[2]:'-';                 //公司地区
    this.info["公司地址"]=value[3]?value[3]:'-';                //公司地址
    this.info["主办券商"]=value[11]?value[11]:'-';              //主办券商
    this.info["公司网址"]=value[12]?value[12]:'-';              //网址
    this.info["转让类型"]=value[16]?value[16]:'-';              //转让类型
    this.info["挂牌日期"]=value[6]?value[6]:'-';              //转让类型
    this.info["公司利润"]=value[9]?value[9]:'-';             //  公司利润
    this.info["营业收入"]=value[13]?value[13]:'-';             //营业收入
    this.info["总股本"]=value[15]?value[15]:'-';          //总股本
    this.info["总市值"]=value[17]?value[17]:'-';           //总市值

    this.shareholder=value[5];  //股东
    this.account=value[18];      //持股数目
}

//返回基本信息
function basic(x){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
    .scan({
         filter: {
            "op":"EQUAL",
            "type":"RowFilter",
            "comparator":{"value":`${x}`,"type":"RegexStringComparator"}
            }
        }, (error, cells) => {
         if(cells){
             let result={};
             let fam='basic_inf:';
             var re = new RegExp(fam);
             cells.map(each=>{
                 if (re.test(each.column)) {
                     if (!result[each.key])
                         result[each.key] = [];
                     result[each.key].push(each.$);
                 }
             })
             var res=null;
             for(let i in result){                
                 res=new BasicInfo(result[i]);
             }
             resolve(res);
         }
        }); 
    })
}

//简单信息构造函数
function SimpleInfo(value){
    let index = [1, 10, 3, 15, 17, 9];
    if (value) {
        this.simpleinfo = index.map(each => value[each] ? value[each] : '-');
        this.simpleinfo[3] = value[15].slice(0, this.simpleinfo[3].indexOf('.') + 2);
        this.simpleinfo[4] = value[17].slice(0, this.simpleinfo[4].indexOf('.') + 2);
        this.simpleinfo[5] = value[9].slice(0, this.simpleinfo[5].indexOf('.') + 2);
    }
    else
        this.simpleinfo=[];
}

//通过名字返回简单信息
function simple_name(value){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
    .scan({
         filter: {
            "op":"EQUAL",
            "type":"RowFilter",
            "comparator":{"value":`${value}`,"type":"RegexStringComparator"}
            }
        }, (error, cells) => {
         if(cells){
             let result={};
             let fam='basic_inf:';
             var re = new RegExp(fam);
             cells.map(each=>{
                 if (re.test(each.column)) {
                     if (!result[each.key])
                         result[each.key] = [];
                     result[each.key].push(each.$);
                 }
             })
             var array=[];
             for(let i in result){                
                 array.push(new SimpleInfo(result[i]));
             }
             resolve(array);
         }
        });
  });
}

//通过ID返回简单信息
function simple_ID(x){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
    .scan({
         filter: {
            "op":"EQUAL",
            "type":"RowFilter",
            "comparator":{"value":`${x}`,"type":"RegexStringComparator"}
            }
        }, (error, cells) => {
         if(cells){
             let result={};
             let fam='basic_inf:';
             var re = new RegExp(fam);
             cells.map(each=>{
                 if (re.test(each.column)) {
                     if (!result[each.key])
                         result[each.key] = [];
                     result[each.key].push(each.$);
                 }
             })
             var res=null;
             for(let i in result){                
                 res=new SimpleInfo(result[i]);
             }
             resolve(res);
         }
        });  
    })
}


//财务信息构造函数
function FinanceInfo(value){
    this.info={}
    this.info["每股收益(元)"]=value[0]?value[0]:'-';               
    this.info["每股净资产(元)"]=value[2]?value[2]:'-';             
    this.info["每股净资产收益(元)"]=value[3]?value[3]:'-';              
    this.info["净资产收益率(元)"]=value[4]?value[4]:'-';             
    this.info["净利润(元)"]=value[5]?value[5]:'-';
    this.info["未分配利润(元)"]=value[6]?value[6]:'-';
    this.info["营业利润(元)"]=value[7]?value[7]:'-';
    this.info["总资产(元)"]=value[8]?value[8]:'-';
    this.info["总负债(元)"]=value[9]?value[9]:'-';
}

//返回财务信息
function finance(x){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
        .scan({
             filter: {
                "op":"EQUAL",
                "type":"RowFilter",
                "comparator":{"value":`${x}`,"type":"RegexStringComparator"}
                }
            }, (error, cells) => {
             if(cells){
                 let result={};
                 let fam='finacial_inf:';
                 var re = new RegExp(fam);
                 cells.map(each=>{
                     if (re.test(each.column)) {
                         if (!result[each.key])
                             result[each.key] = [];
                         result[each.key].push(each.$);
                     }
                 })
                 var res=null;
                 for(let i in result){                
                     res=new FinanceInfo(result[i]);
                 }
                 resolve(res);
                 }
            });  
    })
}

//利润表构造函数
function Profit(value){
    let x='- '+value[23];
    this.keys=x.split(' ');
    this.keys.pop();
    var y=new Array();
    y[0]='营业收入 '+value[1];
    y[1]='同比增长率 '+value[2];
    y[2]='净利润 '+value[3];
    y[3]='同比增长率 '+value[4];
    y[4]='净利润(扣费) '+value[5];
    y[5]='同比增长率 '+value[6];
    y[6]='销售费用 '+value[7];
    y[7]='管理费用 '+value[8];
    y[8]='财务费用 '+value[9];
    y[9]='每股收益 '+value[0];
    this.values=new Array();
    for(var i=0;i<10;i++){
        this.values[i]=y[i].split(' ').slice(0,9);
    }
}

//资产负债表
function BalanceSheet(value){
    let x='- '+value[23];
    this.keys=x.split(' ');
    this.keys.pop();

    var y=new Array();
    y[0]='资产负债率 '+value[14];
    y[1]='每股净资产 '+value[18];
    y[2]='净资产收益率 '+value[21];
    y[3]='净资产收益率(摊薄) '+value[22];
    y[4]='流动资产 '+value[15];
    y[5]='非流动资产 '+value[16];
    y[6]='资产总计 '+value[17];
    y[7]='负债合计 '+value[19];
    y[8]='股东权益 '+value[20];
    this.values=new Array();
    for(var i=0;i<y.length;i++){
        this.values[i]=y[i].split(' ').slice(0,9);
    }  
}

//现金流量表
function CashFlow(value){
    let x='- '+value[23];
    this.keys=x.split(' ');
    this.keys.pop();

    var y=new Array();
    y[0]='每股现金流净额 '+value[13];
    y[1]='经营现金流净额 '+value[10];
    y[2]='投资现金流净额 '+value[12];
    y[3]='筹资现金流净额 '+value[11];
    this.values=new Array();
    for(var i=0;i<4;i++){
        this.values[i]=y[i].split(' ').slice(0,9);
    }  
}

//返回历史数据信息(二维数组)
function historyTable(x){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
        .scan({
             filter: {
                "op":"EQUAL",
                "type":"RowFilter",
                "comparator":{"value":`${x}`,"type":"RegexStringComparator"}
                }
            }, (error, cells) => {
             if(cells){
                 let result={};
                 let fam='history_inf:';
                 var re = new RegExp(fam);
                 cells.map(each=>{
                     if (re.test(each.column)) {
                         if (!result[each.key])
                             result[each.key] = [];
                         result[each.key].push(each.$);
                     }
                 })
                 let t=[];
                 for(let i in result){                
                    t.push(new Profit(result[i]));
                    t.push(new BalanceSheet(result[i]));
                    t.push(new CashFlow(result[i]));
                 }
                
               
                resolve(t);
             }
            });    
    })
}

//区域经济构造函数
function Statistics(value) {
    var x;
    this.info=[];
    for(var i=0;i<value.length;i++){
        x=value[i].column.split(':');
        this.info.push({name:x[1],value:value[i].$});
    }
}

//返回区域信息
function returnAreaInfo(x){
    return new Promise(function(resolve,rejected){
        client.table('SameAddTable')
        .row(x)
        .get((err, value) => {
            if(value){
                let t=new Statistics(value);
                resolve(t);
            }
            if(err){
                rejected(err);
            }
        });   
    })
}

//对比信息构造函数
function Comparison(value1,value2){
    this.keys=['公司全称','每股净资产(万)','净利润(万)','未分配利润(万)','营业利润(万)','总资产(万)','总负债(万)'];
    this.values=[];
    this.values[0]=[value1[10],value1[21],value1[24],value1[25],value1[26],value1[27],value1[28]].map(each=>{
        return each.slice(0,each.indexOf('.')-4);
    });

    this.values[1]=[value2[10],value2[21],value2[24],value2[25],value2[26],value2[27],value2[28]].map(each=>{
        return each.slice(0,each.indexOf('.')-4);
    });
}

//返回对比信息中间值
function returnMid(x){
    return new Promise(function(resolve,rejected){
        client.table(tablename)
        .scan({
             filter: {
                "op":"EQUAL",
                "type":"RowFilter",
                "comparator":{"value":`${x}`,"type":"RegexStringComparator"}
                }
            }, (error, cells) => {
             if(cells){
                 let result={};
                //  let fam='basic_inf:';
                //  var re = new RegExp(fam);
                 cells.map(each=>{
                   //  if (re.test(each.column)) {
                         if (!result[each.key])
                             result[each.key] = [];
                         result[each.key].push(each.$);
                     //}
                 })
                 var res=null;
                 for(let i in result){                
                     res=result[i];
                 }
                 resolve(res);
             }
            });  
    })
}

//返回对比信息
function returnComparison(x,y){
    return new Promise(function(resolve,rejected){
        var array=[];
        returnMid(x).then(async val=>{
                array.push(val);
                await returnMid(y).then(aa=>{
                    array.push(aa);
                    resolve(new Comparison(array[0],array[1]));
                })     
        });
      });
}

//交互时服务器需要调用的函数
module.exports={
     simple_name:simple_name,
     simple_ID:simple_ID,
     basic:basic,
     finance:finance,
     returnAreaInfo:returnAreaInfo,
     historyTable:historyTable,
     returnComparison:returnComparison
}

