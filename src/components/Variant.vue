<template>
  <div>
    <h1>{{variant.title}}</h1>
    <div>
      <pre>{{variant.description}}</pre>
    </div>
    <div>
      <checkbox
        v-for="(option, optionIndex) in variant.options"
        :key="optionIndex"
        :title="option.title"
        :selected="model.options[optionIndex]"
        :onclick="() => {
          setVariantOption(getVariantOptionTogglePayload(optionIndex, model.options[optionIndex]))
        }"
      ></checkbox>
      <option-select
        v-for="(selectOption, selectOptionIndex) in variant.select"
        :key="selectOptionIndex"
        :stepIndex="stepIndex"
        :variantIndex="variantIndex"
        :selectIndex="selectOptionIndex"
      ></option-select>
      <select-button
        :stepIndex="stepIndex"
        :variantIndex="variantIndex"
      ></select-button>
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from '@/components/common/Checkbox.vue';
import OptionSelect from '@/components/common/OptionSelect.vue';
import SelectButton from '@/components/common/SelectButton.vue';
import { VariantInput } from '@/types/StepInput';
import { WizardVariant } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapMutations, mapState } from 'vuex';

@Options({
  components: {
    Checkbox,
    OptionSelect,
    SelectButton,
  },
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
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variant(state: any): WizardVariant {
        return state.wizardData[this.stepIndex].variants[this.variantIndex];
      },
    }),
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model(state: any): WizardVariant {
        return state.inputData[this.stepIndex].variants[this.variantIndex];
      },
    }),
  },
  methods: {
    ...mapMutations(['setVariantOption']),
    getVariantOptionTogglePayload(optionIndex: number, oldVal: boolean) {
      return {
        stepIndex: this.stepIndex,
        variantIndex: this.variantIndex,
        optionIndex,
        newVal: !oldVal,
      };
    },
  },
})
export default class Variant extends Vue {
  stepIndex!: number;

  variantIndex!: number;
}
</script>

<style scoped lang="scss">

</style>
