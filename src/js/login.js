$(document).ready(function(){
    class login{
        constructor(){
            this.telphone();
            this.password();
            this.randomnum();
            this.init();
            this.yanzm();
            this.submit();
            this.telflag=null;
            this.passflag=null;
            this.yanzmflag=null;
        }
        init(){
            let $input=$('.normal-input');
            $input.on('focus',function(){
                $input.css({"outline":"none"})
            })
        }
        // 手机号的验证
        telphone(){
            let _this=this;
            let $telinp=$('.box_border #account');
            let $teltshi=$('#account_warn .tshi');
            // 获得焦点
            $telinp.on('focus',function(){
                $telinp.attr("placeholder","")
                $telinp.css("outline","none")
                $('.active .box_border').css("border","1px solid #666")
                $teltshi.css({"display":"block","color":"#666"});
                $('.active .error-box strong').css("display","none");
                $teltshi.html('请输入手机号')
            })
            //失去焦点验证
            $telinp.on('blur',function(){
                if($telinp.val()==''){
                    $telinp.css("outline","none")//输入框的蓝色边框去掉
                    $('.active .box_border').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $teltshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    //$('.active .error-box strong').css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $teltshi.html('手机号不能为空')
                    _this.telflag = false;
                }else{
                    //$('.active .error-box strong').css({"display":"inline-block","background-position":"-40px -19px"})
                    $teltshi.css({"display":"none"});//提示文本消失
                    _this.telflag = true;
                }
            })
        }

        //密码的验证
        password(){
            let _this=this;
            let $passinp=$('.clear .normal-input');
            let $passtshi=$('.clear .tshi');
            //let $passicon=$('.clear .error-box strong');
            let $passborder=$('.clear .box_border');
            //let $regbox=$('.clear .grade');
            $passinp.on('focus',function(){
                $passinp.attr("placeholder","")
                $passinp.css("outline","none")
                $passborder.css("border","1px solid #666")
                $passtshi.css({"display":"block","color":"#666"});
                //$passicon.css("display","none");
                $passtshi.html('请输入密码')
            })
            //失去焦点时
            $passinp.on("blur",function(){
                if ($(this).val() !== '') { //不为空
                    //$passicon.css({"display":"inline-block","background-position":"-40px -19px"})
                    $passtshi.css({"display":"none"});//提示文本消失
                    _this.passflag = true;
                } else {
                    $passinp.css("outline","none")//输入框的蓝色边框去掉
                    $passborder.css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $passtshi.css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    //$passicon.css({"display":"inline-block","background-position":"0 -19px;"})//提示图标x
                    $passtshi.html("密码不能为空"); 
                    _this.passflag = false;
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
                if ($('#verify_display .normal-input').val() === '') {
                    $('#verify_display .normal-input').css("outline","none")//输入框的蓝色边框去掉
                    $('#verify_display .normal-input').css("border","1px solid #ff464e")//输入框的边框颜色变红
                    $('#verify_display .tshi').css({"display":"block","color":"#ff464e"});//提示文本出现，颜色为红
                    $('#verify_display .tshi').html("验证码不能为空");
                    _this.yanzmflag = false;
                }
    
                if (!_this.telflag || !_this.passflag ||  !_this.yanzmflag) { //阻止
                    return false;
                }else{
                    $.ajax({
                        type: "post",
                        url: "http://10.31.157.39:8088/js/Project2/php/login.php",
                        data: {
                            $tel:$('.box_border #account').val(),
                            $password:$('.clear .normal-input').val()
                        },
                        success: function (data) {
                            if(!data){
                                alert('用户名和密码错误');
                            }else{
                                location.href='http://10.31.157.39:8088/js/Project2/dist/html/index.html';
                                localStorage.setItem('customname',$('.box_border #account').val());
                            }
                        }
                    });
                }
            })
        }
    }
    new login().init()
})