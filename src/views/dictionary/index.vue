<template>
  <div class="list">
    <a-row>
      <a-button type="primary" @click="add">添加字典</a-button>
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
        <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
      </template>
    </a-table>

    <!-- 新增/编辑字典弹框 -->
    <a-modal
      :title="modalTitle"
      :visible="isDictionaryEditModalVisible"
      :footer="false"
      @cancel="isDictionaryEditModalVisible = false"
    >
      <DictionaryEditForm :edit-mode="editMode" :data="currentRecord" @submit="addDictionary" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import List from '@/components/global/List';
import { Component } from 'vue-property-decorator';
import { getDictionaryList, addDictionary } from '@/api';
import { EditMode } from '@/const';
import { DictionaryForm } from '@/types/api';
import DictionaryEditForm from '@/components/dictionary/dictionary-edit-form.vue';

const columns = [
  {
    title: 'id',
    dataIndex: '_id',
    align: 'center'
  },
  {
    title: '编码',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    scopedSlots: { customRender: 'operation' }
  }
];

@Component({
  components: { DictionaryEditForm }
})
export default class Dictionary extends List {
  // 列表相关
  private list: object[] = [];
  private searchParams = {
    code: '',
    name: ''
  };
  private columns = columns;

  // 弹框相关
  private isDictionaryEditModalVisible = false; // 是否显示编辑弹框
  private editMode = EditMode.ADD; // 编辑模式
  private currentRecord = null; // 当前记录-用于数据回显

  // 弹框标题
  private get modalTitle() {
    return (this.editMode === EditMode.ADD ? '新增' : '编辑') + '字典';
  }

  created() {
    this.getList();
  }

  // 获取字典列表
  async getList() {
    const { current: page, pageSize } = this.pagination;
    const params = Object.assign({}, this.searchParams, { page, pageSize });
    const res = await getDictionaryList(params);
    this.list = res.data.results;
    this.pagination.total = res.data.count;
  }

  // 添加字典
  async addDictionary(params: DictionaryForm) {
    await addDictionary(params);
    this.$message.success('操作成功');
    this.isDictionaryEditModalVisible = false;
    this.getList();
  }

  // 用户点击[添加字典]按钮
  add() {
    this.editMode = EditMode.ADD;
    this.currentRecord = null;
    this.isDictionaryEditModalVisible = true;
  }

  // 用户点击[编辑]按钮
  edit(record: any) {
    this.editMode = EditMode.EDIT;
    this.currentRecord = record;
    this.isDictionaryEditModalVisible = true;
  }
}
</script>
