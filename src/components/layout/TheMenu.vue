<!--
 * @Description: 左侧菜单
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-10-01 15:45:30
-->
<template>
  <div>
    <a-menu :openKeys="openKeys" v-model="selectedKeys" mode="inline" theme="dark">
      <template v-for="item in data">
        <a-menu-item
          v-if="!item.children"
          :key="item.id"
          @click="onMenuItemClicked(item.key, item.path)"
        >
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="item.id" @titleClick="onTitleClick">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </span>
          <a-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="onMenuItemClicked(subItem.id, subItem.path)"
          >
            <span>{{ subItem.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/** 菜单项 */
export interface MenuItem {
  /** 唯一标识 */
  id: string;
  /** 菜单小图标 */
  icon?: string;
  /** 菜单名称 */
  title: string;
  /** 对应的路由路径 */
  path?: string;
  /** 子菜单 */
  children?: MenuItem[];
  /** 父菜单id */
  parentId: string;
}

/** 左侧菜单 */
@Component
export default class TheMenu extends Vue {
  /** 菜单项列表 */
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  })
  data!: MenuItem[];

  /** 初始展开的SubMenu菜单项key数组 */
  openKeys = [this.data[0].id];

  /** 初始选中的菜单项 key 数组 */
  selectedKeys = this.data[0].children ? [this.data[0].children[0].id] : [];

  mounted() {
    this.initMenu();
  }

  /** 初始化菜单项目 */
  initMenu() {
    let menu: MenuItem | undefined;
    this.data.some(item => {
      menu = this.find(item, location.pathname);
      if (menu) {
        return true;
      }
    });
    if (!menu) {
      menu = this.data[0];
    }
    this.openKeys = +menu.parentId ? [menu.parentId] : [];
    this.selectedKeys = [menu.id];
  }

  /** 根据路径查找活动菜单 */
  find(item: MenuItem, path: string): MenuItem | undefined {
    if (item.path === path) {
      return item;
    }
    const children = item.children;
    if (children && children.length > 0) {
      for (let i = 0, j = children.length; i < j; i++) {
        const result = this.find(children[i], path);
        if (!result) {
          continue;
        }
        return result;
      }
    }
  }

  /** 点击子菜单标题 */
  onTitleClick({ key }: { key: string }) {
    const index = this.openKeys.indexOf(key);
    index === -1 ? (this.openKeys = [key]) : this.openKeys.splice(index, 1);
  }

  /** 点击MenuItem */
  onMenuItemClicked(key: string, toPath: string) {
    this.selectedKeys = [key];
    const currentPath = this.$route.path;
    if (toPath && toPath !== currentPath) {
      this.$router.push(toPath);
    }
  }
}
</script>
