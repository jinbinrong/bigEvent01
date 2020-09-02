
// 该方法在发送请求之前执行
// 可以获取发送请求的url地址
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net'+options.url
})