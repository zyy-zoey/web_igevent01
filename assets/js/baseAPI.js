// 注意：调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefiler 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
// 请求拦截器
$.ajaxPrefilter((options) => {
  options.url = `http://www.liulongbin.top:3007` + options.url;
  // 再请求之前给有权限的接口注入 token
  // console.log(options.url.includes("/my/"));
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }

  // 统一处理权限问题
  options.complete = (res) => {
    // console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 清空
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});
