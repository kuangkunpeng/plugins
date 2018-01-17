/*下拉分页*/
(function (window) {
    /*默认参数*/
    var opt={
        listenDom:".list",                      /*列表容器选择器*/
        requestUrl:null,                        /*接口url*/
        data:{                                    /*ajax 请求参数*/
            currentPage:1,                       /*当前页数默认1*/
            pageSize:10                           /*每次请求获取条数*/
        },
        success:null,                           /*成功回掉*/
        error:null                                /*失败回掉*/
    };
    window.pushPager={
        init:function (option) {
            if(!option){                            /*如果不传参*/
                option=opt;
            }
            else{                                  /*如果传参但是不全*/
                if(!option.listenDom){
                    option.listenDom='.list';
                }
                if(!option.requestUrl){
                    option.requestUrl=null;
                }
                if(!option.data){
                    option.data=
                        {
                            currentPage:1,
                            pageSize:10
                        };
                }
                if(!option.success){
                    option.success=null;
                }
                if(!option.error){
                    option.error=null;
                }
            }
            pushPager.request(option);      /*页面加载先请求*/
            var listObj = document.querySelector(option.listenDom);
            window.addEventListener('scroll',function (e) {/*滚动监听*/
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                if(scrollTop+clientHeight ===scrollHeight){/*当滚动条到底后请求数据*/
                    option.data.currentPage++;
                    pushPager.request(option);
                }
            })
        },
        request:function (option) {/*ajax*/
            $.ajax({
                url:option.requestUrl,
                data:option.data,
                success:option.success,
                error:option.error
            })
        }

    }
})(this);