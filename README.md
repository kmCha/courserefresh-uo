# 这逗比东西是啥？
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/72474289.jpg)
水课哪里跑，是我被uo的选课系统弄抓狂以后写的一个脚本，他可以在选课页面运行然后在后台自动每3s刷新一次，页面下方会记录尝试的次数，如果位置刷出来了，会弹出一个对话框，点击确定之后他会自动帮你把课加入cart，你就只用完成接下来的操作就行了。

# 这东西咋用？
首先，你需要做的是在你的浏览器中新建一个书签，也就是收藏页，你可以随便收藏一个页面，然后修改他的书签页的网址栏为下面的代码：

	javascript:!function(){function e(e){var t,n,a,o,c,r,s=[],i=null;for(t=0,n=e.elements.length;n>t;t++)switch(i=e.elements[t],i.type){case"select-one":case"select-multiple":if(i.name.length)for(a=0,o=i.options.length;o>a;a++)c=i.options[a],c.selected&&(r="",r=c.hasAttribute?c.hasAttribute("value")?c.value:c.text:c.attributes.value.specified?c.value:c.text,s.push(encodeURIComponent(i.name)+"="+encodeURIComponent(r)));break;case void 0:case"file":case"submit":case"reset":case"button":break;case"radio":case"checkbox":if(!i.checked)break;default:i.name.length&&s.push(encodeURIComponent(i.name)+"="+encodeURIComponent(i.value))}return s.join("&")}function t(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject){if("string"!=typeof arguments.callee.activeXString){var e,t,n=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];for(e=0,t=n.length;t>e;e++)try{var a=new ActiveXObject(n[e]);return arguments.callee.activeXString=n[e],a}catch(o){}}return new ActiveXObject(arguments.callee.activeXString)}throw new Error("No XHR object available.")}function n(){a?(o.open("post",r.action,!0),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(e(r))):s.innerHTML="自动刷课还没开始哦，先选择学期再按一下保存的书签"}var a=document.querySelector("#_ctl0__Template_btnCourseGo"),o=t(),c=0,r=document.querySelector("form"),s=document.createElement("p");s.style.padding="10px 20px",s.style.border="2px dotted #7e7e7e",s.style.textAlign="center",s.style.color="red",s.style.fontSize="2em",document.querySelector("body").appendChild(s),o.onreadystatechange=function(e){if(4==o.readyState){if(o.status>=200&&o.status<300||304==o.status){if(-1===o.responseText.indexOf("disabled")){var t=confirm("%E8%BF%99%E4%B8%AA%E8%AF%BE%E6%9C%89%E4%BD%8D%E7%BD%AE%E4%BA%86%EF%BC%8C%E8%B5%B6%E7%B4%A7%E7%9A%84%EF%BC%81%E8%A6%81%E8%87%AA%E5%8A%A8%E9%80%89%E5%B0%B1%E6%8C%89%E7%A1%AE%E5%AE%9A");t===!0&&a.click()}}else alert("Request was unsuccessful: "+o.status);c++,s.innerHTML="%E6%B0%B4%E8%AF%BE%E5%93%AA%E9%87%8C%E8%B7%91%EF%BC%9A%E5%B0%9D%E8%AF%95"+c+"%E6%AC%A1"}},n(),setInterval(n,3e3)}();

就像这样：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/88312649.jpg)
上面是chrome浏览器中的例子，不同浏览器都差不多。添加好以后应该有个叫做**水课哪里跑**书签页在你的书签栏里了，就像这样：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/88868553.jpg)
接下来你就可以登陆uoZone进入rabaska然后选择你要选的课了。通常，你需要进入选课界面，也就是下面这个界面
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/67701937.jpg)
## 书签栏问题
那么细心的盆友肯定已经发现了，说好的书签栏呢。对头，坑爹的uo把这个页面的书签栏隐藏了，但是机智的我找出了方法。
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/8143797.jpg)
1. 如果你用的是mac，而且浏览器是safari或者chrome（这两个能确定，其他浏览器太懒没测试，没准也能这样），那么你只需要在进入这个页面之前让浏览器全屏，然后再点开这个页面以后就有书签栏了。
2. 如果你用的是windows，而且浏览器是chrome或者chrome内核的浏览器（比如说360极速浏览器），那么你在进入这个页面之后，在他在标题栏点右键，然后点击“显示为标签页”选项，然后书签栏就出来了。

## 下一步
下一步当然就是选学期了，点选下拉列表里的学期选项之后，对于2016 winter，你要想水课的下面seats available不是0的话是不可能的，99.9%你想选的水课在你选择session之后，你会看到下面这个页面：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/87673858.jpg)
是的肯定没位置了，那么这时候，在用这个脚本之前，我们是这样做的：
1. Ctrl+R(mac)/F5(windows)
2. 弹窗问你“确认重新提交表单吗？”
3. 点击确认，然后又看到那个没位置的页面，当然你运气好的话，在你刷了几百次之后可能有位置了
4. 重复1-3步骤

![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-7/90166439.jpg)
那么现在有了这个脚本之后，你只用点一下鼠标（我是指用你的鼠标点击一下**水课哪里跑**书签），然后下面就会提示你相关信息
1. 当你没选择session就按了**水课哪里跑**之后，页面是这样的：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/49828007.jpg)
2. 如果你选了session之后按**水课哪里跑**，那你就进入正轨了：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/11365653.jpg)

下面的文字会3秒更新一次，告诉你脚本尝试了多少次提交表单。页面看上去没有刷新，但是实际上已经提交了表单并且已经接收到服务器返回来的数据，在这里你只需要知道it works，具体实现方法我会在之后的技术实现部分解释。

