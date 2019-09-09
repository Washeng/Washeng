$(document).ready(function(){
    class shopcar{
        constructor(){
            this.getcookie();
            this.oneselect();
            this.none();
            this.numberc();
            this.del();
        }
        //取cookie的值
        getcookie(){
            //定义增删改cookie的值
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
            //取cookie中的num数组和sid数组
            let $arrsid=obj.getcookie("cosid").split(',');
            let $arrnum=obj.getcookie("conum").split(',');
            let _this=this;
            //遍历sid数组，
            $.each($arrsid,function(index,value){
                _this.ajax(value,$arrnum[index]);
            })
        }
        //进行数据的渲染
        ajax(id,num){
            let _this=this
            $.ajax({
                url: "http://10.31.157.39:8088/js/Project2/php/index.php",
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    //遍历取到的全部数据
                    $.each(data,function(index,value){
                        if(value.sid==id){//找到全部数据的sid和cookie中取出来的sid一样的项
                            let $clonebox=$('.produce-list:hidden').clone(true,true);//把要渲染的部分克隆
                            let burl=value.burls.split(",")
                            $clonebox.find('.pi-p img').attr({"src":burl[0],"sid":id});//把图片换掉
                            $clonebox.find('.xq-pro .bt').html(value.title);//把标题改掉
                            $clonebox.find('.jiage .xianjia').html(value.newprice);
                            $clonebox.find('.jiage .danjia').html(value.oldprice);
                            $clonebox.find('.num-change .i-num').val(num)//数量
                            //计算总和：
                            let zmoney=(value.newprice*num).toFixed(2);
                            $clonebox.find('.one-allprice').html(zmoney);
                            $clonebox.css('display', 'block');
                            $('.all-select').css("display","block")
                            $clonebox.insertBefore($('.all-select')); 
                        }
                    })
                    _this.calc();
                }
            });
            
        }
        //没有商品时显示空
        none(){
            //定义增删改cookie的值
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
            if (obj.getcookie('cosid') && obj.getcookie('conum')) {
                $(".none").hide();
            }else{
                $(".none").show();
            }
            this.allselect();
        }

        //全选按钮
        allselect(){
            let _this=this
            let $allbtn=$('.all-select .anniu-quanx .checked');
            //点击全选按钮 选中除了第一个隐藏克隆原体
            $allbtn.on("click",function(){
                $allbtn.toggleClass("col")
                $allbtn.parents(".jies-produce").find(".produce-list:visible").find(".checked").toggleClass("col")
                //let btncolor=$(this).css("background");//rgb(255, 70, 78) none repeat scroll 0% 0% / auto padding-box border-box
                // if($allbtn.hasClass("col")){
                //     $allbtn.removeClass("col")
                //     //console.log($allbtn.parents(".jies-produce").find(".produce-list").not($(".produce-list")[0]).html())
                //     $allbtn.parents(".jies-produce").find(".produce-list:visible").find(".checked").removeClass("col")
                // }else{
                //     $allbtn.addClass("col")
                //     $allbtn.parents(".jies-produce").find(".produce-list:visible").find(".checked").addClass("col")
                // }
                _this.calc();
            })
            
        }
        //点击各个记录的按钮
        oneselect(){
            let _this=this
            let $allbtn=$('.all-select .anniu-quanx .checked');
            //事件委托来点击
            $('.jies-produce').on("click",".produce-list:visible .checked",function(){
                $(this).toggleClass("col")
                $(this).parents(".produce-list:visible").find(".checked").not($(this)).toggleClass("col")
                // let $tcolor=$(this).css("background");
                //if($tcolor=="rgb(255, 70, 78) none repeat scroll 0% 0% / auto padding-box border-box"){
                //     $(this).css({
                //         "background":"#fff",
                //         "border-color": "#9B9B9B"
                //     })
                //     //console.log($allbtn.parents(".jies-produce").find(".produce-list").not($(".produce-list")[0]).html())
                //     $(this).parents(".produce-list:visible").find(".checked").css({
                //         "background":"#fff",
                //         "border-color": "#9B9B9B"
                //     })
                // }else{
                //     $(this).css({
                //         "background":"#ff464e",
                //         "border-color": "#ff464e"
                //     })
                //     $(this).parents(".produce-list:visible").find(".checked").css({
                //         "background":"#ff464e",
                //         "border-color": "#ff464e"
                //     })
                // }
                // console.log(jisuan())
                // console.log(($('.produce-list:visible .col').length)/2)
                if($('.jies-produce').find('.produce-list:visible').length==($('.produce-list:visible .col').length)/2){
                    $allbtn.addClass("col")
                }else{
                    $allbtn.removeClass("col")
                }
                _this.calc();
            })
            
        }
        //点击数量的加减
        numberc(){
            let _this=this
            // $('.produce-list:visible').each(function(index,element){
            //     console.log($(element).find(".buy-good .i-num").val())
            //     if($(element).find(".buy-good .i-num").val()!=1){
            //         $(element).find(".buy-good .i-low").attr("disabled",false);
            //         $(element).find(".buy-good .i-low").css({"color":"#333"});
            //         $(element).find(".buy-good .i-low").css({"cursor":"pointer"})
            //     }else{
            //         $(element).find(".buy-good .i-low").attr("disabled",true);
            //         $(element).find(".buy-good .i-low").css({"color":"#e2e2e2"});
            //         $(element).find(".buy-good .i-low").css({"cursor":"not-allowed"})
            //     } 
            // })
            $('.jies-produce').on("click",".produce-list:visible .i-high",function(){
                $(this).prev(".i-num").val(parseInt($(this).prev(".i-num").val())+1);
                if(parseInt($(this).prev(".i-num").val())!=1){
                    // console.log($(this).prevAll(".i-low").val())
                    $(this).prevAll(".i-low").attr("disabled",false);
                    $(this).prevAll(".i-low").css({"color":"#333"});
                    $(this).prevAll(".i-low").css({"cursor":"pointer"})
                }
                //增加以后的放到数据库里
                let $removesid=$(this).parents(".b-produce").find(".pi-p img").attr("sid");
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
                //把sid数组和数据数组取出来
                let $sidarr = obj.getcookie('cosid').split(',')
                let $numarr = obj.getcookie('conum').split(',')
                //把数两数组中对应sid索引的数改成input里的数
                $numarr[$.inArray($removesid,$sidarr)]=$(this).prev(".i-num").val();
                obj.addcookie('conum',$numarr.toString(),10);

                $(this).parents(".num-change").next(".one-allprice").html(parseInt(($(this).prev(".i-num").val()))*$(this).parents(".num-change").prev(".jiage").find(".xianjia").html())
                _this.calc();
            })

            //点击减小按钮
            $('.jies-produce').on("click",".produce-list:visible .i-low",function(){
                $(this).next(".i-num").val(parseInt($(this).next(".i-num").val())-1);
                if(parseInt($(this).next(".i-num").val())==1){
                    // console.log($(this).prevAll(".i-low").val())
                    $(this).attr("disabled",true)
                    $(this).css({"color":"#e2e2e2"})
                }else{
                    $(this).css({"cursor":"pointer"})
                }

                //减少以后的放到数据库里
                let $removesid=$(this).parents(".b-produce").find(".pi-p img").attr("sid");
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
                //把sid数组和数据数组取出来
                let $sidarr = obj.getcookie('cosid').split(',')
                let $numarr = obj.getcookie('conum').split(',')
                //把数两数组中对应sid索引的数改成input里的数
                $numarr[$.inArray($removesid,$sidarr)]=$(this).next(".i-num").val();
                obj.addcookie('conum',$numarr.toString(),10);


                $(this).parents(".num-change").next(".one-allprice").html(parseInt(($(this).next(".i-num").val()))*$(this).parents(".num-change").prev(".jiage").find(".xianjia").html())
                _this.calc();
            })
        }

        //点击删除
        del(){
            let _this=this
            $('.jies-produce').on("click",".produce-list:visible .shanchu",function(){
                if(confirm("确定删除数据?")){
                    let $removesid=$(this).parents(".b-produce").find(".pi-p img").attr("sid");
                    // console.log($removesid)
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
                    let $sidarr = obj.getcookie('cosid').split(',')
                    let $numarr = obj.getcookie('conum').split(',')
                    $sidarr.splice($.inArray($removesid,$sidarr),1);
                    obj.addcookie('cosid',$sidarr.toString(),10);
                    $numarr.splice($.inArray($removesid,$sidarr),1);
                    obj.addcookie('conum',$numarr.toString(),10);
                    //删除该条记录
                    $(this).parents(".produce-list").remove();
                    _this.calc();
                }
            })
        }
        //计算总价
        calc(){
            let allprice=0;//总价
            // let allnum=0;//总的数量。
            $('.produce-list:visible').each(function(index,element){
                if($(element).find(".buy-good .gx2").hasClass("col")){
                    // console.log($(element).find('.buy-good .one-allprice').html());
                    allprice+=parseFloat($(element).find('.buy-good .one-allprice').html());
                }
            });
            $('.zong-j .jUfYqO').html('￥'+allprice.toFixed(2));
        }
    }
        
    new shopcar()
})