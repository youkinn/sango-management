<!--
 * @Description: 500页面
 * @Autor: 胡椒
 * @Date: 2020-08-17 13:49:20
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-17 13:54:23
-->
<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
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
export default class Page500 extends Vue {}
</script>
