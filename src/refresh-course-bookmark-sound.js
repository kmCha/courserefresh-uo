(function() {
    function serialize(form) { //序列化表单
        var parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue;

        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];

            switch (field.type) {
                case "select-one":
                case "select-multiple":

                    if (field.name.length) {
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j];
                            if (option.selected) {
                                optValue = "";
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                } else {
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;

                case undefined: //fieldset
                case "file": //file input
                case "submit": //submit button
                case "reset": //reset button
                case "button": //custom button
                    break;

                case "radio": //radio button
                case "checkbox": //checkbox
                    if (!field.checked) {
                        break;
                    }
                    /* falls through */

                default:
                    //don't include form fields without names
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        return parts.join("&");
    }

    function createXHR() { //生成XMLHttpRequest对象
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"
                    ],
                    i, len;

                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (ex) {
                        //skip
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    }

    function submitData() { //异步提交表单数据
        if (addToCart) { //选择了学期信息add to cart按钮才会出来，才发送请求
            xhr.open("post", form.action, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(serialize(form));
        } else {
            p.innerHTML = "自动刷课还没开始哦，先选择学期再按一下保存的书签";
        }
    }

    if (!document.querySelector("#courseInfo")) { //检查是否已经点过脚本，不允许重复运行
        var addToCart = document.querySelector("#_ctl0__Template_btnCourseGo"),
            xhr = createXHR(),
            count = 0,
            form = document.querySelector("form"),
            p = document.createElement("p"),
            box = document.createElement("div");

        p.style.padding = "10px 20px";
        p.style.border = "2px dotted #7e7e7e";
        p.style.textAlign = "center";
        p.style.color = "red";
        p.style.fontSize = "2em";
        p.id = "courseInfo";

        document.querySelector("body").appendChild(p);
        var successSound = document.createElement("audio");
        successSound.src = "http://7xoxzw.com1.z0.glb.clouddn.com/successSound.mp3"; //新闻联播(成功提示音)
        successSound.preload = "auto";
        var failSound = document.createElement("audio");
        failSound.src = "http://7xoxzw.com1.z0.glb.clouddn.com/failSound.mp3"; //失败提示音
        failSound.preload = "auto";
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                if (count > 0) {
                    document.querySelector("body").removeChild(box);
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    if (xhr.responseText.indexOf("_ctl0__Template_dlstSection__ctl0_cbxSection") >= 0) { //有位置了
                        successSound.play();
                        var fuckSafari = setInterval(function() { //safari中存在先弹窗再播放的bug，这样写能避免
                            if (successSound.currentTime > 0) {
                                var conf = confirm("这个课有位置了，赶紧的！要自动选就按确定");
                                if (conf === true) {
                                    clearInterval(fuckSafari);
                                    //clearInterval(repeat);
                                    addToCart.click(); //自动点击add to cart进入cart页面
                                } else {
                                    //clearInterval(repeat);
                                    clearInterval(fuckSafari);
                                }
                            }
                        }, 100);
                        return;
                    } else if (xhr.responseText.indexOf("Your session has expired") >= 0) { //session到期
                        failSound.play();
                        var fuckSafari2 = setInterval(function() { //safari中存在先弹窗再播放的bug，这样写能避免
                            if (failSound.currentTime > 0) {
                                //clearInterval(repeat);
                                clearInterval(fuckSafari2);
                                alert("登陆时间到了，重新登录再来吧");
                                p.innerHTML = "水课哪里跑：尝试" + (++count) + "次后，还是没有位置，rabaska让你重新登录了";
                            }
                        }, 100);
                        return;
                    }
                    box.innerHTML = xhr.responseText;
                    p.innerHTML = "水课哪里跑：尝试" + (++count) + "次";
                    document.querySelector("body").appendChild(box);
                    setTimeout(submitData, 1500);
                } else {
                    //clearInterval(repeat);
                    alert("服务器错误，刷新试试");
                }
            }
        };
        submitData();
        //var repeat = setInterval(submitData, 3000);
    }
})();