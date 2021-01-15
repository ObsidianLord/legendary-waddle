<template>
  <div
    class="select-button button"
    :class="{ selected: selected }"
    @click="() => { selectVariant({ stepIndex, variantIndex }) }"
  >
    {{ buttonText }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

@Options({
  props: {
    stepIndex: {
      type: Number,
      required: true,
    },
    variantIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(['selectVariant']),
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selected(state: any): boolean {
        return state.inputData[this.stepIndex].variants[this.variantIndex].isSelected;
      },
    }),
    buttonText() {
      return this.selected ? 'Выбрано' : 'Выбрать';
    },
  },
})
export default class SelectButton extends Vue {
  stepIndex!: number;

  variantIndex!: number;
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
