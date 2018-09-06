'use strict'

$(function(){
    $('.listgroup>a').onclick=function(){
        let type=this.attr('name');
        $.ajax('/map',{
            method:'get',
            data:{type:type}
        }).done(data=>{
            Highcharts.mapChart('map', {
                title: {
                  text: ''
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
                  data: data,
                  name: '随机数据',
                  mapData: Highcharts.maps['cn/china'],
                  states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                  joinBy: 'name' // 根据 name 属性进行关联
                }]
              });
        })
    }
})