<!--
 * @Description: 字典管理
 * @Autor: 胡椒
 * @Date: 2020-08-31 16:21:52
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 18:42:12
-->
<template>
  <div class="list">
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="edit" @change="refresh">
      <a-tab-pane :tab="pane.title" :closable="pane.closable" :key="pane.key">
        <directory-list @viewContent="add"></directory-list>
      </a-tab-pane>
      <a-tab-pane
        v-for="item in panes.slice(1)"
        :key="item.key"
        :tab="item.title"
        :closable="item.closable"
      >
        <router-view :key="$route.name + new Date().getTime()"></router-view>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseTabIndex from '@/components/base/BaseTabIndex';
import DirectoryList from './DirectoryList.vue';

const DictionaryPane: Pane = {
  key: 'dictionary',
  title: '字典目录',
  path: '/base/dictionary/directory',
  closable: false,
};

@Component({
  components: { DirectoryList },
})
export default class Dictionary extends BaseTabIndex {
  pane = DictionaryPane;

  created() {
    this.panes.push(DictionaryPane);
    this.activeKey = this.panes[0].key;
  }
}
</script>
