<!--
 * @Description: 字典內容新增/编辑表单
 * @Autor: 胡椒
 * @Date: 2020-08-28 14:38:10
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-31 13:58:18
-->
<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit.prevent="handleSubmit"
  >
    <a-form-item label="內容编码">
      <a-input
        v-decorator="['code', descriptor.code]"
        :disabled="readonly"
        :maxLength="20"
        placeholder="请输入内容编码"
      />
    </a-form-item>

    <a-form-item label="內容名称">
      <a-input
        v-decorator="['name', descriptor.name]"
        :disabled="readonly"
        :maxLength="20"
        placeholder="请输入內容名称"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="!readonly">
      <a-button class="mr20" type="primary" :loading="loading" html-type="submit">提交</a-button>
      <a-button @click.prevent="cancel">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import Form from '@/components/base/Form';
import { Component, Prop } from 'vue-property-decorator';
import { EditMode } from '@/const';

@Component
export default class DirectoryModalEdit extends Form {
  @Prop({ default: EditMode.ADD }) private editMode!: number; // 编辑模式
  @Prop({ default: () => {} }) private data!: any; // 编辑模式下回显数据用载体

  // 表单字段描述
  descriptor = {
    code: {
      initialValue: this.data.code,
      rules: [
        {
          required: true,
          message: '请输入内容编码'
        }
      ]
    },
    name: {
      initialValue: this.data.name,
      rules: [
        {
          required: true,
          message: '请输入内容名称'
        }
      ]
    }
  };

  // 查看模式
  get readonly() {
    return this.editMode === EditMode.VIEW;
  }
}
</script>
