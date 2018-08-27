'use strict'
$(function () {
    var barCharts = echarts.init(document.getElementById('bar'),'dark');
    var option = {
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
    barCharts.setOption(option);

    let lineChart=echarts.init(document.getElementById('line'),'dark');
    let option_line={
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
    lineChart.setOption(option_line);

})