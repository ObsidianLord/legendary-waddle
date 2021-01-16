<template>
  <div
    class="checkbox button"
    @click="onClick"
  >
    <div class="checkbox__box">
      <input
        :key="selected"
        :checked="selected"
        class="clickable"
        type="checkbox"
        @change="onCBClick($event)"
      >
    </div>
    <div class="checkbox__title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClick: {
      type: Function,
      required: false,
    },
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCBClick(event: any) {
      event.preventDefault();
      this.onClick();
    },
  },
})
export default class BaseCheckbox extends Vue {
  title!: string;

  selected!: boolean;

  onClick!: () => void;
}
</script>

<style scoped lang="scss">
  .checkbox {
    color: #666666;
    background-color: #FFF;
    border: 2px solid #DDDDDD;
    display: flex;
    font-weight: 500;
    margin-bottom: 10px;
    &__box {
      min-width: 30px;
      max-width: 30px;
    }
    &__title {
      width: 100%;
    }
  }
</style>
