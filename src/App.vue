<template>
  <price-wizard msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PriceWizard from './components/PriceWizard.vue';

@Options({
  components: {
    PriceWizard,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  margin-top: 60px;
}
</style>
