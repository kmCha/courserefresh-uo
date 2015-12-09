(function() {

    function serialize(form){    //序列化表单
        var parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue;

        for (i=0, len=form.elements.length; i < len; i++){
            field = form.elements[i];

            switch(field.type){
                case "select-one":
                case "select-multiple":

                    if (field.name.length){
                        for (j=0, optLen = field.options.length; j < optLen; j++){
                            option = field.options[j];
                            if (option.selected){
                                optValue = "";
                                if (option.hasAttribute){
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                } else {
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;

                case undefined:     //fieldset
                case "file":        //file input
                case "submit":      //submit button
                case "reset":       //reset button
                case "button":      //custom button
                    break;

                case "radio":       //radio button
                case "checkbox":    //checkbox
                    if (!field.checked){
                        break;
                    }
                    /* falls through */

                default:
                    //don't include form fields without names
                    if (field.name.length){
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        return parts.join("&");
    }
    function createXHR(){     //生成XMLHttpRequest对象
        if (typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined"){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                "MSXML2.XMLHttp"],
                    i, len;

                for (i=0,len=versions.length; i < len; i++){
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (ex){
                        //skip
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    }

    var addToCart = document.querySelector("#_ctl0__Template_btnCourseGo");
    var xhr = createXHR();
    var count = 0;
    var form = document.querySelector("form");
    var p = document.createElement("p");
    p.style.padding = "10px 20px";
    p.style.border = "2px dotted #7e7e7e";
    p.style.textAlign = "center";
    p.style.color = "red";
    p.style.fontSize = "2em";
    document.querySelector("body").appendChild(p);
    xhr.onreadystatechange = function(event){
        if (xhr.readyState == 4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                if(xhr.responseText.indexOf("disabled") === -1) {     //响应中没有了disabled字符串，即课有位置了
                    var conf = confirm("这个课有位置了，赶紧的！要自动选就按确定");
                    if(conf === true){
                        addToCart.click();    //自动点击add to cart进入cart页面
                    }
                }
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
            count++;
            p.innerHTML = "水课哪里跑：尝试" + count + "次";
        }
    };

    function submitData(){     //异步提交表单数据
        if(addToCart){   //选择了学期信息add to cart按钮才会出来，才发送请求
            xhr.open("post", form.action, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(serialize(form));
        } else {
            p.innerHTML = "自动刷课还没开始哦，先选择学期再按一下保存的书签";
        }
    }
    submitData();
    setInterval(submitData, 3000);
})();