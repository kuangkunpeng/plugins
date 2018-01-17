/*下拉刷新*/
(function () {
    window.pullDown={
        /*初始化传参（拖动元素选择器，load元素选择器，回掉函数）*/
        init:function (selector,loadSelector,callBack) {
            var ele = document.querySelector(selector);
            var lenY;
            var startY;
            var moveY;
            ele.addEventListener('touchstart',function (e) {
                startY=e.changedTouches[0].clientY;
            })
            ele.addEventListener('touchmove',function (e) {
                moveY=e.changedTouches[0].clientY;
                lenY=moveY- startY;
                if(lenY>220){
                    lenY=220;
                }
                document.querySelector(loadSelector).style.height= lenY+'px' ;
                document.querySelector(loadSelector).style.fontSize= 0.4+'rem' ;
            })
            ele.addEventListener('touchend',function (e) {
                callBack();
                document.querySelector(loadSelector).style.height= 0+'px' ;
                document.querySelector(loadSelector).style.fontSize= 0+'rem' ;
                document.querySelector(loadSelector).style.transition= 'all .5s ease-in .1s '
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop=0;
            })
        }
    }
})();