<!--
 * @Description: 面包屑
 * @Autor: 胡椒
 * @Date: 2020-08-17 10:33:13
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:41:26
-->
<template>
  <div>
    <a-breadcrumb v-if="$route.meta.breadcrumb && $route.meta.breadcrumb.length > 0">
      <a-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index">
        <router-link v-if="item.path" :to="{ path: item.path }">{{ item.name }}</router-link>
        <span v-else>{{ item.name }}</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ $route.name }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/** 面包屑 */
@Component
export default class Menu extends Vue {
  public breadcrumbs = this.$route.meta.breadcrumb;
}
</script>
