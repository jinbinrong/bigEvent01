$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success: function(res) {
                // console.log(639);
                var htmlStr = template('tpl-table',res)
                console.log(res);
                $('tbody').html(htmlStr)
            }
        })
    }
    
    // 给添加分类按钮添加事件
    var indexAdd = null;
    $('#btnAddCate').on('click',function() {
        indexAdd= layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    
    // 给#form-add添加提交事件
    $('body').on('submit','#form-add',function(e) {
         e.preventDefault()
         
        //  获取请求数据，并将其添加到表单里
         $.ajax({
             method:'post',
             url:'/my/article/addcates',
             data: $(this).serialize(),
             success(res) {
                 if(res.status !==0) {
                     return layer.msg('新增分类失败')
                 }

                 initArtCateList()
                 layer.msg('新增分类成功')

                 layer.close(indexAdd)
             }
         })
    })
    
    // 给编辑按钮添加事件
    var indexEdit = null;
    $('tbody').on('click','.btn-edit',function() {
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content:$('#dialog-edit').html()
        }) 
        
        var id = $(this).attr('data-id')
        // 修改以后赋值给
        $.ajax({
            method:'get',
            url:'/my/article/cates/'+id,
            success(res) {
                console.log(res);
                form.val('form-edit',res.data)
            }
        })
        
    })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })
    
    // 给删除按钮添加事件
    $('tbody').on('click','.btn-delect',function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？',{icon:3,title:'提示'},function() {
        //    发起请求对服务器相应数据进行删除
            $.ajax({
               method:'get',
               url:'/my/article/deletecate/'+id,
               success(res) {
                   if(res.status !==0) {
                      return layer.msg('删除分类失败')
                   }
                   layer.msg('删除分类成功')

                   initArtCateList()
               }
           })
        })
    })

})