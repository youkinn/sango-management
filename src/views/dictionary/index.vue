<template>
  <div class="list">
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="edit" @change="refresh">
      <a-tab-pane :tab="pane.title" :closable="pane.closable" :key="pane.key">
        <dictionary-list @viewContent="add"></dictionary-list>
      </a-tab-pane>
      <a-tab-pane
        v-for="item in panes.slice(1)"
        :key="item.key"
        :tab="item.title"
        :closable="item.closable"
      >
        <router-view></router-view>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import TabIndex from '@/components/base/TabIndex';
import DictionaryList from './dictionary-list.vue';

const DictionaryPane: Pane = {
  key: 'dictionary',
  title: '字典目录',
  path: '/base/dictionary/directory',
  closable: false
};

@Component({
  components: { DictionaryList }
})
export default class Dictionary extends TabIndex {
  pane = DictionaryPane;

  created() {
    this.panes.push(DictionaryPane);
    this.activeKey = this.panes[0].key;
  }
}
</script>
