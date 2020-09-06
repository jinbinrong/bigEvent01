$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    
    // 当上传文件文本框状态改变时触发
    $('#file').on('change',function(e) {
        // 获取文件列表伪数组
        console.dir(e.target.files);
        var filelist = e.target.files
        // 如果数组长度为0
        if(filelist.length === 0){
            return layer.msg('请选择照片')
        } 
        // 获取伪数组里的第一个文件 
        var file = e.target.files[0]
        // 获取文件的路径
        console.log(e.target.files);
        var imgURL = URL.createObjectURL(file)
        // 销毁旧的裁减区域，重新设置图片路径，重新初始化裁剪区域
        $image.cropper('destroy').attr('src',imgURL).cropper(options)
    })

    $('#btnUpload').on('click',function() {
        var dataURL = $image.cropper('getCroppedCanvas',{
             // 创建一个 Canvas 画布
        width: 100,
        height: 100
        }).toDataURL('image/png')

        $.ajax({
            method:'post',
            url:'/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success(res) {
                if(res.status !==0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                parent.getUserInfo()
            }
        })
    })
})