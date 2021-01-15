<template>
  <div class="main-container">
    <price-wizard></price-wizard>
  </div>
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
.main-container {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
hr {
  border: 1px solid #DDDDDD;
}
h1, h2 {
  margin: 0;
}
h1 {
  font-size: 14pt;
}
h2 {
  font-size: 12pt;
}
.muted {
  color: #DDDDDD;
}
.button {
  border-radius: 5px;
  padding: 8px;
  font-size: 11pt;
  text-align: center;
  cursor: pointer;
}

.clickable {
  cursor: pointer;
}
</style>
