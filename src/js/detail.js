$(document).ready(function(){
    class detail{
        constructor(){
            this.share();
            this.goodsend();
            this.goodnav();
            this.protect();
            this.goodnavmove();
            this.getdata();
            this.numchange();
            this.addshopcar();
            this.scale();
            this.djs();
        }
        //分享
        share(){
            let $btn=$('.share-box .txt');
            let $sharebox=$('.share-box .share');
            $btn.hover(function(){
                $sharebox.css({"display":"block"})
            },function(){
                $sharebox.css({"display":"none"})
            })
        }
        // 配送的城市选择
        goodsend(){
            let $sendbtn=$('.address .address_selector');
            let $citybox=$('.address .city');
            let $citya=$('.city a')
            $sendbtn.on('click',function(e){
                var ev=ev||window.event;
                $citybox.show();
                
                e.stopPropagation();
            });
            $(document).on('click',function(e){
                $citybox.hide();
            })
            $citya.on('click',function(){
                $('.js-address').html($(this).html())
            })
        }
        //鼠标滑倒商品详情时二级导航出现
        goodnav(){
            let $slidebox=$('.slide-box');
            let $fixednav=$('.fixed-detailnav');
            $(window).on('scroll',function(){
               if($('html').scrollTop()>=700){
                   $slidebox.css({"display":"none"});
                   $fixednav.css({"display":"block"})
               }else{
                    $slidebox.css({"display":"block"});
                    $fixednav.css({"display":"none"})
               }
            })
        }
        //鼠标滑动商品详情时的楼梯效果
        goodnavmove(){
            let $navbtn=$('.fixed-detailnav .f1 li a');
            let $louceng=$('.pic-goodinfo .tab-show-section');
            let $navli=$('.fixed-detailnav .f1 li')
            $navbtn.on('click',function(){
                $(this).css({"borderBottom": "#ff464e solid 2px","color": "#ff464e"}).parents('li').siblings().find('a').css({"borderBottom": 0,"color": "#666"});
                let $cengtop=$louceng.eq($(this).parents("li").index()).offset().top;
                $('html').animate({
                    scrollTop:$cengtop-300
                 });
            })
            $(window).on('scroll',function(){
                let $topvalue=$(this).scrollTop();
                $louceng.each(function(index,element){
                    let $loucengtop=$(element).offset().top-600;//每个楼层的top值。
                    if($loucengtop>$topvalue){//楼层的top值>滚动条的top
                        $navli.eq(index-1).find("a").css({"borderBottom": "#ff464e solid 2px","color": "#ff464e"})//给满足条件的第一个添加类。
                        $navli.eq(index-1).siblings().find("a").css({"borderBottom": 0,"color": "#666"})
                        return false;
                    }
                    if($topvalue>=5750){
                        $navli.eq(3).find("a").css({"borderBottom": "#ff464e solid 2px","color": "#ff464e"})
                        $navli.eq(3).siblings().find("a").css({"borderBottom": 0,"color": "#666"})
                    }else{
                        $navli.eq(3).css({"borderBottom": 0,"color": "#666"})
                    }
                });
            })
        }
        //渲染
        getdata(){
            let $goodtitle=$('.place-explain .goodtitle');
            let $h2=$('.goods-show .good-wrap h2');
            let $oldprice=$('.sector-info .js-oprice');
            let $newprice=$('.sector-info .js-cprice');
            let $spicul=$('.left-pic .goods-li');//小图的li是渲染的，取ul事件委托
            let $bpic=$('.detailpic-box .pic img');//大图
            let $sid = location.search.substring(1).split('=')[1];
            $.ajax({
                url: 'http://10.31.157.39:8088/process2/Project2/php/detailgetdata.php',
                dataType: 'json',
                data:{
                    sid:$sid
                }
            }).done(function (data) {
                //小图片的链接
                let $spicurl=data.urls.split(',');
                //大图的链接
                let $bpicurl=data.burls.split(',');
                $goodtitle.html(data.title);
                $h2.html(data.title);
                $oldprice.html(data.oldprice);
                $newprice.html(data.newprice);
                let $htmlstr = ''
                $.each($spicurl, function (index, value) {
                    $htmlstr += `
                        <li>
                            <img src="${value}"/>
                        </li>
                    `;
                });
                $(".left-pic .goods-li").html($htmlstr);
                $('.detailpic-box .pic img').attr({"src":$bpicurl[0],"sid":data.sid});
                //事件委托
                $spicul.on('mouseover','li',function(){
                    $(this).css({"border":"1px solid #333"})
                    $bpic.attr({"src":$bpicurl[$(this).index()]})
                    $('.bf .bpic').attr("src",$bpicurl[$(this).index()])
                })
                $spicul.on('mouseout','li',function(){
                    $(this).css({"border":0})
                })
            })
        }
        //放大镜效果
        scale(){
            let $spic=$('.detailpic-box .pic')
            let $sf=$('.detailpic-box .sf')
            let $bf=$('.detailpic-box .bf')
            let $bpic=$('.detailpic-box .bpic');
            //求小放的尺寸
            $sf.css({
                width: $spic.width() * $bf.width() / $bpic.width(),
                height: $spic.height() * $bf.height() / $bpic.height(),
            });
            //求比例
            let $bili = $bpic.width() / $spic.width();
            $spic.hover(function(){
                $bpic.attr("src",$spic.find('img').attr("src"))
                $sf.css("display","block");
                $bf.css("display","block");
                $spic.on("mousemove",function(ev){
                    let l = ev.pageX - $spic.offset().left - $sf.width() / 2;
                    let t = ev.pageY - $spic.offset().top - $sf.height() / 2;
                    if (l < 0) {
                        l = 0;
                    } else if (l >= $spic.width() - $sf.width()) {
                        l = $spic.width() - $sf.width();
                    }
                    if (t < 0) {
                        t = 0;
                    } else if (t >= $spic.height() - $sf.height()) {
                        t = $spic.height() - $sf.height();
                    }
        
                    $sf.css({
                        "left": l,
                        "top": t
                    });
        
                    $bpic.css({
                        "left": -l * $bili,
                        "top": -t * $bili
                    })
                })
            },function(){
                $sf.css("display","none");
                $bf.css("display","none");
            })
        }

        //倒计时效果
        djs(){
            setInterval(function(){
                let futureTime = new Date('2019,9,12 18:00:00'); //未来时间
                let nowTime = new Date(); //当前时间

                let time =parseInt( (futureTime - nowTime) / 1000 ); //秒
                let $day = parseInt(time / 86400);
                let $hour = parseInt(time % 86400 / 3600);
                let $min = parseInt(time % 3600 / 60);
                let $sec = time % 60;
                    $(".djs").find("span").find("#d").html($day)
                    $(".djs").find("span").find("#h").html($hour)
                    $(".djs").find("span").find("#m").html($min)
                    $(".djs").find("span").find("#s").html($sec)
            },1000);
        }
        //商品选择的数量加减
        numchange(){
            let $lownum=$('.number .decrease');
            let $inpu=$('.number p .c-num');
            let $addnum=$('.number .increase');
            $lownum.attr("disabled",true);
            $addnum.on('click',function(){
                $inpu.val(parseInt($inpu.val())+1);
                if(parseInt($inpu.val())!=1){
                    $lownum.attr("disabled",false);
                    $lownum.css({"color":"#333"})
                }
            })
            $lownum.css("cursor","pointer")
            $addnum.on('focus',function(){$addnum.css("outline","none")})
            $lownum.on('focus',function(){$lownum.css("outline","none")})
            $lownum.on('click',function(){
                $inpu.val(parseInt($inpu.val())-1);
                if(parseInt($inpu.val())===1){
                    $lownum.attr("disabled",true)
                    $lownum.css({"color":"#e2e2e2"})
                }
            })

        }

        //点击添加购物车
        addshopcar(){
            //引入增加 删除cookie的函数
            let obj = {
                addcookie: function (key, value, day) {
                    let date = new Date();
                    date.setDate(date.getDate() + day);
                    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
                },
                getcookie: function (key) {
                    let arr = decodeURIComponent(document.cookie).split('; ');
                    for (let value of arr) {
                        let newarr = value.split('=');
                        if (key === newarr[0]) {
                            return newarr[1];
                        }
                    }
                },
                delcookie: function (key) {
                    addcookie(key, '', -1);
                }
            }
            //定义空的sid数组和num数组
            let $sidarr=[];
            let $numarr=[];
            let $addbtn=$('.submit-go .btn');//提交按钮
            let $nnum=$('.number .c-num');//输入框内的数量
            function get(){
                if (obj.getcookie('cosid') && obj.getcookie('conum')) {
                    $sidarr = obj.getcookie('cosid').split(',')
                    $numarr = obj.getcookie('conum').split(',')
                }
            }
            //点击加入购物车
            $addbtn.on('click',function(){
                //找存在img中的本页面商品的sid
                let $nowsid=$(this).parents('.goods-show').find('.pic img').attr('sid')
                get();
                if($.inArray($nowsid,$sidarr)!=-1){//不是第一次提交
                    let $gainum=parseInt($numarr[$.inArray($nowsid,$sidarr)])+parseInt($nnum.val());//把原先的值加输入框新加的值
                    $numarr[$.inArray($nowsid,$sidarr)]=$gainum;//把新的值存入数组
                    obj.addcookie("conum",$numarr.toString(),10);//把新的数组存入cookie
                    $('.cartnum').html($gainum);
                    $('#goods-num').html($gainum)
                }else{
                    $sidarr.push($nowsid);
                    obj.addcookie('cosid',$sidarr.toString(),10);
                    $numarr.push($nnum.val());
                    obj.addcookie('conum',$numarr.toString(),10)
                    $('.cartnum').html($nnum.val())
                    $('#goods-num').html($nnum.val())
                }
            })
        }

        //底部消费保障的tab切换效果
        protect(){
            let $protectcpc=$('.cp01 span')
            let $protectcbox=$('.cp02 .cp-con')
            $protectcpc.on('click',function(){
                $(this).parents('li').addClass('active');
                $(this).parents('li').siblings().removeClass('active');
                $protectcbox.eq($(this).parents('li').index()).css({"display":"block"}).siblings().css({"display":"none"});
            })
        }
    }
    new detail();
})