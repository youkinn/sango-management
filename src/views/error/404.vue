<!--
 * @Description: 404页面
 * @Autor: 胡椒
 * @Date: 2020-08-14 18:29:01
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-17 13:54:15
-->
<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {}
</script>
