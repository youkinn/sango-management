<!--
 * @Description: 左侧菜单
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-17 20:40:38
-->
<template>
  <div>
    <a-menu theme="dark" mode="inline" :default-selected-keys="['home']" @click="handleClicked">
      <a-menu-item key="home">
        <a-icon type="user" />
        <router-link to="/" tag="span">首页</router-link>
      </a-menu-item>
      <a-sub-menu key="base">
        <span slot="title"><a-icon type="team" /><span>基础信息</span></span>
        <a-menu-item key="1">
          <router-link to="/base/dictionary" tag="span">字典管理</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Menu } from 'ant-design-vue';

@Component({
  components: {
    AMenu: Menu
  }
})
export default class Menu1 extends Vue {
  rootSubmenuKeys = ['home', 'base'];
  openKeys = ['home'];

  handleClicked = ({ item = {}, key = '', keyPath = '' }) => {
    console.log(item, key, keyPath);
  };
}
</script>
