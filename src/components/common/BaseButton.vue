<template>
  <div
    class="select-button button"
    :class="{ selected }"
    @click="onClick"
  >
    {{ buttonText }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    onClick: {
      type: Function,
      required: false,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonText() {
      return this.selected ? 'Выбрано' : 'Выбрать';
    },
  },
})
export default class BaseButton extends Vue {
  onClick!: Function;

  selected!: boolean;
}
</script>

<style scoped lang="scss">
  .select-button {
    color: #FFF;
    background-color: #98ABBA;
  }
  .selected {
    background-color: #2FCB5A;
  }
</style>
