<!--
 * @Description: 空模版
 * @Autor: 胡椒
 * @Date: 2020-08-17 14:14:05
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-17 20:44:24
-->
<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {}
</script>
