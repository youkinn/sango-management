<!--
 * @Description: 左侧菜单
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:41:36
-->
<template>
  <div>
    <a-menu theme="dark" mode="inline" :default-selected-keys="['home']" @click="handleClicked">
      <a-menu-item key="home">
        <a-icon type="user" />
        <span>首页</span>
      </a-menu-item>
      <a-sub-menu key="base">
        <span slot="title"><a-icon type="team" /><span>基础信息</span></span>
        <a-menu-item key="dictionary/directory">
          <span>字典管理</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Menu } from 'ant-design-vue';

/** 左侧菜单 */
@Component({
  components: {
    AMenu: Menu,
  },
})
export default class Menu1 extends Vue {
  rootSubmenuKeys = ['home', 'base'];
  openKeys = ['home'];

  handleClicked = ({ keyPath = [] }) => {
    let toPath = '';
    const currentPath = this.$route.path;
    const [routeName, moduleName] = keyPath;
    if (moduleName && routeName) {
      toPath = `/${moduleName}/${routeName}`;
    } else if (routeName) {
      toPath = `/${routeName}`;
    }
    if (toPath && toPath !== currentPath) {
      this.$router.push(toPath);
    }
  };
}
</script>
