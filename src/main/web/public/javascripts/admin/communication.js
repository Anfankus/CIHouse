var curPage ; 
var x=1;

function display()
{$.ajax("/admin/1", {
    method: "get",
    data: { x: x }
}).done(function (data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById(`ta${i}`).innerHTML = `<td>${data[i]}</td>`;
    }
})
}

display();

//首页
$(document).ready(function(){
   $("#btn1").click(function(){
    x=1;
    display();
   });
 });
//上一页
$(document).ready(function(){
   $("#btn2").click(function(){
       x--;
       display();
   });
 });
//下一页
 $(document).ready(function(){
   $("#btn3").click(function(){
       x++;
      display();
   });
 });
 
 //跳转
$(document).ready(function() {
    $("#btn5").click(function() {
        curPage = $("#changePage").value;
    
        if (!/^[1-9]\d*$/.test(curPage)) {
            alert("请输入正整数");
            return;
        } else {
            x = curPage;
            display();
        }
    })
});