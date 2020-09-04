$(function() {
    var form = layui.form

    form.verify({
       pwd: [/^\S{6,16}$/,'密码必须6到16位'],
       
       samePed: function(value) {
           if(value === $('[name=oldPwd]').val()){
               return '新旧密码不能一致'
           }
       },

       rePwd: function(value) {
           if(value !== $('[name=newPwd]').val()) {
               return '两次密码必须一致'
           }
       }
    })

    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if(res.status !== 0){
                    return layer.msg('更新密码失败')
                }

                layer.msg('更新密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})