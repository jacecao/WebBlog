$(window).bind('load',function(){
	//用户名检验
	$('#reg').form('reg_user').bind( 'focus',function(){
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .right_user').hide();
	}).bind( 'blur',function(){
		var getValue = dele_spce( $(this).value() );
		if( getValue  == '' )//如果值为空那么全部隐藏
		{
			$('#reg .info_user').hide();
			$('#reg .error_user').hide();
			$('#reg .right_user').hide();
		}else if( !/\w{2,20}/.test( getValue ) || /\W+/.test( getValue )  ){
			$('#reg .info_user').hide();
			$('#reg .error_user').show();
			$('#reg .right_user').hide();
		}else{
			$('#reg .info_user').hide();
			$('#reg .error_user').hide();
			$('#reg .right_user').show();
		}
	});
	
	//密码检验
	$('#reg').form('reg_pass').bind( 'focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .right_pass').hide();
	}).bind('blur',function(){
		if( dele_spce( $(this).value() ) == '' )
		{
			$('#reg .info_pass').hide();
			$('#reg .error_pass').hide();
			$('#reg .right_pass').hide();
		}else{
			$('#reg .info_pass').hide();
			if( check_pass( this ) )
			{
				$('#reg .error_pass').hide();
				$('#reg .right_pass').show();
			}else{
				$('#reg .error_pass').show();
				$('#reg .right_pass').hide();
			}
		}
	});
	//密码强度验证
	$('#reg').form('reg_pass').bind('keyup',function(){
		check_pass( this );
	});
	//密码确认
	$('#reg').form('reg_check').bind( 'focus',function(){
		$('#reg .info_check').show();
		$('#reg .error_check').hide();
		$('#reg .right_check').hide();
	}).bind('blur',function(){
		if( dele_spce( $(this).value() ) == '' )
		{
			$('#reg .info_check').hide();
			$('#reg .error_check').hide();
			$('#reg .right_check').hide();
		}else{
			$('#reg .info_check').hide();
			if( dele_spce( $(this).value() ) === dele_spce( $('#reg').form('reg_pass').value() ) )
			{
				$('#reg .error_check').hide();
				$('#reg .right_check').show();
			}else{
				$('#reg .error_check').show();
				$('#reg .right_check').hide();
			}
		}
	});

	//回答验证
	$('#reg').form('reg_ans').bind( 'focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .right_ans').hide();
	}).bind('blur',function(){
		if( dele_spce( $(this).value() ) == '' )
		{
			$('#reg .info_ans').hide();
			$('#reg .error_ans').hide();
			$('#reg .right_ans').hide();
		}else{
			$('#reg .info_ans').hide();
			var _len = dele_spce( $(this).value() ).length;
			if( _len >= 2 && _len<= 32 )
			{
				$('#reg .error_ans').hide();
				$('#reg .right_ans').show();
			}else{
				$('#reg .error_ans').show();
				$('#reg .right_ans').hide();
			}
		}
	});

	//电子邮件验证
	$('#reg').form('reg_email').bind( 'focus',function(){
		
		$('#reg .info_email').show();
		$('#reg .error_email').hide();
		$('#reg .right_email').hide();
	}).bind('blur',function(){
		$('#reg .email_tip').hide();
		this.index = 0;
		if( dele_spce( $(this).value() ) == '' )
		{
			$('#reg .info_email').hide();
			$('#reg .error_email').hide();
			$('#reg .right_email').hide();
		}else{
			$('#reg .info_email').hide();
			var _value = dele_spce( $(this).value() );
			if( /^\w+@\w+(\.[a-z]{2,4}){1,2}$/i.test( _value ) )
			{
				$('#reg .error_email').hide();
				$('#reg .right_email').show();
			}else{
				$('#reg .error_email').show();
				$('#reg .right_email').hide();
			}
		}
	});
	//电子邮件补全系统
	$('#reg').form('reg_email').bind('keydown',function(){
		//在表单中input中有type="submit"时，无论有几个type="text"输入框，回车均表示提交。
		//所以在这里需要早按键时阻止默认事件。
		if( event.keyCode == 13 )
		{
			preDef();
		}
	}).bind('keyup',function(){
		var _value = dele_spce( $(this).value() );
		$('.email_tip span').html( _value );
		if( _value.indexOf('@') != -1 || _value == '' )
		{
			$('#reg .email_tip').hide();
		}else{
			$('#reg .email_tip').show();
			//键盘获取补全
			if( event.keyCode == 40 )//向下
			{
				if( this.index == undefined || this.index >= $('#reg li').length()-1 )
				{
					this.index = 0;
				}else{
					this.index ++;
				}
				$('#reg .email_tip li').removeClass('keychoose');
				$('#reg .email_tip li').find(this.index).class('keychoose');
			}
			if( event.keyCode == 38 )//向上
			{
				if( this.index == 'undefined' || this.index <= 0 )
				{
					this.index = $('#reg li').length()-1;
				}else{
					this.index --;
				}
				$('#reg .email_tip li').removeClass('keychoose');
				$('#reg .email_tip li').find(this.index).class('keychoose');
			}
			if( event.keyCode == 13 )//回车
			{
				//注意在form表单中如果默认情况下，单个输入框，无论按钮的type="submit"还是type="button"类型，回车即提交。
				//1.当type="submit"时，无论有几个type="text"输入框，回车均表示提交。（submit）
				//2.当type="button"时，且存在多个输入框，回车不提交。（button）
				$(this).value( $('#reg .email_tip li').find(this.index).text() );
				$('#reg .email_tip').hide();
				this.index = 0;
			}
		}
	});
	//点击补全
	$('.email_tip li').bind('mousedown',function(){
		//注意这里不能是使用click事件
		//click事件是点击弹起后触发的，而blur失去焦点后，没有弹起元素，导致这里的click事件无法触发
		var _value = $(this).text();
		$('#reg').form('reg_email').value(_value);
	});




});

