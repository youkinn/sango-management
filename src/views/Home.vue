<!--
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-20 13:54:13
-->
<template>
  <div class="home">
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="Note">
        <a-input v-decorator="['name']" :maxLength="20" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
    <div>
      <p v-for="(item, index) in list" :key="index">{{ item._id }}-{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getUserList, addUser } from '@/api/index';

interface AFrom {
  name: string;
}

@Component
export default class Home extends Vue {
  list: object[] = [];
  form: any;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  created() {
    this.getList();
  }

  async getList() {
    const res = await getUserList({ page: 2, pageSize: 1 });
    this.list = res.data.results;
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields(async (err: Error[], values: AFrom) => {
      if (!err) {
        const { success } = await addUser(values);
        if (success) {
          this.$message.success('添加成功');
          this.getList();
        }
      }
    });
  }
}
</script>
