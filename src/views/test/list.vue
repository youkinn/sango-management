<!--
 * @Description: 列表页
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-25 00:23:34
-->
<template>
  <div class="list">
    <a-table
      :rowKey="record => record._id"
      :columns="columns"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      :locale="{ filterConfirm: '暂无数据' }"
      @change="handleTableChange"
    >
      <template slot="operation">
        <a-button type="primary" size="small">编辑</a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import List from '@/components/global/List';
import { Component } from 'vue-property-decorator';
import { getUserList } from '@/api/index';

const columns = [
  {
    title: '编码',
    dataIndex: '_id',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    scopedSlots: { customRender: 'operation' }
  }
];

@Component
export default class Test extends List {
  list: object[] = [];
  columns = columns;

  created() {
    this.getList();
  }

  async getList() {
    const res = await getUserList({ page: 2, pageSize: 10 });
    this.list = res.data.results;
    this.pagination.total = res.data.count;
  }
}
</script>
