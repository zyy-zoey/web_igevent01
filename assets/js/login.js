$(function () {
  //点击切换效果
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});

// 获取 form
const form = layui.form;

// 定义表单验证规则
form.verify({
  // 定义校验密码的规则
  pwd: [/^[\S]{6,12}$/, "密码必须6-12位,且不能有空格"],
  // 定义确认密码
  repwd: (val) => {
    const pwd = $(".reg-box [name=password]").val();
    if (val !== pwd) return "两次密码不一致";
  },
});

// const baseUrl = "http://www.liulongbin.top:3007";

// 导入 layui 弹窗组件 layer
const layer = layui.layer;

// 监听注册表单提交，发送注册请求
$("#form_reg").on("submit", function (e) {
  // 阻止 form默认提交时间
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data: {
      // $('li [title=book]')　jQuery属性选择器,选中li里属性为title=book的元素;
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg("注册失败!");
      layer.msg("注册成功!");
      $("#link_login").click();
    },
  });
});

// 监听登录表单提交，发送登录请求
$("#form_login").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/api/login",
    //serialize() 方法通过序列化表单值创建 URL 编码文本字符串。
    // 可以选一个或多个表单元素（如输入和/或文本区），或表单元素本身。
    // 序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。
    data: $(this).serialize(),
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("登录失败!");
      layer.msg("登录成功!");
      localStorage.setItem("token", res.token);
      location.href = "/index.html";
    },
  });
});
