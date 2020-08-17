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

@Component
export default class Menu extends Vue {
  public breadcrumbs = this.$route.meta.breadcrumb;
}
</script>
