
// 首页header部分
$(document).ready(function(){
    class header{
        constructor(){
            this.banner();
            this.fixedtop();
            this.updata();
            this.djs();
        }
        // header轮播图效果
        banner(){
            let $pic=$('.banner ul li');
            let $btn=$('.banner ol li');
            let $right=$('#right');
            let $left=$('#left');
            let $banner=$('.banner')
            let $index=0;
            let timer=null;

            //鼠标移入，左右箭头出现
            $banner.hover(function(){
                $left.show();
                $right.show()
            },function(){
                $left.hide();
                $right.hide()
            })

            //小按钮的事件
            $btn.on('mouseover',function(){
                $index=$(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $pic.css('opacity','0')
                $pic.eq($(this).index()).animate({
                    opacity:1
                });
            })

            //给左箭头按钮添加点击事件
            $left.on('click',function(){
                $index--;
                if($index<0){
                    $index=$pic.length-1;
                }
                $btn.eq($index).addClass('active').siblings().removeClass('active');
                $pic.css('opacity','0');
                $pic.eq($index).animate({
                    opacity:1
                })
            })

            //给右箭头添加点击事件
            $right.on('click',function (){
                $index++;
                if($index>$pic.length-1){
                    $index=0;
                }
                $btn.eq($index).addClass('active').siblings().removeClass('active');
                $pic.css('opacity','0');
                $pic.eq($index).animate({
                    opacity:1
                })
            })
            

            //开启定时器，执行图片向右移动的函数
            timer=setInterval(function(){
                $index++;
                if($index>$pic.length-1){
                    $index=0;
                }
                $btn.eq($index).addClass('active').siblings().removeClass('active');
                $pic.css('opacity','0');
                $pic.eq($index).animate({
                    opacity:1
                })
            },2500)
            
            $banner.hover(function(){
                clearInterval(timer)
            },function(){
                timer=setInterval(function(){
                    $index++;
                    if($index>$pic.length-1){
                        $index=0;
                    }
                    $btn.eq($index).addClass('active').siblings().removeClass('active');
                    $pic.css('opacity','0');
                    $pic.eq($index).animate({
                        opacity:1
                    })
                },2500)
            })
        }
        //鼠标移到中部上面导航栏下来
        fixedtop(){
            $(window).on('scroll',function(){
                let $top=$(window).scrollTop();//滚动条的top值
                if($top>=800){
                    $('.fixed-topnav').stop(true).css({
                        top:0
                    });
                }else{
                    $('.fixed-topnav').stop(true).css({
                        top:-50
                    });
                }
            });
        }
        //主体部分数据的渲染
        updata(){
            let $goodsul=$('.main .goods-list ul');
            $.ajax({
                url: 'http://10.31.157.39:8088/js/Project2/php/',
                dataType: 'json'
            }).done(function (data) {
                // console.log(data)
                let $strhtml='';
                $.each(data,function(index,value){
                    $strhtml+=`
                    <li>
                        <!-- 商品的图片 -->
                        <div class="good-pic">
                            <a href="detail.html?sid=${value.sid}" target="_blank"><img src="${value.picurl}" alt=""></a>
                        </div>
                        <!-- 商品的价格 -->
                        <div class="good-price">
                            <span class="current-price">
                                <i>￥</i><em>${value.newprice}</em>
                            </span>
                        <span class="old-price">
                            <i>￥</i><em>${value.oldprice}</em>
                        </span>
                        </div>
                        <!-- 商品的标题 -->
                        <h3>
                        <a href="detail.html?sid=${value.sid}" target="_blank">${value.title}</a>
                        <span>上新</span>
                        </h3>
                        <!-- 悬停的收藏小爱心 -->
                        <a href="" id="love-code">
                        <i></i>
                        </a>
                    </li>
                    `;
                });
        
                $goodsul.html($strhtml);
            });
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
                $(".brand-list").find('.brand-times').each(function(index,element){
                    $(element).find("span").eq(1).find("em").html($day)
                    $(element).find("span").eq(2).find("em").html($hour)
                    $(element).find("span").eq(3).find("em").html($min)
                    $(element).find("span").eq(4).find("em").html($sec)
                })
            },1000);
        }
    }
    new header(); 
})