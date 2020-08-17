<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <Breadcrumb class="breadcrumb"></Breadcrumb>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Menu from '@/components/layout/menu.vue';
import Breadcrumb from '@/components/layout/breadcrumb.vue';

@Component({
  name: 'Home',
  components: {
    Menu,
    Breadcrumb
  }
})
export default class App extends Vue {
  collapsed = false;
}
</script>
<style>
#components-layout-demo-custom-trigger {
  min-height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.breadcrumb {
  margin-bottom: 20px;
}
</style>
