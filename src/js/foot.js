$(document).ready(function(){
    class foot{
        constructor(){
            this.linkslist();
            this.asidemove();
        }
        // 底部的友情链接ul上滑
        linkslist(){
            let $linkul=$('.links .links-list');
            let $linkli=$('.links .links-listbox');
            let $ultimer=null;
            $ultimer=setInterval(function(){
                $linkul.animate({marginTop:-20+'px'},500,function(){
                    $linkul.css({"marginTop":"0px"}).find("li:first").appendTo($linkul);
                })
            },3000);

            $linkli.hover(function(){
                clearInterval($ultimer);
            },function(){
                $ultimer=setInterval(function(){
                    $linkul.animate({marginTop:-20+'px'},500,function(){
                        $linkul.css({"marginTop":"0px"}).find("li:first").appendTo($linkul);
                    })
                },3000)
            })
        }
        //侧边栏导航栏
        asidemove(){
            let $asidecode=$('.aside .links-icon');
            $asidecode.hover(function(){
                $(this).next(".tab-tips").css({"right":62+'px'})
                $(this).next(".tab-tips").css({"display":"block"}).animate({right:36+'px'})
            },function(){
                $(this).next(".tab-tips").css({"display":"none",right:62+'px'})
            })
            // $('.tab-tips').css({right:62+'px'})
            // 回到顶部
            $('.aside-backtop .links-backtop').on('click',function(){
                $('html').animate({"scrollTop":"0"},500)
            })
        }
    }
    new foot();
})
