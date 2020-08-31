<!--
 * @Description: 字典目录列表检索区域
 * @Autor: 胡椒
 * @Date: 2020-08-31 17:34:26
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-31 18:37:00
-->
<template>
  <a-form :form="form" layout="inline" @submit.prevent="handleSubmit">
    <a-form-item label="">
      <a-input
        v-decorator="['keyword']"
        allow-clear
        :maxLength="20"
        placeholder="字典编码/字典名称"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" icon="search" :loading="loading" html-type="submit">查询</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import Form from '@/components/base/Form';
import { Component } from 'vue-property-decorator';

@Component
export default class DirectoryListSearchBar extends Form {}
</script>
