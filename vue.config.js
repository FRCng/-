module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/main.scss";`,
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 以设计稿750为例， 750 / 10 = 75
            // remUnit: 75,
            rootValue: 37.5,
            propList: ['*'],
          }),
        ],
      },
    },
  },
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    proxy: {
      '/app': {
        target: 'http://ttapi.research.itcast.cn/app',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/app': '',
        },
      },
      [process.env.VUE_APP_SHOP]: {
        //美丽说
        target: process.env.VUE_API_DEV_TARGET, //api服务器地址
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_SHOP}`]: '',
        },
      },
    },
  },
};
