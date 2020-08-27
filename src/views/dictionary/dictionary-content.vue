<template>
  <div class="list">
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import List from '@/components/global/List';
import { Component } from 'vue-property-decorator';
import { validate, required } from '@/decorators';

@Component
export default class DictionaryContentList extends List {
  // 查看字典内容
  @validate
  viewContent(@required _id: string) {
    this.$emit('viewContent', _id);
  }
}
</script>
