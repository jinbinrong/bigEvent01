$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义查询的参数对象，在请求数据的时候将参数对象提交到服务器
    var q = {
        pagenum:1,//页码值，默认请求第一页的数据
        pagesize:2,//每页显示几条数据，默认每页显示两条
        cate_id:'',//文章分类的id
        state:''//文章的发布状态
    }
    
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate())
        var mm = padZero(dt.getMinutes())
        var h = padZero(dt.getHours())
        var s = padZero(dt.getSeconds())

        return y+'-'+m+'-'+d+' '+h+':'+mm+":"+s
    }

    function padZero(n) {
        return n > 9 ? n : '0'+n
    }

    initTable()
    initCate()
    // 定义获取文章数据列表的方法
    function initTable() {
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success(res) {
                if(res.status !==0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }
    
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success(res) {
                if(res.status !==0) {
                    return layer.msg('获取分类数据失败')
                }
                var htmlStr = template('tpl-cate',res)
                console.log(res);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        console.log(cate_id);
        console.log(state);
        console.log(111);
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    
    // 定义渲染分页的方法
    function renderPage(total) {
        console.log(total);
        laypage.render({
            elem:'pageBox',//分页容器的id
            count:total,//总数据条数
            limit:q.pagesize,//每页几条数据
            curr:q.pagenum,//默认第几页
            // 分页内容及顺序
            layout:['count','limit','prev','page','next','skip'],
            // 每页条数的选项
            limits:[1,2,3,4],
            // jump有两种触发方式，程序调用，或者点击调用
            jump: function(obj,first) {
                // first表示触发方式，程序调用时first为true，认为点击触发时为undefined/false。
                console.log(obj.curr);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if(!first) {
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete')
        layer.confirm('确认删除',{icon:3,title:'提示'},function(index) {
            $.ajax({
                method:'get',
                url:'/my/article/cates/'+id,
                success(res) {
                    if(res.status !==0) {
                        return layer.msg('删除文章失败')
                    }

                    layer.msg('删除文章成功')
                    if(len===1 && q.pagenum !==1){
                        q.pagenum -=1
                    }
                    initTable()
                }

            })
            layer.close(index)
        })
    })
})