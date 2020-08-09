module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      antd: 'ant-design-vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    };
  },
  chainWebpack: config => {
    const cdn = {
      css: [],
      js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.4.2/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.4/dist/antd.min.js'
      ]
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn;
      return args;
    });
  }
};
