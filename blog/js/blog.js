//显示弹出框和遮罩
//需要传入两个参数obj:需要显示的弹出框 ele:实现拖拽的元素
var show_fun = function( obj, ele )
{
    obj.show();
    $("#local_screen").local( 1000 ).animate(
    	{
    		attr: 'opacity',
    		target: 100,
    		time: 30
    	});
    //拖拽登录框
    if( arguments.length == 2 )
    {
		obj.drag( [ele] );
    }
    //注意元素处于不可见display:none时是无法获取自身高度、宽度的，所以这里先显示元素再获取元素尺寸
    var w = obj.offset().width,
    	h = obj.offset().height;
    obj.center( w, h ).resize(
    	function()
	 	{
	 		//在登录框居中后再执行resize()，注意这里发生拖动后登录框不再居中
	 		//因为这里不再执行.center()
	 		//由于local()中每执行一次那么就会让遮罩显示出来，
	 		//所以这里需要判断一下登录框是否在显示
	 		if( obj.css("display") == "block" )
	 		{
	 			$("#local_screen").local( 1000 );
	 		}
	 	}
	);
};
//点击弹出关闭按钮后 注意如果这里直接使用closed作为变量名会出错
//参数obj为需要关闭的弹出元素
var closed_fun = function( obj )
{
	obj.hide();
	$("#local_screen").animate({
		attr:'opacity',
		target:0,
		time:30,
		fn:function(){
			$("#local_screen").hide();
		}
	});			
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
	//个人中心鼠标移入移出事件 ***************************************************
	$("#header .set_bar").hover( over,out ).class("click");
    //登录框和遮罩设置 ***************************************************
	$("#header .login").click( 
		function()
		{ 
			show_fun( $('#login'), $('#login_h2') );	
		});
	//隐藏登录框
	$("#login .login_closed").click(
		//由于closed_fun()需要传参所以这里不能直接写closed_fun( $("#login")
		//而需要一个匿名函数来调用该函数，否则不能执行
		function(){ closed_fun( $("#login") ); }
	);
	//点击登陆框注册按钮 ***************************************************
	//点击注册框登陆按钮
	var reg_show = function()
	{
		show_fun( $('#reg'), $('#reg_h2') );
		//解决注册框top值为负数的情况
		if( $('#reg').css('top') < 0 )
		{
			$('#reg').css('top','10px');
		}
	};
	$("#login .login_reg").click(function(){
		$("#login").hide();
		reg_show();
	});
	$("#reg .reg_log").click(function(){
		$("#reg").hide();
		show_fun( $('#login'), $('#login_h2') );
	});
	//点击注册后显示注册框和遮罩 ***************************************************
	$("#header .regiter").click( reg_show );
	//隐藏注册框 ***************************************************
	$("#reg .reg_closed").click(
		//隐藏注册框
		function(){ closed_fun( $('#reg') );}
	);

	//share分享栏控制 ***************************************************
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
	//主体底部菜单栏 ***************************************************
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
	//主体左侧滑动菜单栏	***************************************************
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

	//bannner 轮播广告部分***************************************************
	//轮播初始状态
	$('#banner img').opacity(0);
	$('#banner img').find(0).opacity(100);
	$('#banner span').html($('#banner img').find(0).attr('alt'));
	//轮播器样式设置
	var banner_type = 1; //1:渐变切换 2：上下滚动切换
	//计数器
	var banner_index = 1;
	//主体fun
	var banner_run = function( obj , pref ){
		// $('#banner img').hide();
		$('#banner li').removeClass('choose');
		// $('#banner img').find( $(obj).index() ).show();
		$(obj).class('choose');
		$('#banner span').html($('#banner img').find( $(obj).index() ).attr('alt'));
		if( banner_type == 1 )
		{
			//注意如果动画执行时间超过自动播放切换时间，动画就会出发失误
			$('#banner img').find( pref ).animate({
				attr:'opacity',
				target: 0,
				time: 70,
				step:10
			}).css('zIndex',1);
			$('#banner img').find( $(obj).index() ).animate({
				attr:'opacity',
				target: 100,
				time: 70,
				step:10
			}).css('zIndex',2);
		}
		if( banner_type == 2 )
		{
			$('#banner img').find( pref ).animate({
				attr:'top',
				target: 200,
				time: 70,
				step:10
			}).opacity(100);
			$('#banner img').find( $(obj).index() ).animate({
				attr:'top',
				target: 0,
				time: 70,
				step:10
			}).css('top','-200px').opacity(100);
		}
	};
	//计数变动fun
	var banner_fn = function(){
		if( banner_index >= $('#banner li').length() )
		{
			banner_index = 0;
		}
		//理解这里的传参，要符合base.js库中$()操作
		var pref_index = banner_index == 0 ? $('#banner li').length()-1:banner_index-1;
		banner_run( $('#banner li').elements[banner_index], pref_index );
		banner_index ++;
	};
	//自动播放部分
	var banner_timer = setInterval( banner_fn, 3000);
	//手动滚动部分
	$('#banner li').hover(function(){
		clearInterval( banner_timer );
		//避免重复加载，所以在非当前加载的情况下才执行加载
		if( $(this).css('backgroundColor')!='rgb(255, 165, 0)' )
		{
			var pref_index = banner_index == 0 ? $('#banner li').length()-1:banner_index-1;
			banner_run( this, pref_index );
		}
	},function(){
		//离开鼠标后 重新计算索引和再次加入定时器
		banner_index = $(this).index()+1;
		banner_timer = setInterval( banner_fn, 3000);
	});

	//photo延迟加载*******************************************
	//先储存img元素，减少下面for循环的计算
	var _imgs = $('#photo dt img');
	//初始状态
	_imgs.opacity(0);
	//延迟加载函数
	var _wait_load = function()
	{
		for( var i = 0; i < _imgs.length(); i++ )
		{
			//注意这里必须获得的是单个元素
			//而不能是一个对象如果这里换成_imgs.find(i)就不可以了
			var _this = _imgs.elements[i];		
			if( View_Y + scroll().top >= $(_this).offset().top )
			{
				var value = $(_this).attr('_src');
				$(_this).attr('src',value).animate({
					attr: 'opacity',
					target: 100,
					time: 120
				});
			}
		}
	};
	//滚动事件中判定是否加载图片
	//防止滚动事件触发时不停的执行该函数，所以使用setTimeout()
	//来延迟函数的执行
	$(window).bind( 'scroll', function(){setTimeout(_wait_load,100);} );
	//在窗口发生变化时也要执行缓存加载函数
	$(window).bind('resize',_wait_load);
	// 点击图片显示大图*****************************************************
	_imgs.click( 
	function()
	{ 
		show_fun( $('#show_img'), $('#show_img_h2') ); 
		//阻止鼠标默认的拖动选择文字事件
		addEvent(document,'mousedown',preDef);
		addEvent(document,'mouseup',preDef);
		addEvent(document,'selectstart',preDef);
	} );
	//关闭大图
	$('#show_img .show_img_closed').click( 
	function()
	{ 
		closed_fun( $('#show_img') );
		//在关闭遮罩时需要移除阻止函数
		removeEvent(document,'mousedown',preDef);
		removeEvent(document,'mouseup',preDef);
		removeEvent(document,'selectstart',preDef);

	} );






});