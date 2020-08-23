<!--
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-23 23:38:51
-->
<template>
  <div class="home">
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="handleSubmit"
    >
      <a-form-item label="Note">
        <a-input v-decorator="['name', options.name]" :maxLength="20" placeholder="请输入姓名" />
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
import { throttle } from '@/decorators';

interface AFrom {
  name: string;
}

@Component
export default class Home extends Vue {
  list: object[] = [];
  form: any;

  options = {
    name: {
      initialValue: '',
      rules: [
        {
          required: true,
          message: '请输入姓名'
        }
      ]
    }
  };

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

  @throttle(3000)
  async handleSubmit() {
    const formData: AFrom = await this.form.validateFields();
    await addUser(formData);
    this.$message.success('添加成功');
    this.getList();
  }
}
</script>
