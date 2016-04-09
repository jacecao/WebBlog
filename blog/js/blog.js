//点击登录后显示登录框和遮罩
var Login_show = function()
	{
	    $("#login").show();
	    $("#local_screen").local( 1000 ).animate(
	    	{
	    		attr: 'opacity',
	    		target: 100,
	    		time: 30
	    	});
	    //拖拽登录框
			$("#login").drag( [$("#login_h2")] );
	    //注意元素处于不可见display:none时是无法获取自身高度、宽度的，所以这里先显示元素再获取元素尺寸
	    var w = $("#login").offset().width,
	    	h = $("#login").offset().height;
	    $("#login").center( w, h ).resize(
	    	function()
		 	{
		 		//在登录框居中后再执行resize()，注意这里发生拖动后登录框不再居中
		 		//因为这里不再执行.center()
		 		//由于local()中每执行一次那么就会让遮罩显示出来，
		 		//所以这里需要判断一下登录框是否在显示
		 		if( $("#login").css("display") == "block" )
		 		{
		 			$("#local_screen").local( 1000 );
		 		}
		 	}
		);
	};
//点击注册后显示登录框和遮罩
var Reg_show = function()
	{
		$("#reg").show();
	    $("#local_screen").local( 1000 ).animate(
	    	{
	    		attr: 'opacity',
	    		target: 100,
	    		time: 30
	    	});
		$("#reg").drag( [$("#reg_h2")] );
	    var w = $("#reg").offset().width,
	    	h = $("#reg").offset().height;
	    $("#reg").center( w, h ).resize(
	    	function()
		 	{
		 		if( $("#reg").css("display") == "block" )
		 		{
		 			$("#local_screen").local( 1000 );
		 		}
		 	}
		);
	};

$(function(){
	var over = function()
		{
			$("#header .bar_ul").show().animate({
				time:30,
				mix:{'height':122,'opacity':100}
			});
		},
		out = function()
		{
			$("#header .bar_ul").animate({
				mix:{'height':0,'opacity':0},
				time:30,
				fn: function(){
					$("#header .bar_ul").hide();
				}
			});
		};
	//个人中心鼠标移入移出事件
	$("#header .set_bar").hover( over,out ).class("click");
    //登录框和遮罩设置
	$("#header .login").click(Login_show);
	//隐藏登录框
	$("#login .login_closed").click(
		function()
		{
			$("#login").hide();
			$("#local_screen").animate({
				attr:'opacity',
				target:0,
				time:30,
				fn:function(){
					$("#local_screen").hide();
				}
			});
		}
	);
	//点击登陆框登陆按钮
	//点击登陆框注册按钮
	$("#login .login_reg").click(function(){
		$("#login").hide();
		Reg_show();
	});
	//点击注册后显示注册框和遮罩
	$("#header .regiter").click(Reg_show);
	//隐藏注册框
	$("#reg .reg_closed").click(
		//隐藏注册框
		function()
		{
			$("#reg").hide();
			$("#local_screen").animate({
				attr:'opacity',
				target:0,
				time:30,
				fn:function(){
					$("#local_screen").hide();
				}
			});
		}
	);	
	//share分享栏控制
	var share_icon_hover = function()
	{
		$(this).animate({
			attr:'top',
			start:40,
			target:0
		});
	};
	var share_icon_out = function()
	{
		$(this).animate({
			attr:'top',
			target:0
		});
	};
	var _share_click = true;
	$('#share .weixin').hover( share_icon_hover, share_icon_out );
	$('#share .weibo').hover( share_icon_hover, share_icon_out );
	$('#share').click(
		 function()
		 {
		 	if( _share_click )
		 	{
		 		$(this).animate({
					attr:'right',
					target:0
				});
				_share_click = false;
		 	}else{
		 		$(this).animate({
					attr:'right',
					target:-50
				});
				_share_click = true;
		 	}
		 }
	);
//滑动菜单栏
$('#main .clear_bug li').hover(function(){
	var target = $(this).offset().left;
	$('#main .chose_box').animate(
		{
			attr:'left',
			target:target+20,
			fn:function(){
				$('#main .main_white').animate(
					{
						attr:'left',
						target:-target
					});
			}
		});
	
},function(){
	$('#main .chose_box').animate(
		{
			attr:'left',
			target:20,
			fn:function(){
				$('#main .main_white').animate(
					{
						attr:'left',
						target:0
					});
			}
		});
});
	


$('#main h2').toggle(
	function(){
		$(this).next().animate({
			mix:{'height':0,'opacity':0}
		});
	},function(){
			$(this).next().animate({
			mix:{'height':148,'opacity':100}
		});
	});











});