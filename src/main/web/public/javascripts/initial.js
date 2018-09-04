'use strict'

$(function(){
    let targetUid=/\d+$/.exec(window.location.pathname)
    $('#content').attr('src', `/detail/${targetUid[0]}/basic`)
    changecolor(document.getElementById('arow001'));

})
function clickmenu(element)
{  
    changecolor(element);
    switch(element.id) {
    case 'arow001':
        menuclick('basic');
        break;
    case 'arow002':
        menuclick('history');
        break;
    case 'arow003':
        menuclick('finance');
        break;
    default:
        break;
    }
}

//这个函数用于改变文字颜色
function changecolor(element)
{
    var element1 = document.getElementById('arow001');
    var element2 = document.getElementById('arow002');
    var element3 = document.getElementById('arow003');
    if (element1.id == element.id) {
        $(element1).addClass('selected')
    } else {
        $(element1).removeClass('selected')
    }
     
    if (element2.id == element.id) {
        $(element2).addClass('selected')
    } else {
        $(element2).removeClass('selected')
    }
     
    if (element3.id == element.id) {
        $(element3).addClass('selected')
    } else {
        $(element3).removeClass('selected')
    }

    // 可以改成
    // $('.nav-item').each(function() {
    //     if (this.id == element.id) {
    //         $(this).addClass('selected')
    //     } else {
    //         $(this).removeClass('selected')
    //     }
    // })

    // for (var i = 1; i <= 3; i++) {
    //     var element_i = document.getElementById('arow00' + i)
    //     if (element_i.id == element.id) {
    //         element_i.style.color = 'aqua'
    //     } else {
    //         element_i.style.color = '#fef'
    //     }
    // }
    // $('#arow001').addClass('selected')
}

//用于控制"服务日志查询"的点击效果
function menuclick(page)
{
    let targetUid = /\d+$/.exec(window.location.pathname)
    $('#content').attr('src', `/detail/${targetUid[0]}/${page}`)
}
