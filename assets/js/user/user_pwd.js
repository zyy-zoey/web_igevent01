$(function () {
  const form = layui.form;
  const layer = layui.layer;

  // 自定义验证
  form.verify({
    // 密码验证
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    // 新密码不能和旧密码相同
    samePwd: (val) => {
      if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同";
    },
    // 确认密码和新密码相同
    rePwd: (val) => {
      if (val !== $("[name=newPwd]").val()) return "两次密码不一致";
    },
  });

  // 监听form表单提交，发起ajax请求修改密码
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("修改密码失败!");
        layer.msg("修改密码失败!");
        localStorage.removeItem("token");
        window.parent.location.href = "/login.html";
      },
    });
  });
});
