(function(){
    var addToCart = document.querySelector("#_ctl0__Template_btnCourseGo");
    if(addToCart){   //选择了学期信息add to cart按钮才会出来
        if(addToCart.disabled){    //add to chart按钮被禁用，没位置了
            //每隔2s刷新一次
            var form = document.querySelector("form");
            var submit = function() {
                form.submit();
            };
            setTimeout(submit, 2000);
        }
        else {
            var conf = confirm("这个课有位置了，赶紧的！要自动选就按确定");
            if(conf === true){
                addToCart.click();    //自动点击add to cart进入cart页面
            }
        }
    }
})();