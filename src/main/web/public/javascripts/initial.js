'use strict'

$(function(){
    let targetUid=/\d+$/.exec(window.location.pathname)
    let iframe=$('#content').attr('src', `/detail/${targetUid}/basic`)

    //根据iframe内容调整外部div元素的高度和宽度到相同大小（仅body部分的大小）+
    iframe.on('load',function() {
            iframe.css('height',iframe[0].contentDocument.body.scrollHeight);
            iframe.css('width',iframe[0].contentDocument.body.scrollWidth)
        })
})