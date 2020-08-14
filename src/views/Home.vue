<!--
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-14 17:52:14
-->
<template>
  <div class="home">
    <div>
      <p v-for="(item, index) in list" :key="index">
        {{ item.id }}-{{ item.kuran_goods__item_name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getUserList } from '@/api/index';

@Component
export default class Home extends Vue {
  remark = '';
  list: object[] = [];

  created() {
    this.getList();
  }

  async getList() {
    const res = await getUserList({ page: 2, pageSize: 1 });
    this.list = res.data.results;
  }
}
</script>
