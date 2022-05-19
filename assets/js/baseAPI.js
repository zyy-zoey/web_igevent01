// 注意：调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefiler 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
// 请求拦截器
$.ajaxPrefilter((option) => {
  option.url = `http://www.liulongbin.top:3007` + option.url;
});
