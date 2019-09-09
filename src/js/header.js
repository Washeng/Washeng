$(document).ready(function(){
    class header{
        constructor(){
            this.$cartpage=$('.right-show #cart-page');//最顶部的购物袋
            this.$carta=$('.right-show #cart-page a');
            this.headcartpage();
        }
        // 最顶部的购物袋的下拉
        headcartpage(){
            let _this=this
            this.$cartpage.hover(function(){
                $(this).addClass('hover');
                $(this).find(_this.$carta).css('color','#333')
            },function(){
                $(this).removeClass('hover');
            })
        }
    }
    new header()
})