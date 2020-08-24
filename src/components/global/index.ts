import _Vue, { PluginObject } from 'vue';

const components: PluginObject<object> = {
  install(Vue: typeof _Vue) {
    const contexts = require.context('.', true, /(\.ts|\.tsx|\.vue)$/);
    contexts.keys().forEach(item => {
      debugger;
      const componentEntity = contexts(item).default;
      Vue.component(componentEntity.name, componentEntity);
    });
  }
};

export default components;
