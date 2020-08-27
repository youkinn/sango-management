<template>
  <div class="list">
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane tab="字典列表" :closable="false" key="dictionary">
        <dictionary-list @viewContent="viewContent"></dictionary-list>
      </a-tab-pane>
      <a-tab-pane v-for="item in panes" :key="item.key" :tab="item.title" :closable="item.closable">
        <router-view></router-view>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import DictionaryList from './dictionary-list.vue';

interface Pane {
  key: string;
  title: string;
  path: string;
  closable: boolean;
}

const panes: Pane[] = [];

@Component({
  components: { DictionaryList }
})
export default class Dictionary extends Vue {
  private activeKey = 'dictionary';
  newTabIndex = 0;
  panes = panes;

  onEdit(targetKey: string, action: string) {
    (this as any)[action](targetKey);
  }

  viewContent(_id: string, title: string, path: string) {
    const activeKey = `newTab-${_id}`;
    const panes = this.panes.filter(item => item.key === activeKey);
    if (panes.length === 0) {
      this.panes.push({
        title: title,
        key: activeKey,
        path: path,
        closable: true
      });
    }
    this.activeKey = activeKey;
    this.go(path);
  }

  go(path: string) {
    this.$router.push(path);
  }

  remove(targetKey: string) {
    let lastIndex = 0;
    this.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.panes.filter(pane => pane.key === targetKey);
    const index = this.panes.indexOf(panes[0]);
    this.panes.splice(index, 1);
    if (this.panes.length === 0) {
      this.activeKey = 'dictionary';
    } else {
      this.activeKey = this.panes[lastIndex].key;
    }
  }
}
</script>
