<script language = "javascript" type = "text/javascript">


//添加标题
addContent("读书笔记","http://www.cnblogs.com/hlwyfeng/category/683102.html");
addContent("前端框架","http://www.cnblogs.com/hlwyfeng/category/785736.html");
addContent("CSS+XHTML","http://www.cnblogs.com/hlwyfeng/category/785734.html");
addContent("JavaScript","http://www.cnblogs.com/hlwyfeng/category/785732.html");
addContent("HTML5+CSS3","http://www.cnblogs.com/hlwyfeng/category/785735.html");
//addContent("Java","http://www.cnblogs.com/hlwyfeng/category/785737.html");
//addContent("MySQL","http://www.cnblogs.com/hlwyfeng/category/785738.html");

//添加二级目录
addSecondContent("前端框架",
	{
		"JQuery":"http://www.cnblogs.com/hlwyfeng/category/790779.html",
		"BootStrap":"http://www.cnblogs.com/hlwyfeng/category/789593.html"
	});

//查找元素，需要加载完毕后，在window下
window.onload = function(){

	offwidth();
	offCommWidth();
	cLabelColor();

	//插入Top 节点
	insertNewNode("div","hlwyfeng_toTop","blog-news");
	// 隐藏
	$("#hlwyfeng_toTop").hide();
	BlogDirectory.createBlogDirectory("cnblogs_post_body","h2","h3",10);
	$("#divSideBar").hide();
	//滑到前面
	document.getElementById("hlwyfeng_toTop").onclick=function(){
		goTop();
	}

	$(window).scroll(function(){
		if($(window).scrollTop() < 200){
			$("#hlwyfeng_toTop").fadeOut(1000);
			$("#divSideBar").fadeOut(1000);
		}else{
			$("#hlwyfeng_toTop").fadeIn(1000);
			$("#divSideBar").fadeIn(1000);
		}
	});


	// 剪切节点，把声明剪切到文章里面
	cutNode();

	//修改推荐提示
	modify_comm("digg_tips","推荐本文");

	//插入有帮助
	insertEle("span","haveHelp","digg_count");

	// 修改评论图片
	modifyPic();

	modify_comm("haveHelp","有帮助");

	// 响应关注我按钮
	var getEle_follow = document.getElementById("p_b_follow");
	var getFollow_a = getEle_follow.getElementsByTagName("a");

	// 给博主添加管理入口
	console.log(getEle_follow.innerHTML);
	if(getEle_follow.innerHTML == ''){
		addContent("管理","http://i.cnblogs.com/EditPosts.aspx");
	}

	// 响应关注我按钮
	if(getFollow_a[0]){//判断是否是博主
		if(getFollow_a[0].innerHTML == "+加关注"){
	 	// 插入关注我
			insertEle("div","followMe","div_digg");

		 	var getFollowMe = document.getElementById("followMe");
		 	getFollowMe.innerHTML = "关注作者";
		 	getFollowMe.onclick=function(){
		 		var getEle_follow = document.getElementById("p_b_follow");
				var getFollow_a = getEle_follow.getElementsByTagName("a");
				getFollow_a[0].onclick();
				this.innerHTML = "Hello Friend!";
		 	}
		}
	}else{
		console.log("006提示：你是博主");
	}

}
/**************************************************************
函数实现
**************************************************************/
// 添加导航目录
//title名称，linkAddress链接地址
function addContent(title,linkAddress){
	//创建JavaScript节点
	var ele = document.createElement("li");
	var ele_a = document.createElement("a");
	ele_a.class = "menu";
	ele_a.href = linkAddress;
	ele_a.innerHTML = title;
	ele.appendChild(ele_a);

	//插入节点
	var eleUl = document.getElementById("navList");
	eleUl.appendChild(ele);
}

// 插入二级目录
/*
parentN 一级目录
json 二级目录及链接
*/
function addSecondContent(parentName,json){

	var eleUl = document.createElement("ul");
	eleUl.className = "secContent";

	for(var secName in json){

		var eleLi = document.createElement("li");
		var eleA = document.createElement("a");

		eleA.innerHTML = secName;
		eleA.href = json[secName];
		eleLi.appendChild(eleA);
		eleUl.appendChild(eleLi);
	}

	$lia = $("#navList li a");
	for(var i=0; i<$lia.length; i++){
		if($lia[i].innerHTML == parentName){
			//获取目标节点
			$lia[i].parentNode.appendChild(eleUl);
		}
	}
}

//修改标签id为getEle的元素的内容为att
function modify_comm(getEle,att){
	var ele = document.getElementById(getEle);
	if(ele){
		ele.innerHTML = att;
	}else {
		console.log("003提示：这是主界面");
	}
}

