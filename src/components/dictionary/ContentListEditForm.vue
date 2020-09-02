<!--
 * @Description: 字典內容新增/编辑表单
 * @Autor: 胡椒
 * @Date: 2020-08-28 14:38:10
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:08:01
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
      <a-space>
        <a-button type="primary" :loading="loading" html-type="submit">提交</a-button>
        <a-button @click.prevent="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import BaseForm from '@/components/base/BaseForm';
import { Component, Prop } from 'vue-property-decorator';
import { EditMode } from '@/const';

/** 字典內容新增/编辑表单 */
@Component
export default class ContentEditFrom extends BaseForm {
  /** 编辑模式 */
  @Prop({
    type: Number,
    required: true,
    default: EditMode.ADD,
    validator: (value: number) => {
      return [EditMode.VIEW, EditMode.ADD, EditMode.EDIT].includes(value);
    }
  })
  private editMode!: number;

  /** 编辑模式下回显数据用载体 */
  @Prop({
    type: Object,
    default: () => {}
  })
  private data!: any;

  /** 表单字段描述 */
  descriptor = {
    /** 内容编码 */
    code: {
      initialValue: this.data.code,
      rules: [
        {
          required: true,
          message: '请输入内容编码'
        }
      ]
    },

    /** 内容名称 */
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

  /** 查看模式 */
  get readonly() {
    return this.editMode === EditMode.VIEW;
  }
}
</script>
