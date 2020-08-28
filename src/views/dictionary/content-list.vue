<template>
  <div class="list">
    <a-row class="mb20">
      <a-button type="primary" @click="add">添加內容</a-button>
    </a-row>

    <a-table
      :rowKey="record => record._id"
      :columns="columns"
      :dataSource="list"
      :pagination="false"
      :loading="loading"
      :locale="{ filterConfirm: '暂无数据' }"
    >
      <template slot="operation" slot-scope="record">
        <a-button class="mr10" size="small" @click="view(record)">查看</a-button>
        <a-button class="mr10" size="small" @click="edit(record)">编辑</a-button>
        <a-button class="mr10" size="small" @click="del(record._id)">删除</a-button>
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
      <ContentModalEdit
        :edit-mode="editMode"
        :data="currentRecord"
        @submit="handleSubmit"
        @cancel="isDictionaryEditModalVisible = false"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import {
  getDictionaryContentList,
  addDictionaryContent,
  editDictionaryContent,
  delDictionaryContent
} from '@/api';
import { EditMode } from '@/const';
import { DictionaryContentForm } from '@/types/api';
import { validate, required } from '@/decorators';
import ContentModalEdit from '@/components/dictionary/content-edit-form.vue';

const columns = [
  {
    title: '内容id',
    dataIndex: '_id',
    width: 220,
    align: 'center'
  },
  {
    title: '内容编码',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '内容名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    width: 220,
    scopedSlots: { customRender: 'operation' }
  }
];

@Component({
  components: { ContentModalEdit }
})
export default class DictionaryContentList extends Vue {
  // 列表相关
  private list: object[] = [];
  private loading = false;
  private columns = columns;
  private dictionaryId = '';

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
    this.dictionaryId = this.$route.params.dictionaryId;
    this.getList();
  }

  // 获取字典内容列表
  async getList() {
    const res = await getDictionaryContentList(this.dictionaryId);
    this.list = res.data.results;
  }

  // 查看字典内容
  view(record: any) {
    this.editMode = EditMode.VIEW;
    this.currentRecord = record;
    this.isDictionaryEditModalVisible = true;
  }

  // 用户点击[添加內容]按钮
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

  // 添加/编辑字典内容
  async handleSubmit(params: DictionaryContentForm) {
    this.isEditMode
      ? await editDictionaryContent(this.dictionaryId, (this.currentRecord as any)._id, params)
      : await addDictionaryContent(this.dictionaryId, params);
    this.$message.success('操作成功');
    this.isDictionaryEditModalVisible = false;
    this.getList();
  }

  // 删除字典内容
  @validate
  del(@required _id: string) {
    const that = this;
    this.$confirm({
      title: '确定要删除该数据吗?',
      content: '删除后不可恢复，请谨慎操作',
      async onOk() {
        const result = await delDictionaryContent(that.dictionaryId, _id);
        that.$message.success('操作成功');
        that.getList();
        return result;
      }
    });
  }
}
</script>
