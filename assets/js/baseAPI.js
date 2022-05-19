// 注意：调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefiler 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
// 请求拦截器
// 语法 ： $.ajaxPrefilter( [ dataType ,] handler )
//dataType : 一个或多个用空格隔开的数据类型所组成的字符串。
//handler--用于预处理参数选项的回调函数。它有以下3个参数：
// options：(Object对象)当前AJAX请求的所有参数选项。
$.ajaxPrefiler((option) => {
  option.url = `http://www.liulongbin.top:3007` + option.url;
});
