<template>
  <div class="main-container">
    <PriceWizard/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PriceWizard from './components/ThePriceWizard.vue';

@Options({
  components: {
    PriceWizard,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.main-container {
  @media (min-width: 780px) {
    margin-top: 60px;
  }
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.clickable {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
