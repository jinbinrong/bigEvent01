
// 该方法在发送请求之前执行
// 可以获取发送请求的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    
    // 如果访问接口中有my字段，在本地存储中添加token
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    
    // 当请求结束后，判断用户设置访问权限
    options.complete = function(res) {
        if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})