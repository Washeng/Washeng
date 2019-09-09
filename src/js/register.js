$(document).ready(function(){
    class regi{
        constructor(){
            this.telflag=null;
            this.passflag=null;
            this.repassflag=null;
            this.yanzmflag=null;
            this.telphone();
            this.password();
            this.repass();
            this.randomnum();
            this.yanzm();
            this.submit();
        }
        // 手机号的验证
        telphone(){
            let _this=this;
            let $telinp=$('.box_border #account');
            let $teltshi=$('#account_warn .tshi');
            // 获得焦点
            $telinp.on('focus',function(){
                $telinp.css("outline","none")
                $('.active .box_border').css("border","1px solid #666")
                $teltshi.css({"display":"block","color":"#666"});
                $('.active .error-box strong').css("display","none");
                $teltshi.html('请输入手机号')
            })
            //失去焦点验证
            $telinp.on('blur',function(){
                if($telinp.val()!=''){
                    let tel = /^1[34578]\d{9}$/; //规则
                    if (tel.test($(this).val())) {
                        //正确填写
                        $('.active .error-box strong').css({"display":"inline-block","background-position":"-40px -19px"})
                        $teltshi.css({"display":"none"});//提示文本消失
                        _this.telflag = true;
                    } else {
                        //手机号格式不对
                        $telinp.css("outline","none")
                        $('.active .box_border').css("border","1px solid #ff464e")//边框变红
                        $teltshi.css({"display":"block","color":"#ff464e"});
                        $('.active .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"});
                        $teltshi.html("手机号格式不正确")
                        _this.telflag = false;
                    }
                }else{//手机号为空
                    $telinp.css("outline","none")//输入框的蓝色边框去掉
                    $('.active .box_border').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $teltshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('.active .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $teltshi.html('手机号不能为空')
                    _this.telflag = false;
                }
            })
        }

        //密码的注册
        password(){
            let _this=this;
            let $passinp=$('.clear .normal-input');
            let $passtshi=$('.clear .tshi');
            let $passicon=$('.clear .error-box strong');
            let $passborder=$('.clear .box_border');
            let $regbox=$('.clear .grade');
            $passinp.on('focus',function(){
                $passinp.css("outline","none")
                $passborder.css("border","1px solid #666")
                $passtshi.css({"display":"block","color":"#666"});
                $passicon.css("display","none");
                $passtshi.html('请输入一个6-12位的密码')
            })
            //密码强度验证
            $passinp.on('input',function(){
                $regbox.css({"display":"inline"});//密码验证的盒子
                $('.clear').css({"padding-bottom":"0"})//大盒子的下边距为0
                $passtshi.css({"display":"none"});

                if($passinp.val()!=''){
                    let num = 0; //记录字符串中字符的种类
                    let numreg = /\d+/;
                    let uppercase = /[A-Z]+/;
                    let lowercase = /[a-z]+/;
                    let othercase = /[\W\_]+/;
                    if (numreg.test($(this).val())) {
                        num++;
                    }
                    if (uppercase.test($(this).val())) {
                        num++;
                    }
                    if (lowercase.test($(this).val())) {
                        num++;
                    }
                    if (othercase.test($(this).val())) {
                        num++;
                    }
        
                    switch (num) {
                        case 1:
                            $regbox.find("span").eq(0).removeClass();
                            $regbox.find("span").eq(0).addClass("cur1").siblings("span").removeClass();
                            $regbox.find("em").html("低");
                            $regbox.find("em").removeClass();
                            $regbox.find("em").addClass("cur1")
                            _this.passflag = false;
                            break;
                        case 2:
                        case 3:
                            $regbox.find("span").not("span:last").removeClass();
                            $regbox.find("span").not("span:last").addClass("cur2");
                            $regbox.find("span").eq(2).removeClass();
                            $regbox.find("em").html("中");
                            $regbox.find("em").removeClass();
                            $regbox.find("em").addClass("cur2")
                            _this.passflag = true;
                            break;
                        case 4:
                            $regbox.find("span").removeClass();
                            $regbox.find("span").addClass("cur3");
                            $regbox.find("em").html("强");
                            $regbox.find("em").removeClass();
                            $regbox.find("em").addClass("cur3");
                            _this.passflag = true;
                            break;
        
                    }
                }
            })
            //失去焦点时
            $passinp.on("blur",function(){
                $regbox.css({"display":"none"});//密码验证的盒子
                $('.clear').css({"padding-bottom":"25px"})//大盒子的下边距为0

                if ($(this).val() !== '') { //不为空
                    if ($(this).val().length >= 6 && $(this).val().length <= 12) { //长度
                        if (_this.passflag) {
                            $passicon.css({"display":"inline-block","background-position":"-40px -19px"})
                            $passtshi.css({"display":"none"});//提示文本消失
                            _this.passflag = true;
                        } else {
                            $passinp.css("outline","none")//输入框的蓝色边框去掉
                            $passborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                            $passtshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                            $passicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                            $passtshi.html("密码强度不够，请重新设置");
                            _this.passflag = false;
                        }
                    } else {
                        $passinp.css("outline","none")//输入框的蓝色边框去掉
                        $passborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                        $passtshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                        $passicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                        $passtshi.html("密码长度不符合要求");
                        _this.passflag = false;
                    }
                } else {
                    $passinp.css("outline","none")//输入框的蓝色边框去掉
                    $passborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $passtshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $passicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $passtshi.html("密码不能为空"); 
                    _this.passflag = false;
                }
            })
        }

        //确认密码
        repass(){
            let _this=this;
            let $repassinp=$('.re-clear .normal-input');
            let $repasstshi=$('.re-clear .tshi');
            let $repassicon=$('.re-clear .error-box strong');
            let $repassborder=$('.re-clear .box_border');
            $repassinp.on('focus',function(){
                $repassinp.css("outline","none")
                $repassborder.css("border","1px solid #666")
                $repasstshi.css({"display":"block","color":"#666"});
                $repassicon.css("display","none");
                $repasstshi.html('请输入与上面一样的密码');
            })
            $repassinp.on("blur",function(){
                if ($(this).val() !== '') {
                    if ($(this).val() === $('.clear .normal-input').val()) {
                        $repassicon.css({"display":"inline-block","background-position":"-40px -19px"})
                        $repasstshi.css({"display":"none"});//提示文本消失
                        _this.repassflag = true;
                    } else {
                        $repassinp.css("outline","none")//输入框的蓝色边框去掉
                        $repassborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                        $repasstshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                        $repassicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                        $repasstshi.html("两次密码不一致");
                        _this.repassflag = false;
                    }
                } else {
                    $repassinp.css("outline","none")//输入框的蓝色边框去掉
                    $repassborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $repasstshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $repassicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $repasstshi.html("确认密码不能为空");
                    _this.repassflag = false;
                }
            })
        }

        //随机生成4位随机数
        randomnum(){
            function yzm(){
                let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
                let str = '';
                for(var i = 0 ; i < 4 ; i ++ ){
                    str += ''+arr[Math.floor(Math.random() * arr.length)];
                }   
                return str;
            }
            let $yzmbtn=$('#verify_display .change_yan');
            $('#verify_display .yan').html(yzm());
            $yzmbtn.on("click",function(){
                $('#verify_display .yan').html(yzm());
            })
        }

        //验证码的填写
        yanzm(){
            let _this=this
            let $yanzinp=$('#verify_display .normal-input');
            let $yanztshi=$('#verify_display .tshi');
            $yanzinp.on('focus',function(){
                $yanzinp.css("outline","none")
            })
            $yanzinp.on("blur",function(){
                if ($(this).val() !== '') {
                    if ($(this).val() === $('#verify_display .yan').html()) {
                        $yanztshi.css({"display":"none"});//提示文本消失
                        $yanzinp.css("border","1px solid #666")
                        _this.yanzmflag = true;
                    } else {
                        $yanzinp.css("outline","none")//输入框的蓝色边框去掉
                        $yanzinp.css("border","1px solid #ff464e")//输入框的边框颜色变红
                        $yanztshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                        $yanztshi.html("验证码不正确");
                        _this.yanzmflag = false;
                    }
                } else {
                    $yanzinp.css("outline","none")//输入框的蓝色边框去掉
                    $yanzinp.css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $yanztshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $yanztshi.html("验证码不能为空");
                    _this.yanzmflag = false;
                }
            })
        }
        
        //提交的验证
        submit(){
            let _this=this;
            let $subbtn=$('.btn .sub');
            $subbtn.on("click",function(){
                if ($('.box_border #account').val() === '') {
                    $('.box_border #account').css("outline","none")//输入框的蓝色边框去掉
                    $('.active .box_border').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $('#account_warn .tshi').css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('.active .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $('#account_warn .tshi').html('手机号不能为空')
                    _this.telflag = false;
                }
                if ($('.clear .normal-input').val() === '') {
                    $('.clear .normal-input').css("outline","none")//输入框的蓝色边框去掉
                    $('.clear .box_border').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $('.clear .tshi').css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('.clear .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $('.clear .tshi').html("密码不能为空"); 
                    _this.passflag = false;
                }
                if ($('.re-clear .normal-input').val() === '') {
                    $('.re-clear .normal-input').css("outline","none")//输入框的蓝色边框去掉
                    $('.re-clear .box_border').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $('.re-clear .tshi').css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('.re-clear .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $('.re-clear .tshi').html("确认密码不能为空");
                    _this.repassflag = false;
                }
    
                if ($('#verify_display .normal-input').val() === '') {
                    $('#verify_display .normal-input').css("outline","none")//输入框的蓝色边框去掉
                    $('#verify_display .normal-input').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $('#verify_display .tshi').css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('#verify_display .tshi').html("验证码不能为空");
                    _this.yanzmflag = false;
                }
    
                if (!_this.telflag || !_this.passflag || !_this.repassflag || !_this.yanzmflag) { //阻止
                    return false;
                }
            })
        }
    }
    new regi();
})