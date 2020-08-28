<template>
  <div class="list">
    {{ $route.params.directoryId }}
  </div>
</template>

<script lang="ts">
import List from '@/components/base/List';
import { Component } from 'vue-property-decorator';

@Component
export default class DictionaryContentList extends List {}
</script>
