$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname(value) {
            if (value.length > 6) {
                return '昵称必须在3-6个字符之间！'
            }
        }
    })

    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(66);
                // console.log(res);
                // 调用form。val为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if(res.status !==0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                window.parent.getUserInfo()
            }
        })
    })

})