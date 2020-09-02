$(function() {
    // $('#link_reg').on('click',function() {
    //     $('.login-box').hide()
    //     $('.reg-box').show()
    // })
    // 点击去注册标签，去往注册页
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登陆标签去往登录页
    $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    
    var form = layui.form
    var layer = layui.layer
    // 设置密码框限制条件的正则表达式
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能包含空格'],
        // 两次密码要一致
        repwd: function(value) {
           var pwd = $('.reg-box [name=password]').val()
           if(pwd != value) {
               return '两次密码不一致'
           }
        }
    })

    // 注册用户页
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 点击提交按钮将信息提交
        $.post('/api/reguser',data,function(res) {
            console.log(res);
            if(res.status !==0){
                // return layer.msg(res.message)
                return layer.msg(res.message)
            }
            layer.msg('注册成功。1请登录')

            $('#link_login').click()
        })
    })

    $('#form_login').on('submit',function(e) {
        e.preventDefault()

        $.ajax({
            url:'/api/login',
            type:'post',
            data: $(this).serialize(),
            success(res) {
                console.log(res);
                if(res.status !==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})