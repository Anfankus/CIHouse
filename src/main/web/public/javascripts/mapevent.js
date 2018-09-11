'use strict'
let nameMap={'totalNum':['各省新三板公司总数',[{
    to: 20,
    color:'rgb(247,238,173)'
}, {
    from: 20,
    to: 50,
    color:'#f2d643'
}, {
    from: 50,
    to: 150,
    color:'#ffb248'
}, {
    from: 150,
    to: 400,
    color:'#eb8146'
}, {
    from: 400,
    to: 700,
    color:'#d95850'
}, {
    from: 700,
    color:'#893448'
}],1],'totalMoney':['各省公司总营收值',[{
    to: 10,
    color:'rgb(247,238,173)'
}, {
    from: 10,
    to: 20,
    color:'#f2d643'
}, {
    from: 20,
    to: 40,
    color:'#ffb248'
}, {
    from: 40,
    to: 80,
    color:'#eb8146'
}, {
    from: 80,
    to: 150,
    color:'#d95850'
}, {
    from: 150,
    color:'#893448'
}],2],'tradingProfit':['各省公司总利润',[{
    to: 10,
    color:'rgb(247,238,173)'
}, {
    from: 10,
    to: 20,
    color:'#f2d643'
}, {
    from: 20,
    to: 40,
    color:'#ffb248'
}, {
    from: 40,
    to: 80,
    color:'#eb8146'
}, {
    from: 80,
    to: 150,
    color:'#d95850'
}, {
    from: 150,
    color:'#893448'
}],3]};

