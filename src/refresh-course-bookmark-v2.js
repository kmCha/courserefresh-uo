if(location.href.indexOf("web23.uottawa.ca/uopr/NavS/Popup.aspx?pageid=registerSelect&code") >= 0 && !document.querySelector("#courseInfo")) {
	(function() {
		var frame = document.createElement("iframe"),
	      	count = 0,			// 计数器
	      	oddEven = 2,		// 奇偶交替刷新
	      	p = document.createElement("p"),
		    body = document.body;

		//水课哪里跑提示横幅
	  	p.style.padding = "10px 20px";
	  	p.style.border = "2px dotted #7e7e7e";
	  	p.style.textAlign = "center";
	  	p.style.color = "red";
	  	p.style.fontSize = "2em";
	  	p.id = "courseInfo";
	  	p.style.position = "relative";
		p.style.left = 0;
		p.style.top = "100px";
	  	body.appendChild(p);

	  	//装载刷新页面的frame元素
		frame.height = (document.getElementById("main").offsetHeight + 100) + "px";
		frame.width = body.offsetWidth + "px";
		frame.style.position = "absolute";
		frame.style.left = 0;
		frame.style.top = 0;
		frame.frameBorder = "no";
		body.appendChild(frame);
		frame.src = location.href;

		frame.onload = function() {
			var contentDocument = frame.contentDocument,				// iframe的document对象
				tableTitle = contentDocument.querySelector(".DeAcDataGridListHeader"), 	//这个元素在session到期的页面中不存在
				checkParents = contentDocument.body.querySelectorAll("tr.SectionHeader"),  // 包裹checkbox的tr元素，每个section对应一个，不管有没有checkbox
				parentsLength = checkParents.length,						// section的个数
				seatsAvailable = false,													// 保存有没有位置的结果
				i,
				frameAddToCart = contentDocument.getElementById("_ctl0__Template_btnCourseGo");		// iframe中的add to chart按钮

			for(i = 0; i < parentsLength; i++) {								// 遍历每个section看有没有input元素，有就代表有位置了
				if(checkParents[i].getElementsByTagName("input").length > 0) {
					seatsAvailable = true;
					break;
				}
			}

			if(seatsAvailable) {   //有座位了
				var conf = confirm("这个课有位置了，赶紧的！要自动选就按确定");
      			frame.onload = function() {
      				window.close();  // 重设onload事件处理程序，点了add to chart之后触发
      			};
	      		if (conf === true) {
	      			checkParents[i].getElementsByTagName("input")[0].click();  //选中相应section的选项框
	        		frameAddToCart.click(); //自动点击add to cart进入cart页面
	      		}
	      		else {
	     			p.innerHTML = "水课哪里跑：尝试" + (++count) + "次之后，帮你刷出来位置了，但是你点了取消，想选的话赶紧手动选还来得及哦";
	      		}
			}

			else if (!tableTitle) { //session到期
	      		p.innerHTML = "水课哪里跑：尝试" + (++count) + "次后，还是没有位置，rabaska让你重新登录了";
				alert("登陆时间到了请重新登录");
			}

			else {						//没有座位继续刷新
				if(oddEven === 2) {
					contentDocument.getElementById("_ctl0__Template_ddlSession").childNodes[3].selected = "selected";	// 刚打开页面选择学期
					var script = document.createElement("script");
					script.text = "__doPostBack('_ctl0$_Template$ddlSession','');";
					script.type = "text/javascript";
					contentDocument.body.appendChild(script);										// 手动触发选择学期之后的事件处理程序（会触发刷新）
		      		p.innerHTML = "水课哪里跑：尝试" + (++count) + "次";
		      		oddEven++;
		    	}
			    else {
			    	setTimeout(function(){										// 每2s刷新一次iframe中的页面
				    	frame.src = frame.src;
				    	oddEven--;
			    	}, 2000);
			    }
			}
		};
	})();
}