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
function clickmenu(id)
{  
    changecolor(id);
    switch(id)
    {case menu001 :menuclick();break;
     case menu002 :menuclick();break;
     case menu003 :menuclick();break;
     default:   break;
    }
}

//这个函数用于改变文字颜色
function changecolor(id)
{
    menu001.style.color="white";
    menu002.style.color="white";
    menu003.style.color="white";
    id.style.color="Aqua";
}

//用于控制"服务日志查询"的点击效果
function menuclick()
{
    item.style.display="block"; 
}