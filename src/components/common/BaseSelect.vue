<template>
  <div class="option-select">
    <div class="option-select__title">
      {{ title }}
    </div>
    <div class="option-select__select">
      <select
        :value="value"
        class="button"
        @change="onChange($event)"
      >
        <option
          v-for="(item, i) in items"
          :key="i"
        >{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    onChange: {
      type: Function,
      required: false,
    },
  },
})
export default class BaseSelect extends Vue {
  title!: string;

  value!: string;

  items!: Array<string>;

  onChange!: (e: Event) => void;
}
</script>

<style scoped lang="scss">
.option-select {
  margin-bottom: 12px;
  &__title {
    font-size: 9pt;
    color: #666666;
    margin-bottom: 10px;
  }
  &__select {
    width: 100%;
    select {
      width: 100%;
      border: 2px solid #DDDDDD;
    }
  }
}
</style>