// 在某标签（通过id）前面插入元素
/*参数说明：
*newEle 要创建的新节点是什么,如span,p等
*newEle_id, 给新节点一个id
*oldEle_id, 在这个id节点前插入
*支持添加两个属性attr1，attr2
*
*/
function insertEle(newEle,newEle_id,oldEle_id){
	var getOldEle = document.getElementById(oldEle_id);
	if(getOldEle){
		var createEle = document.createElement(newEle);
		createEle.id = newEle_id;
		getOldEle.parentNode.insertBefore(createEle,getOldEle);
	}else{
		console.log("004提示：这是主界面");
	}
}

// 剪切节点
function cutNode(){
	var getMySignature = document.getElementById("MySignature");
	if(getMySignature){
		var creteEle = document.createElement("div");
		createEle = getMySignature;
		getMySignature.parentNode.removeChild(getMySignature);

		var getPostBodyEle = document.getElementById("cnblogs_post_body");
		getPostBodyEle.appendChild(createEle);
	}else{
		console.log("002提示：这是主界面");
	}
}

// 在某节点插入子节点
// 参数说明：newNod，新的节点的名称，newId 相关的Id
function insertNewNode(newNode,newId,oldNodeId){
	var createEle = document.createElement(newNode);
	createEle.id = newId;
	var getEle = document.getElementById(oldNodeId);
	getEle.appendChild(createEle);
}

// 替换评论图片
function modifyPic(){
	var getEle_quote = document.getElementById("ubb_quote");
	if(getEle_quote){
		var getEle_url = document.getElementById("ubb_url");
		var getEle_code = document.getElementById("ubb_code");
		var getEle_icon = document.getElementById("ubb_img");

		getEle_quote.src = "http://www.easyicon.net/api/resizeApi.php?id=1132359&size=32";
		getEle_url.src = "http://www.easyicon.net/api/resizeApi.php?id=1179069&size=32";
		getEle_code.src = "http://www.easyicon.net/api/resizeApi.php?id=1179075&size=32";
		getEle_icon.src = "http://www.easyicon.net/api/resizeApi.php?id=543797&size=32";
	}else{
		console.log("005提示：这是主界面");
	}

}


//处理文章图片大小
function modifyPicBS(){
	var getEle = $("#cnblogs_post_body img");
	var widt = $(".postBody");
	var getWidth = getStyle(widt[0],"width");
	for(var i=0; i<getEle.length; i++){
		console.log(getEle[i].id);
		getEle[i].style["max-width"] = getWidth;
	}
}

// 获取属性值
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

// 新的方法
function offwidth(){
	var getEle = $("#cnblogs_post_body img");
	var widt = $(".postBody");
	for(var i=0; i<getEle.length; i++){
		getEle[i].style["max-width"] = widt[0].offsetWidth + "px";
		getEle[i].style["display"] = "inline";
	}
}

//评论框自适应
function offCommWidth(){
	var getEle = $(".commentbox_main")[0];
	if(getEle){
		var getComEle = document.getElementById("tbCommentBody");
		getComEle.style.width = getEle.offsetWidth-40 + "px";
	}else{
		console.log("001提示：这是主界面");
	}
}

// 返回顶部
function goTop(){
	$(document.documentElement).animate({
		scrollTop:0
	},300);
	$(document.body).animate({
		scrollTop:0
	},300);
}

// 修改标签颜色 
function cLabelColor(){
	var myTagEle = $(".catListTag li");
	for (var i=0; i<myTagEle.length; i++){
		switch(i){
			case 1: myTagEle[i].style.background = "#2a5caa";
					  break;
			case 2: myTagEle[i].style.background = "#694d9f";
					  break;
			case 3: myTagEle[i].style.background = "#80752c";
					  break;
			case 4: myTagEle[i].style.background = "#007d65";
					  break;
			case 5: myTagEle[i].style.background = "#f58220";
					  break;
			case 6: myTagEle[i].style.background = "#b69968";
					  break;
			case 7: myTagEle[i].style.background = "#ef5b9c";
					  break;
			case 8: myTagEle[i].style.background = "#ef4136";
					  break;
			case 9: myTagEle[i].style.background = "#7a1723";
					  break;
			case 10: myTagEle[i].style.background = "#009ad6";
					  break;
		}
	}
}
/*************
插入css样式
*************/
function addCssLinkSytle(url){
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}