那么课刷出来了之后是什么效果？这里我重新打开一个任何人都不想选的还剩了一堆位置的课来展示一下刷出来位置之后的情况：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/13581140.jpg)
如上图所示，浏览器会弹出来一个优先级最高的对话框告诉你这个课有位置了，然后你就可以愉快的点击确定了。之后这个脚本会帮你做以下事情：
1. 勾选这个课
2. 点击Add to cart

然后这个页面就自动关闭了，也就是说当你回过神来的时候，点开这个页面之前那个搜索课的页面就被自动定位到你的cart页面了，如下图：
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/85262461.jpg)
我能帮你们的就这么多，剩下的几个点鼠标的操作就只有靠你们自己了。

# 这东西咋实现的？
前方高能，普通群众可以去愉快的刷课了，对技术感兴趣的盆友可以继续往下看。
## 背景
简单说来，rabaska的选课系统在我们点击session之后，会发送一个同步请求将表单中的信息（你的加密后的账号信息和你要选的课的信息）传送到服务器端，然后服务器处理之后没问题的话会返回一个html页面，如果该课没位置的话那返回的页面就和发送请求之前的页面是一样的，因此你刷新之后看到的页面是没变化的。但是如果有位置的话，服务器返回的页面中会有非常细微的不同，一个是0 seats available前面的禁止符号会变成一个选择框，另一个是Add to cart可以按了（没位置的时候disabled属性是true）。但是经过我研究，要实现add to cart跟选择框根本没有关系，因为我在没位置时候的页面修改add to cart按钮的disabled属性为false以后，用他触发click()方法之后是能够将它加入cart的，但是因为服务器上确实没位置，因此后续步骤你也不能完成。所以能有个方法在选课页面自动刷新并且能通过服务器返回的数据判断是否有位置了的话是极好的。仔细思考之后发现其实是不难的，不过就是用javascript来操作DOM而已。思路把我引向了[油猴脚本](http://tampermonkey.net/)，这个实际上就是在各个浏览器中的一个插件，他可以把你写的一个javascript脚本绑定在指定的URL上，这对个人使用当然是极其方便的，但是我是来造福人类的
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/42249496.jpg)
所以不可能让每个人都去下个浏览器扩展才能使用我的脚本吧。因为浏览器是支持javascript:协议的，所以把脚本放在书签页的地址中也可以运行脚本。但是这样做又有个问题，那就是这样做是在页面上运行脚本，不是把脚本绑定在URL上，什么意思呢？如果我用油猴把我的脚本绑定到URL上，不过你咋刷新，只要URL不变，那脚本是会自动执行的。如果我用书签栏，那刷新一次就得重新点击书签重新运行脚本。而恰好rabaska的表单是同步提交的，服务器返回html后页面会立即渲染新的页面，也就相当于刷新了，所以脚本就自动停止了，达不到自动刷新的目的。
## 实现原理
为了解决上面的问题，我能想到的办法就是把同步请求换成异步请求，将服务器返回的页面放在回调函数中判断是否有位置用，而不让浏览器渲染新页面，这就是页面为啥看起来没有刷新的原因。
具体实现方法就是生成一个XMLHttpRequest对象，用他来将表单的数据每隔3秒提交给服务器一次。如果返回的页面中能找到disabled关键字的话，说明add to cart按钮被禁用了（页面中只有他有这个属性），那么就肯定是没有位置的。当没有disabled关键字的时候，有两种可能，一种是有位置了，一种是session到期了，同样可以简单的通过关键字来判断这两种情况。当最后确定有位置了之后，就调用add to cart对象的click()方法来将课放入你的cart中，剩下的工作就简单了。讲原理不能没有代码，上面给的书签栏中的代码是用gulp压缩之后的js文件，下面给出源代码：

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
	    xhr.onreadystatechange = function(event) {
	        if (xhr.readyState == 4) {
	            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	                if (xhr.responseText.indexOf("disabled") === -1) { //响应中没有了disabled字符串，即课有位置了或者session过期了
	                    if (xhr.responseText.indexOf("Your session has expired") === -1) { //有位置了
	                        var conf = confirm("这个课有位置了，赶紧的！要自动选就按确定");
	                        if (conf === true) {
	                            addToCart.click(); //自动点击add to cart进入cart页面
	                        }
	                    } else { //session到期
	                        alert("登陆时间到了，重新登录再来吧");
	                        repeat.clearInterval();
	                    }
	                }
	            } else {
	                alert("Request was unsuccessful: " + xhr.status);
	            }
	            count++;
	            p.innerHTML = "水课哪里跑：尝试" + count + "次";
	        }
	    };

	    function submitData() { //异步提交表单数据
	        if (addToCart) { //选择了学期信息add to cart按钮才会出来，才发送请求
	            xhr.open("post", form.action, true);
	            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	            xhr.send(serialize(form));
	        } else {
	            p.innerHTML = "自动刷课还没开始哦，先选择学期再按一下保存的书签";
	        }
	    }
	    submitData();
	    var repeat = setInterval(submitData, 3000);
	})();

上面代码中，主题上有3个函数serialize()、createXHR()、submitData()。serialize函数用于在不同浏览器中将表单的数据序列化然后发送给服务器。createXHR用于在不同浏览器中创建XMLHttpRequest对象来发送异步请求。submitData用于提交表单数据。通过给XHR对象绑定事件处理程序来实现成功接收相应后的回调函数和返回失败的错误处理。而生成的p元素被插入到原本的页面中来实现提示功能。
## 源码地址
GitHub repo：[水课哪里跑](https://github.com/kmCha/courserefresh-uo)

# 这东西会不断完善（有时间的话）
所以你们有什么建议意见欢迎给我说。
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/96795509.jpg)
![](http://7xoxzw.com1.z0.glb.clouddn.com/15-12-9/12613772.jpg)