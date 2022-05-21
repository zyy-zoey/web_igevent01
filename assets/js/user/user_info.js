$(function () {
  const form = layui.form;
  const layer = layui.layer;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.lenght > 6) return "昵称长度必须在 1~6 个字符之间!";
    },
  });
  //  初始化用户信息
  const initUserinfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败!");
        layer.msg("获取用户信息成功!");
        // 调用 form.val() 方法为表单快速赋值
        form.val("formUserInfo", res.data);
      },
    });
  };

  initUserinfo();

  // 实现点击重置
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserinfo();
  });

  // 更新用户信息
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更改用户信息失败!");
        // layer.msg("更改用户信息成功!");
        // 调用 index.js getUserInfo 方法重新渲染头像
        window.parent.getUserInfo();
      },
    });
  });
});
