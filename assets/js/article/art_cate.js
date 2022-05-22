$(function () {
  const layer = layui.layer;
  const form = layui.form;
  let indexAdd = null;

  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章分类失败!");
        layer.msg("获取文章分类成功!");
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  };
  initArtCateList();

  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  // 添加分类
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("新增分类失败!");
        initArtCateList();
        layer.msg("新增分类成功!");
        layer.close(indexAdd);
      },
    });
  });

  //修改类别弹窗
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });

    //
    // console.log($(this).attr("data-id"));
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + $(this).attr("data-id"),
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章分类失败!");
        layer.msg("获取文章分类成功!");
        form.val("form-edit", res.data);
      },
    });
  });

  // 更改文章分类
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) layer.msg("更新分类数据失败！");
        layer.msg("更新分类数据成功！");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  // 删除文章分类
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    // 提示用户是否删除
    layer.confirm("确定删除吗?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg("删除文章分类失败!");
          layer.msg("删除文章分类成功!");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