/**************
生成博客目录
**************/
var BlogDirectory = {
    /*
        获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
    */
    getElementPosition:function (ele) {        
        var topPosition = 0;
        var leftPosition = 0;
        while (ele){              
            topPosition += ele.offsetTop;
            leftPosition += ele.offsetLeft;        
            ele = ele.offsetParent;     
        }  
        return {top:topPosition, left:leftPosition}; 
    },

    /*
    获取滚动条当前位置
    */
    getScrollBarPosition:function () {
        var scrollBarPosition = document.body.scrollTop || document.documentElement.scrollTop;
        return  scrollBarPosition;
    },
    
    /*
    移动滚动条，finalPos 为目的位置，internal 为移动速度
    */
    moveScrollBar:function(finalpos, interval) {

        //若不支持此方法，则退出
        if(!window.scrollTo) {
            return false;
        }

        //窗体滚动时，禁用鼠标滚轮
        window.onmousewheel = function(){
            return false;
        };
          
        //清除计时
        if (document.body.movement) { 
            clearTimeout(document.body.movement); 
        } 

        var currentpos =BlogDirectory.getScrollBarPosition();//获取滚动条当前位置

        var dist = 0; 
        if (currentpos == finalpos) {//到达预定位置，则解禁鼠标滚轮，并退出
            window.onmousewheel = function(){
                return true;
            }
            return true; 
        } 
        if (currentpos < finalpos) {//未到达，则计算下一步所要移动的距离
            dist = Math.ceil((finalpos - currentpos)/10); 
            currentpos += dist; 
        } 
        if (currentpos > finalpos) { 
            dist = Math.ceil((currentpos - finalpos)/10); 
            currentpos -= dist; 
        }
        
        var scrTop = BlogDirectory.getScrollBarPosition();//获取滚动条当前位置
        window.scrollTo(0, currentpos);//移动窗口
        if(BlogDirectory.getScrollBarPosition() == scrTop)//若已到底部，则解禁鼠标滚轮，并退出
        {
            window.onmousewheel = function(){
                return true;
            }
            return true;
        }
        
        //进行下一步移动
        var repeat = "BlogDirectory.moveScrollBar(" + finalpos + "," + interval + ")"; 
        document.body.movement = setTimeout(repeat, interval); 
    },
    
    htmlDecode:function (text){
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },

    /*
    创建博客目录，
    id表示包含博文正文的 div 容器的 id，
    mt 和 st 分别表示主标题和次级标题的标签名称（如 H2、H3，大写或小写都可以！），
    interval 表示移动的速度
    */
    createBlogDirectory:function (id, mt, st, interval){
	console.log("创建博文目录");
         //获取博文正文div容器
        var elem = document.getElementById(id);
        if(!elem) return false;
        //获取div中所有元素结点
        var nodes = elem.getElementsByTagName("*");
        //创建博客目录的div容器
        var divSideBar = document.createElement('DIV');
        divSideBar.className = 'divSideBar';
        divSideBar.setAttribute('id', 'divSideBar');
        var divSideBarTab = document.createElement('DIV');
        divSideBarTab.setAttribute('id', 'divSideBarTab');
        divSideBar.appendChild(divSideBarTab);
        var h2 = document.createElement('H2');
        divSideBarTab.appendChild(h2);
        var txt = document.createTextNode('目录');
        h2.appendChild(txt);
        var divSideBarContents = document.createElement('DIV');
        divSideBarContents.style.display = 'none';
        divSideBarContents.setAttribute('id', 'divSideBarContents');
        divSideBar.appendChild(divSideBarContents);
        //创建自定义列表
        var dlist = document.createElement("dl");
        divSideBarContents.appendChild(dlist);
        var num = 0;//统计找到的mt和st
        mt = mt.toUpperCase();//转化成大写
        st = st.toUpperCase();//转化成大写
        //遍历所有元素结点
        for(var i=0; i<nodes.length; i++)
        {
            if(nodes[i].nodeName == mt|| nodes[i].nodeName == st)    
            {
                //获取标题文本
                var nodetext = nodes[i].innerHTML.replace(/<\/?[^>]+>/g,"");//innerHTML里面的内容可能有HTML标签，所以用正则表达式去除HTML的标签
                nodetext = nodetext.replace(/&nbsp;/ig, "");//替换掉所有的&nbsp;
                nodetext = BlogDirectory.htmlDecode(nodetext);
                //插入锚        
                nodes[i].setAttribute("id", "blogTitle" + num);
                var item;
                switch(nodes[i].nodeName)
                {
                    case mt:    //若为主标题 
                        item = document.createElement("dt");
                        break;
                    case st:    //若为子标题
                        item = document.createElement("dd");
                        break;
                }
                
                //创建锚链接
                var itemtext = document.createTextNode(nodetext);
                item.appendChild(itemtext);
                item.setAttribute("name", num);
                item.onclick = function(){        //添加鼠标点击触发函数
                    var pos = BlogDirectory.getElementPosition(document.getElementById("blogTitle" + this.getAttribute("name")));
                    if(!BlogDirectory.moveScrollBar(pos.top, interval)) return false;
                };            
                
                //将自定义表项加入自定义列表中
                dlist.appendChild(item);
                num++;
            }
        }
        
        if(num == 0) return false; 
        /*鼠标进入时的事件处理*/
        divSideBarTab.onmouseenter = function(){
            divSideBarContents.style.display = 'block';
        }
        /*鼠标离开时的事件处理*/
        divSideBar.onmouseleave = function() {
            divSideBarContents.style.display = 'none';
        }

        document.body.appendChild(divSideBar);
    }
    
};

</script>