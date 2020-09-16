<!--
 * @Description: 字典目录列表
 * @Autor: 胡椒
 * @Date: 2020-08-27 11:44:59
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-03 17:03:30
-->
<template>
  <div class="list">
    <directory-list-search-bar class="mb10" :loading="loading" @submit="handleSearch" />

    <a-row class="mb10">
      <a-button type="primary" icon="plus" @click="add">添加字典</a-button>
    </a-row>

    <a-table
      :rowKey="record => record._id"
      :columns="columns"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      :locale="{ filterConfirm: '暂无数据' }"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="record">
        <a-space>
          <a-button size="small" @click="view(record)">查看</a-button>
          <a-button size="small" @click="edit(record)">编辑</a-button>
          <a-button size="small" @click="del(record._id)">删除</a-button>
          <a-button size="small" @click="viewContent(record._id, record.name)">字典内容</a-button>
        </a-space>
      </template>
    </a-table>

    <!-- 新增/编辑字典弹框 -->
    <a-modal
      :title="modalTitle"
      :visible="isDictionaryEditModalVisible"
      :footer="false"
      @cancel="isDictionaryEditModalVisible = false"
      :destroyOnClose="true"
    >
      <directory-list-edit-form
        :edit-mode="editMode"
        :data="currentRecord"
        @submit="addDictionary"
        @cancel="isDictionaryEditModalVisible = false"
      >
      </directory-list-edit-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import BaseList from '@/components/base/BaseList';
import { Component } from 'vue-property-decorator';
import { getDictionaryList, addDictionary, editDictionary, delDictionary } from '@/api';
import { EditMode } from '@/const';
import { DictionaryForm } from '@/types/api';
import { timeSpanFormat } from '@/utils';
import { validate, required } from '@/decorators';
import DirectoryListEditForm from '@/components/dictionary/DirectoryListEditForm.vue';
import DirectoryListSearchBar from '@/components/dictionary/DirectoryListSearchBar.vue';

const columns = [
  {
    title: '字典id',
    dataIndex: '_id',
    width: 220,
    align: 'center',
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    align: 'center',
  },
  {
    title: '字典名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    align: 'center',
  },
  {
    title: '最后修改时间',
    dataIndex: 'modified_at',
    align: 'center',
    customRender(text: string) {
      return timeSpanFormat(text);
    },
  },
  {
    title: '操作',
    align: 'center',
    width: 220,
    scopedSlots: { customRender: 'operation' },
  },
];

/** 字典目录 */
@Component({
  components: { DirectoryListEditForm, DirectoryListSearchBar },
})
export default class DictionaryList extends BaseList {
  /** 字典列表 */
  private list: object[] = [];
  /** 查询条件 */
  private searchParams = {
    /** 关键字 */
    keyword: undefined,
  };
  /** 列表展示字段 */
  private columns = columns;

  /** 是否显示编辑弹框 */
  private isDictionaryEditModalVisible = false;
  /** 编辑模式 */
  private editMode = EditMode.ADD;
  /** 当前记录-用于数据回显 */
  private currentRecord = {};

  /** 是否编辑模式 */
  private get isEditMode() {
    return this.editMode === EditMode.EDIT;
  }

  /** 弹框标题 */
  private get modalTitle() {
    let title = '';
    switch (this.editMode) {
      case EditMode.VIEW:
        title = '查看';
        break;
      case EditMode.ADD:
        title = '新增';
        break;
      case EditMode.EDIT:
        title = '编辑';
        break;
    }
    return title;
  }

  created() {
    this.getList();
  }

  /** 获取字典列表 */
  async getList() {
    this.loading = true;
    const { current: page, pageSize } = this.pagination;
    const params = Object.assign({}, this.searchParams, { page, pageSize });
    const res = await getDictionaryList(params);
    this.loading = false;
    this.list = res.data.results;
    this.pagination.total = res.data.count;
  }

  /** 用户点击[查询]按钮 */
  handleSearch(params: { keyword?: string }) {
    this.pagination.current = 1;
    this.searchParams = Object.assign({}, this.searchParams, params);
    this.getList();
  }

  /** 查看字典内容 */
  view(record: any) {
    this.editMode = EditMode.VIEW;
    this.currentRecord = record;
    this.isDictionaryEditModalVisible = true;
  }

  /** 用户点击[添加字典]按钮 */
  add() {
    this.editMode = EditMode.ADD;
    this.currentRecord = {};
    this.isDictionaryEditModalVisible = true;
  }

  /** 用户点击[编辑]按钮 */
  edit(record: any) {
    this.editMode = EditMode.EDIT;
    this.currentRecord = record;
    this.isDictionaryEditModalVisible = true;
  }

  /** 添加/编辑字典 */
  async addDictionary(params: DictionaryForm) {
    this.isEditMode
      ? await editDictionary((this.currentRecord as any)._id, params)
      : await addDictionary(params);
    this.$message.success('操作成功');
    this.isDictionaryEditModalVisible = false;
    this.getList();
  }

  /** 删除字典 */
  @validate
  del(@required _id: string) {
    const that = this;
    this.$confirm({
      title: '确定要删除该数据吗?',
      content: '删除后不可恢复，请谨慎操作',
      async onOk() {
        const result = await delDictionary(_id);
        that.$message.success('操作成功');
        that.getList();
        return result;
      },
    });
  }

  // 查看字典内容
  @validate
  viewContent(@required _id: string, @required name: string) {
    this.$emit('viewContent', _id, `字典内容-${name}`, `/base/dictionary/${_id}/content`);
  }
}
</script>
