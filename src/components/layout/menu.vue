<template>
  <div>
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">
        <a-icon type="user"/>
        <span class="nav-text">首页</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  openKeys = ['sub1'];

  onOpenChange = (openKeys = []) => {
    const latestOpenKey = (openKeys as string[]).find(
      key => this.openKeys.indexOf(key) === -1
    );
    if (!latestOpenKey) {
      return;
    }
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys;
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  };
}
</script>
