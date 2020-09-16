<!--
 * @Description: 字典内容列表
 * @Autor: 胡椒
 * @Date: 2020-08-27 12:35:33
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:58:04
-->
<template>
  <div class="list">
    <a-row class="mb20">
      <a-button type="primary" icon="plus" @click="add">添加內容</a-button>
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
        <a-space>
          <a-button size="small" @click="view(record)">查看</a-button>
          <a-button size="small" @click="edit(record)">编辑</a-button>
          <a-button size="small" @click="del(record._id)">删除</a-button>
        </a-space>
      </template>
    </a-table>

    <!-- 新增/编辑字典弹框 -->
    <a-modal
      :title="modalTitle"
      :visible="isContentEditModalVisible"
      :footer="false"
      @cancel="isContentEditModalVisible = false"
      :destroyOnClose="true"
    >
      <content-list-edit-form
        :edit-mode="editMode"
        :data="currentRecord"
        @submit="handleSubmit"
        @cancel="isContentEditModalVisible = false"
      >
      </content-list-edit-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import {
  getDictionaryContentList,
  addDictionaryContent,
  editDictionaryContent,
  delDictionaryContent,
} from '@/api';
import { EditMode } from '@/const';
import { DictionaryContentForm } from '@/types/api';
import { validate, required } from '@/decorators';
import ContentListEditForm from '@/components/dictionary/ContentListEditForm.vue';

const columns = [
  {
    title: '内容id',
    dataIndex: '_id',
    width: 220,
    align: 'center',
  },
  {
    title: '内容编码',
    dataIndex: 'code',
    align: 'center',
  },
  {
    title: '内容名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    width: 220,
    scopedSlots: { customRender: 'operation' },
  },
];

/** 字典内容 */
@Component({
  components: { ContentListEditForm },
})
export default class DictionaryContentList extends Vue {
  /** 字典内容列表 */
  private list: object[] = [];
  /** 列表加载中标识 */
  private loading = false;
  /** 列表展示字典 */
  private columns = columns;
  /** 所属字典id-$route上获取 */
  private dictionaryId = '';

  /** 是否显示编辑弹框 */
  private isContentEditModalVisible = false;
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
    this.dictionaryId = this.$route.params.dictionaryId;
    this.getList();
  }

  /** 获取字典内容列表 */
  async getList() {
    this.loading = true;
    const res = await getDictionaryContentList(this.dictionaryId);
    this.list = res.data.results;
    this.loading = false;
  }

  /** 查看字典内容 */
  view(record: any) {
    this.editMode = EditMode.VIEW;
    this.currentRecord = record;
    this.isContentEditModalVisible = true;
  }

  /** 用户点击[添加內容]按钮 */
  add() {
    this.editMode = EditMode.ADD;
    this.currentRecord = {};
    this.isContentEditModalVisible = true;
  }

  /** 用户点击[编辑]按钮 */
  edit(record: any) {
    this.editMode = EditMode.EDIT;
    this.currentRecord = record;
    this.isContentEditModalVisible = true;
  }

  /** 添加/编辑字典内容 */
  async handleSubmit(params: DictionaryContentForm) {
    this.isEditMode
      ? await editDictionaryContent(this.dictionaryId, (this.currentRecord as any)._id, params)
      : await addDictionaryContent(this.dictionaryId, params);
    this.$message.success('操作成功');
    this.isContentEditModalVisible = false;
    this.getList();
  }

  /** 删除字典内容 */
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
      },
    });
  }
}
</script>
