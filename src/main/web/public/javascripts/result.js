'use strict'

$(function(){
    $('form.singlesearch').submit(function() {
        let id1 = $('#search-1').val()
        let id2 = $('#search-2').val()
        if (!/^\d{6}$/.test(id1) || !/^\d{6}$/.test(id2)) {
            alert('请输入正确的六位公司代码！')
            return
        }

        let ids = id1 + '-' + id2
        $('#content').attr('src','/compare/' + ids)

        // 已经完成了跳转，阻止默认的提交表单事件
        return false
    })
})