$(function() {
    let chartLeft = echarts.init(document.getElementById('chartleft'), 'dark');
    let leftoption1 = {
        title:[{
            text:'各地区新三板公司数量占比',
            x:'15%'
        },{
            text:'新三板公司不同行业数量占比',
            x:'15%',
            top:'55%'

        }],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend:{
            type:'scroll',
            bottom:'50%'
        },
        series: [{
            name: '公司数量',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['50%',"25%"],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    },
                    formatter:" {b}\n\n{c} ({d}%)"
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 420,
                name: '东北'
            },
            {
                value: 2515,
                name: '华东'
            },
            {
                value: 1312,
                name: '华北'
            },
            {
                value: 310,
                name: '华中'
            },
            {
                value: 915,
                name: '华南'
            },
            {
                value: 621,
                name: '西南'
            }
        ]
        },{
            name: '行业',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['50%',"80%"],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    },
                    formatter:" {b}\n\n{c} ({d}%)"
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 862,
                name: '物流'
            },
            {
                value: 2120,
                name: '金融'
            },
            {
                value: 1408,
                name: '电子'
            },
            {
                value: 2413,
                name: '房产'
            },
            {
                value: 1856,
                name: '服务业'
            }]
        }]
    };
    chartLeft.setOption(leftoption1);
    chartLeft.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 1
    });
    chartLeft.dispatchAction({
        type: 'highlight',
        seriesIndex: 1,
        dataIndex: 2
    });
    //=========================================
    let countrank=mapdata.filter(e=>e.name!=='南海诸岛'&&parseInt(e.value)>0).sort((a,b)=>parseInt(b.value)-parseInt(a.value));
    let chartRight=echarts.init(document.getElementById('chartright'), 'dark');
    let rightoption1={
        tooltip: {},
        title: [{
            text: '公司数量排行',
            x: '40%',
            bottom:'95%',
            textAlign: 'center'
        }],
        grid: [{
            top: 50,
            left: 0,
            bottom:15,
            containLabel: true
        }],
        xAxis: [{
            type: 'value',
            max: 2000,
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: countrank.map(e=>e.name)
        }],
        series: [{
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true
                }
            },
            data: countrank.map(e=>e.value)
        }, {
            type: 'bar',
            stack: 'chart',
            silent: true,
            itemStyle: {
                normal: {
                    color: '#4a4a4a'
                }
            },
            data: countrank.map(e=>2000 - parseInt(e.value))
        }]
    }
    chartRight.setOption(rightoption1);
    //==========================================
    $('.list-group>a').click((event) => {
        let type = event.target.name;
        $.ajax('/statistics/map', {
            method: 'post',
            data: {
                type: type
            }
        }).done(data => {
            let countrank=data.filter(e=>e.name!=='南海诸岛'&&parseInt(e.value)>0).sort((a,b)=>parseInt(b.value)-parseInt(a.value));
            map = Highcharts.mapChart('map', {
                chart: {
                    backgroundColor: 'rgba(32,32,32,1)',
                    marginLeft: 0,
                    marginRight: 0
    
                },
                title: {
                    text: nameMap[type][0],
                    style: {
                        fontSize: '30px',
                        color: 'white'
                    }
                },
    
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'bottom',
                    symbolRadius: 0,
                    itemStyle: {
                        color: 'white'
                    }
                },
                colorAxis: {
                    dataClasses: nameMap[type][1]
                },
                series: [{
                    data: data,
                    name: nameMap[type][0],
                    mapData: Highcharts.maps['cn/china'],
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    joinBy: 'name'
                }]
            });
            
            $('.active').attr('class', 'list-group-item');
            event.target.setAttribute('class', 'list-group-item active');

            $('#chartleft').parent().html('<div id="chartleft" style="width:100%;height:600px;"></div>')
            $('#chartright').parent().html('<div id="chartright" style="width:100%;height:600px;"></div>')
            chartLeft = echarts.init(document.getElementById('chartleft'), 'dark');
            chartRight=echarts.init(document.getElementById('chartright'), 'dark');
            switch (nameMap[type][2]) {
                case 1:
                    chartLeft.setOption(leftoption1);
                    chartRight.setOption(rightoption1);
                    chartLeft.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                    chartLeft.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 1,
                        dataIndex: 2
                    });

                    break;
                case 2:
                    chartLeft.setOption({
                        title:{
                            text:'近五年全国新三板公司产值变化',
                            textAlign:'center',
                            x:'50%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        legend: {
                            data:['总营收值','总利润','市值'],
                            bottom:0
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: ['2013','2014','2015','2016','2017'],
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name:'亿',
                                min: 0,
                                max: 2500,
                                interval: 500,
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            },
                            {
                                type: 'value',
                                name:'亿',
                                min: 0,
                                max: 600,
                                interval: 120,
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'总营收值',
                                type:'bar',
                                data:[1545.26, 1754.06, 1942.00,2000.12,2281.56]
                            },
                            {
                                name:'总利润',
                                type:'bar',
                                data:[255.3, 301.5,346.1,394.5 ,434.5],
                                yAxisIndex:1
                            },
                            {
                                name:'市值',
                                type:'line',
                                yAxisIndex: 1,
                                data:[355.3, 384.5,446.1,458.5 ,521.5]
                            }
                        ]
                    });
                    chartRight.setOption({
                        title:[{
                            text:'各地区公司总营收占比',
                        },{
                            text:'各地区公司平均营收占比',
                            top:'50%'
                        }],
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            type: 'scroll',
                            bottom: '50%'
                        },
                        series: [{
                            name: '营收值',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', "25%"],
                            avoidLabelOverlap: false,
                            label: {
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '15',
                                        fontWeight: 'bold'
                                    },
                                    formatter: " {b}\n\n{c} ({d}%)"
                                }
                            },
                            data: [{
                                    value: 335,
                                    name: '东北'
                                },
                                {
                                    value: 310,
                                    name: '华东'
                                },
                                {
                                    value: 234,
                                    name: '华北'
                                },
                                {
                                    value: 135,
                                    name: '华中'
                                },
                                {
                                    value: 1548,
                                    name: '华南'
                                },
                                {
                                    value: 1548,
                                    name: '西南'
                                }
                            ]
                        }, {
                            name: '利润值',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', "80%"],
                            avoidLabelOverlap: false,
                            label: {
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '15',
                                        fontWeight: 'bold'
                                    },
                                    formatter: " {b}\n\n{c} ({d}%)"
                                }
                            },
                            data: [{
                                value: 320,
                                name: '东北'
                            },
                            {
                                value: 450,
                                name: '华东'
                            },
                            {
                                value: 300,
                                name: '华北'
                            },
                            {
                                value: 310,
                                name: '华中'
                            },
                            {
                                value: 1246,
                                name: '华南'
                            },
                            {
                                value: 700,
                                name: '西南'
                            }
                        ]
                        }]
                    });
                    chartRight.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 4
                    });
                    chartRight.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 1,
                        dataIndex: 0
                    });
                
                    break;
                case 3:
                    chartLeft.setOption({
                        title: [{
                            text: '公司数量前五省份平均利润和平均营收',
                            x: '50%',
                            textAlign: 'center'
                        },{
                            text:'公司数量前五省份营收总和',
                            x:'50%',
                            top:'48%',
                            textAlign: 'center'
                        }],
                        grid: [{
                            top: 50,
                            width: '100%',
                            bottom: '55%',
                            left: 10,
                            containLabel: true
                        }, {
                            top: '55%',
                            width: '100%',
                            bottom: 0,
                            left: 10,
                            containLabel: true
                        }],
                        yAxis: [{
                            type: 'value',
                            max: 10000,
                            
                        },{
                            type: 'value',
                            max: 10000,
                            
                        }, {
                            type: 'value',
                            max: 18000,
                            gridIndex: 1,
                            
                        }],
                        xAxis: [{
                            type: 'category',
                            data: ['北京','上海','江苏','浙江','广东']
                           
                        }, {
                            gridIndex: 1,
                            type: 'category',
                            data: ['北京','上海','江苏','浙江','广东']
                            
                        }],
                        series: [{
                            type: 'bar',
                            
                            z: 3,
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            label: {
                                normal: {
                                    position: 'top',
                                    show: true
                                }
                            },
                            data:[6512,7895,7125,5423,4234]
                        },{
                            type: 'bar',
                            
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            z: 3,
                            label: {
                                normal: {
                                    position: 'top',
                                    show: true
                                }
                            },
                            data:[8134,9876,8523,7015,6000]
                        },{
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 1,
                            z: 3,
                            data:[7451,8145,6512,6012,5123]
                        }, {
                            type: 'bar',
                            stack: 'chart',
                            xAxisIndex: 1,
                            yAxisIndex: 2,
                            z: 3,
                            label: {
                                normal: {
                                    position: 'top',
                                    show: true
                                }
                            },
                            data:[6512,7895,7125,5423,4234]
                        },{
                            type: 'bar',
                            stack: 'chart',
                            xAxisIndex: 1,
                            yAxisIndex: 2,
                            z: 3,
                            label: {
                                normal: {
                                    position: 'top',
                                    show: true
                                }
                            },
                            data:[8134,9876,8523,7015,6000]
                        }]
                    });
                    chartRight.setOption({
                        title : [{
                            text: '营收值高于平均公司数',
                            x:'center'
                        },{
                            text: '利润值高于平均公司数',
                            x:'center',
                            top:'33%'
                        },{
                            text: '市值高于平均公司数',
                            x:'center',
                            top:'67%'
                        }],
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name: '数量',
                                type: 'pie',
                                radius : '35%',
                                center: ['50%', '17%'],
                                data:[
                                    {value:5320, name:'营收值高于平均'},
                                    {value:6701, name:'其他',itemStyle:{color:'#8a8a8a'}}
                                ]
                            },{
                                name: '数量',
                                type: 'pie',
                                radius : '35%',
                                center: ['50%', '50%'],
                                data:[
                                    {value:5170, name:'利润值高于平均'},
                                    {value:7125, name:'其他',itemStyle:{color:'#8a8a8a'}}
                                ]
                            },{
                                name: '数量',
                                type: 'pie',
                                radius : '35%',
                                center: ['50%', '85%'],
                                data:[
                                    {value:4283, name:'市值高于平均'},
                                    {value:7832, name:'其他',itemStyle:{color:'#8a8a8a'}}
                                ]
                            }
                        ]
                    });
                    chartRight.dispatchAction({
                        type: 'highlight',
                        seriesIndex: [0,1,2],
                        dataIndex: [0,0,0]
                    });
                    break
            }

        }) //finish done
    })
})