$(function() {
  getUserInfo()
  
//   点击退出按钮退出登录
  $('#btnLogout').on('click',function() {
    //   弹出窗口确认是否退出
      layer.confirm('确定退出登录',{icon:3,title:'提示'},function(index) {
        //   清空本地储存
          localStorage.removeItem('token')
        //   切换到登录页面
          location.href = '/login.html'
        //   关闭index网页
          layer.close(index)
      })
  })
})

// 获取用户·信息
function getUserInfo() {
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res);

            if(res.status !==0){
                return layer.msg('获取用户信息失败')
            }
            // layer.msg('获取用户信息失败')
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 用户名有昵称用昵称，没昵称用用户名
    var name = user.nickname || user.username 
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 头像，有图片头像有图片头像，没有的话用文字头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()

    }else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}