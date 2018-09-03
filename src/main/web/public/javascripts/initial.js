'use strict'

$(function(){
    let targetUid=/\d+$/.exec(window.location.pathname)
    let iframe=$('#content').attr('src', `/detail/${targetUid}/basic`)

    //根据iframe内容调整外部div元素的高度和宽度到相同大小（仅body部分的大小）+
    // iframe.on('load',function() {
    //         iframe.css('height',iframe[0].contentDocument.body.scrollHeight);
    //         iframe.css('width',iframe[0].contentDocument.body.scrollWidth)
    //     })
})
function clickmenu(element)
{  
    changecolor(element);
    switch(element.id) {
    case 'menu001':
        menuclick('basic');
        break;
    case 'menu002':
        menuclick('history');
        break;
    case 'menu003':
        menuclick('finance');
        break;
    default:
        break;
    }
}

//这个函数用于改变文字颜色
function changecolor(element)
{
    // var element1 = document.getElementById('menu001');
    // var element2 = document.getElementById('menu002');
    // var element3 = document.getElementById('menu003');
    // if (element1.id == element.id) {
    //     element1.style.color = 'aqua'
    // } else {
    //     element1.style.color = '#fef'
    // }
     
    // if (element2.id == element.id) {
    //     element2.style.color = 'aqua'
    // } else {
    //     element2.style.color = '#fef'
    // }
     
    // if (element3.id == element.id) {
    //     element3.style.color = 'aqua'
    // } else {
    //     element3.style.color = '#fef'
    // }

    for (var i = 1; i <= 3; i++) {
        var element_i = document.getElementById('menu00' + i)
        if (element_i.id == element.id) {
            element_i.style.color = 'aqua'
        } else {
            element_i.style.color = '#fef'
        }
    }
}

//用于控制"服务日志查询"的点击效果
function menuclick(page)
{
    var newLocation = location.href + '/' + page
    // document.getElementById('content').src = newLocation
    $('#content').attr('src', newLocation)
}