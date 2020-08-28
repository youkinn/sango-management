<template>
  <div class="list">
    <a-row class="mb20">
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
        <a-button class="mr10" size="small" @click="edit(record)">编辑</a-button>
        <a-button class="mr10" size="small" @click="del(record._id)">删除</a-button>
        <a-button size="small" @click="viewContent(record._id, record.name)">字典内容</a-button>
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
      <DirectoryModalEdit
        :edit-mode="editMode"
        :data="currentRecord"
        @submit="addDictionary"
        @cancel="isDictionaryEditModalVisible = false"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import List from '@/components/base/List';
import { Component } from 'vue-property-decorator';
import { getDictionaryList, addDictionary, editDictionary, delDictionary } from '@/api';
import { EditMode } from '@/const';
import { DictionaryForm } from '@/types/api';
import { timeSpanFormat } from '@/utils';
import { validate, required } from '@/decorators';
import DirectoryModalEdit from '@/components/dictionary/directory-edit-form.vue';

const columns = [
  {
    title: '字典id',
    dataIndex: '_id',
    width: 220,
    align: 'center'
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '字典名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    align: 'center'
  },
  {
    title: '最后修改时间',
    dataIndex: 'modified_at',
    align: 'center',
    customRender(text: string) {
      return timeSpanFormat(text);
    }
  },
  {
    title: '操作',
    align: 'center',
    width: 220,
    scopedSlots: { customRender: 'operation' }
  }
];

@Component({
  components: { DirectoryModalEdit }
})
export default class DictionaryList extends List {
  // 列表相关
  private list: object[] = [];
  private searchParams = {
    code: undefined,
    name: undefined
  };
  private columns = columns;

  // 弹框相关
  private isDictionaryEditModalVisible = false; // 是否显示编辑弹框
  private editMode = EditMode.ADD; // 编辑模式
  private currentRecord = {}; // 当前记录-用于数据回显

  // 是否编辑模式
  private get isEditMode() {
    return this.editMode === EditMode.EDIT;
  }

  // 弹框标题
  private get modalTitle() {
    return (this.isEditMode ? '编辑' : '新增') + '字典';
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

  // 用户点击[添加字典]按钮
  add() {
    this.editMode = EditMode.ADD;
    this.currentRecord = {};
    this.isDictionaryEditModalVisible = true;
  }

  // 用户点击[编辑]按钮
  edit(record: any) {
    this.editMode = EditMode.EDIT;
    this.currentRecord = record;
    this.isDictionaryEditModalVisible = true;
  }

  // 添加/编辑字典
  async addDictionary(params: DictionaryForm) {
    this.isEditMode
      ? await editDictionary((this.currentRecord as any)._id, params)
      : await addDictionary(params);
    this.$message.success('操作成功');
    this.isDictionaryEditModalVisible = false;
    this.getList();
  }

  // 删除字典
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
      }
    });
  }

  // 查看字典内容
  @validate
  viewContent(@required _id: string, @required name: string) {
    this.$emit('viewContent', _id, `字典内容-${name}`, `/base/dictionary/${_id}/content`);
  }
}
</script>
