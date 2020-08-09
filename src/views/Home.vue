<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a-button type="primary">提交</a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  message = '';
}
</script>
