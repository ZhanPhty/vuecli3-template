if (process.env.NODE_ENV === 'production') {
  // 为生产环境修改配置...
  console.log('%c呀！被发现了~', 'color:red; font-size: 26px;')
} else if (process.env.NODE_ENV === 'development') {
  // 为开发环境修改配置...
  console.log('%c当前开发环境', 'color:red')
} else if (process.env.NODE_ENV === 'testing') {
  // 为测试环境修改配置...
  console.log('%c当前测试环境', 'color:red')
}
