<template>
  <div class="option-select">
    <div class="option-select__title">
      {{selectData.title}}
    </div>
    <div class="option-select__select">
      <select
        :value="selectData.items[selectedIndex].title"
        class="button"
        @change="onChange($event)"
      >
        <option
          v-for="(option, i) in selectData.items"
          :key="i"
        >{{ option.title }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Select, Option } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapMutations, mapState } from 'vuex';

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
    selectIndex: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectData(state: any): Select {
        return state
          .wizardData[this.stepIndex].variants[this.variantIndex].select[this.selectIndex];
      },
    }),

    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectedIndex(state: any): number {
        return state.inputData[this.stepIndex].variants[this.variantIndex].select[this.selectIndex];
      },
    }),

    ...mapState(['wizardData', 'inputData']),
  },

  methods: {
    ...mapMutations(['setSelectOption']),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(event: any): void {
      if (event !== null && event.target) {
        this.setSelectOption({
          stepIndex: this.stepIndex,
          variantIndex: this.variantIndex,
          selectIndex: this.selectIndex,
          newVal: this.selectData.items.map((item: Option): string => item.title)
            .indexOf(event.target.value),
        });
      }
    },
  },
})
export default class PriceWizardStepVariantSelect extends Vue {
  stepIndex!: number;

  variantIndex!: number;

  selectIndex!: number;
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
