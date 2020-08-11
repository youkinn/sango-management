<!--
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-11 19:08:45
-->
<template>
  <div class="home">
    <div>
      <p v-for="(item, index) in list" :key="index">
        {{ item.id }}-{{ item.kuran_goods__item_name }}
      </p>
    </div>
    <a-button type="primary">提交</a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  message = '';
  list: object[] = [];

  created() {
    this.getList();
  }

  async getList() {
    const data = await this.$api.getUserList({ page: 2 });
    this.list = data.results;
  }
}
</script>
