import path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      antd: 'ant-design-vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      lodash: '_',
      axios: 'axios'
    };
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src'));

    // 配置cdn 在html中通过htmlWebpackPlugin.options.cdn访问
    const cdn = {
      css: [
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.4/dist/antd.min.css'
      ],
      js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.4.2/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
        'https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js',
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.4/dist/antd.min.js'
      ]
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn

      args[0].cdn = cdn;
      return args;
    });

    // 查看打包文件体积大小
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  }
};
