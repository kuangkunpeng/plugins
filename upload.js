/*上传图片*/
(function () {
    /*插件初始化传参*/
    var option = {
        inputFile: null, /*文件输入框选择器*/
        imgContainer: null, /*图片展示容器*/
        imgItem: null/*每张图片展示容器*/,
        submitBtn:null,/*提交按钮*/
        apiArgs:{
            url:null,
            success:null,
            error:null
        }
    };
    var baseImg;
    var file = [];
    var upload = {
        init: function (inputFile, imgContainer, imgItem,submitBtn,apiArgs) {/*初始化方法*/
            option.inputFile = inputFile;
            option.imgContainer = imgContainer;
            option.imgItem = imgItem;
            option.submitBtn = submitBtn;
            option.apiArgs = apiArgs;
            /*初始化之后显示图片*/
            this.showImg();


        },
        /*展示图片*/
        showImg: function () {
            var imgs = document.querySelector(option.inputFile);
            /*获取fileList*/
            file = [];
            for (var j = 0; j < imgs.files.length; j++) {/*保存fileList到file数组中*/
                file.push(imgs.files[j]);
            }
            this.listItem();
        },
        /*列出每张图片*/
        listItem: function () {
            var html = '';
            file.forEach(function (val, index) {/*显示每张图片*/
                var reader = new FileReader();
                reader.readAsDataURL(val);
                reader.onload = function (e) {
                    baseImg=e.target.result;
                    html += '<div class="item">\n' +
                        '            <img src="' + e.target.result + '" alt="">\n' +
                        '            <div class="delete" onclick="uploadPlugin.removeImg(' + index + ',this)">\n' +
                        '                <i class="icon iconfont icon-delete-copy"></i>\n' +
                        '            </div>\n' +
                        '        </div>';
                    document.querySelector(option.imgContainer).innerHTML = html;
                }
            });
        },
        /*删除图片*/
        removeImg: function (index, obj) {
            file.splice(index, 1);
            obj.parentNode.parentNode.removeChild(obj.parentNode);
            this.listItem();
        },
        /*上传图片*/
        submit:function () {
            console.log(baseImg)
            $.ajax({
                url:option.apiArgs.url,
                type:"POST",
                data:{
                    img:baseImg
                },
                success:option.apiArgs.success,
                error:option.apiArgs.error
            });

        }


    };
    window.uploadPlugin = upload;
})();