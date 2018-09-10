'use strict'
let nameMap={'totalNum':['公司总数',[{
    to: 20
}, {
    from: 20,
    to: 40
}, {
    from: 40,
    to: 100
}, {
    from: 100,
    to: 300
}, {
    from: 300,
    to: 800
}, {
    from: 800
}]],'totalMoney':['总资产值',[{
    to: 200000
}, {
    from: 200000,
    to: 400000
}, {
    from: 400000,
    to: 700000
}, {
    from: 700000,
    to: 1000000
}, {
    from: 1000000,
    to: 5000000
}, {
    from: 5000000
}]],'tradingProfit':['公司总利润',[{
    to: 10000
}, {
    from: 10000,
    to: 50000
}, {
    from: 50000,
    to: 200000
}, {
    from: 200000,
    to: 500000
}, {
    from: 500000,
    to: 1000000
}, {
    from: 1000000
}]]};

$(function () {
    $('.list-group>a').click((event) => {
        let type = event.target.name;
        $.ajax('/statistics/map', {
            method: 'post',
            data: { type: type }
        }).done(data => {
            map=Highcharts.mapChart('map', {
                title:{
                    text:''
                },
                  colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.4)',
                  'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],
                  legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'bottom',
                    symbolRadius: 0
                  },
                  colorAxis: {
                    dataClasses:nameMap[type][1]
                },
                
                series: [{
                    data:data,
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
            $('.active').attr('class','list-group-item');
            event.target.setAttribute('class','list-group-item active');
    
        })//finish done
    }
    )
})