//密码检验FN
function check_pass( _this )
{
	var value = dele_spce( $(_this).value() );
	var result = false;
	//满足6-20条件
	if( value.length >= 6 && value.length <= 20 )
	{
		$('#reg .info_pass .tip1').css('backgroundColor','#73FF00');
	}else{
		$('#reg .info_pass .tip1').css('backgroundColor','#eee');
	}
	//满足非控字符条件
	if( value.length > 0 && !/\s/.test(value) )
	{
		$('#reg .info_pass .tip2').css('backgroundColor','#73FF00');
	}else{
		$('#reg .info_pass .tip2').css('backgroundColor','#eee');
	}
	//大小写字母-数字-非空字符2种以上
	var code_length = 0;
	if( /[0-9]/.test(value) )
	{
		code_length++;
	}
	if( /[a-z]/.test(value) )
	{
		code_length++;
	}
	if( /[A-Z]/.test(value) )
	{
		code_length++;
	}
	if( /[^\b\w]/.test(value) )
	{
		code_length++;
	}
	if( code_length >= 2 )
	{
		$('#reg .info_pass .tip3').css('backgroundColor','#73FF00');
	}else{
		$('#reg .info_pass .tip3').css('backgroundColor','#eee');
	}
	//安全级别的判定
	//高：大于等于10个字符，3种不同类别的字符混拼
	//中：大于等于8个字符，2种不同类别的字符混拼
	//低：大于等于1个字符
	//无：没有字符
	//判断的时候务必从高到低判断，防止高级别无法执行到
	if( value.length >= 10 && code_length >=3 )
	{
		$('#reg .info_pass .s1').css('color','#73FF00');
		$('#reg .info_pass .s2').css('color','#73FF00');
		$('#reg .info_pass .s3').css('color','#73FF00');
		$('#reg .info_pass .s4').html('高');
	}else if( value.length >= 8 && code_length >=2 )
	{
		$('#reg .info_pass .s1').css('color','#73FF00');
		$('#reg .info_pass .s2').css('color','#73FF00');
		$('#reg .info_pass .s3').css('color','#eee');
		$('#reg .info_pass .s4').html('中');
	}else if( value.length >= 1 )
	{
		$('#reg .info_pass .s1').css('color','#73FF00');
		$('#reg .info_pass .s2').css('color','#eee');
		$('#reg .info_pass .s3').css('color','#eee');
		$('#reg .info_pass .s4').html('低');
	}else{
		$('#reg .info_pass .s1').css('color','#eee');
		$('#reg .info_pass .s2').css('color','#eee');
		$('#reg .info_pass .s3').css('color','#eee');
		$('#reg .info_pass .s4').html('');
	}
	if( value.length >= 6 && value.length <= 20 && !/\s/.test(value) && code_length >=2 )
	{
		result = true;
	}
	return result;

}