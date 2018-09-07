'use strict'

$(function () {
    let nameMap={'totalNum':'公司总数','totalMoney':'总资产值','tradingProfit':'公司总利润'};
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
                    dataClasses: [{
                        to: 20
                    }, {
                        from: 20,
                        to: 40
                    }, {
                        from: 40,
                        to: 60
                    }, {
                        from: 60,
                        to: 80
                    }, {
                        from: 80,
                        to: 100
                    }, {
                        from: 100
                    }]
                },
                
                series: [{
                    data:data,
                    name: nameMap[type],
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