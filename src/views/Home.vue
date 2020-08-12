<!--
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-12 20:07:10
-->
<template>
  <div class="home">
    <div>
      <p v-for="(item, index) in list" :key="index">
        {{ item.id }}-{{ item.kuran_goods__item_name }}
      </p>
    </div>
    <a-input v-model="remark"></a-input>
    <a-button type="primary" @click="updateRemark">提交</a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { message } from 'ant-design-vue';

@Component
export default class Home extends Vue {
  remark = '';
  list: object[] = [];

  created() {
    this.getList();
  }

  async getList() {
    const res = await this.$api.getUserList({ page: 2 });
    this.list = res.data.results;
  }

  async updateRemark() {
    const data = await this.$api.updateRemark({
      id: 1658,
      remark: this.remark
    });
    if (data) {
      message.success('操作成功');
    }
  }
}
</script>
