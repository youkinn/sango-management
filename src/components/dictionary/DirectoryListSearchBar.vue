<!--
 * @Description: 字典目录列表检索区域
 * @Autor: 胡椒
 * @Date: 2020-08-31 17:34:26
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:08:14
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
import BaseForm from '@/components/base/BaseForm';
import { Component } from 'vue-property-decorator';

/** 字典目录检索区域 */
@Component
export default class DirectoryListSearchBar extends BaseForm {}
</script>
