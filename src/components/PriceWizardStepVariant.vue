<template>
  <div class="variant">
    <div
      class="variant__outline"
      :style="{ backgroundColor: variant.color }"
    ></div>
    <div class="variant__content">
      <div class="variant__content-title-row">
        <h1>{{ variant.title }}</h1>
        <div class="variant__content-title-row-price">
          {{ formattedPrice }}&nbsp;₽
        </div>
      </div>

      <div class="variant__content-main">
        <div class="variant__content-main-description">
          <p
            v-for="(paragraph, pIndex) in variant.description.split('\n')"
            :key="pIndex"
          >{{ paragraph }}</p>
        </div>
        <div class="variant__content-main-options">
          <PriceWizardStepVariantOption
            v-for="(option, optionIndex) in variant.options"
            :key="optionIndex"
            :title="option.title"
            :selected="model.options[optionIndex]"
            :on-click="() => {
              setVariantOption(
                getVariantOptionTogglePayload(optionIndex, model.options[optionIndex])
              )
            }"
          ></PriceWizardStepVariantOption>
          <PriceWizardStepVariantSelect
            v-for="(selectOption, selectOptionIndex) in variant.select"
            :key="selectOptionIndex"
            :stepIndex="stepIndex"
            :variantIndex="variantIndex"
            :selectIndex="selectOptionIndex"
          ></PriceWizardStepVariantSelect>
          <PriceWizardStepVariantButton
            :stepIndex="stepIndex"
            :variantIndex="variantIndex"
          ></PriceWizardStepVariantButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import formatPrice from '@/util/formatPrice';
import PriceWizardStepVariantSelect from '@/components/controls/PriceWizardStepVariantSelect.vue';
import PriceWizardStepVariantOption from '@/components/controls/PriceWizardStepVariantOption.vue';
import PriceWizardStepVariantButton from '@/components/controls/PriceWizardStepVariantButton.vue';
import { VariantInput } from '@/types/StepInput';
import { WizardVariant } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapMutations, mapState } from 'vuex';

@Options({
  components: {
    PriceWizardStepVariantSelect,
    PriceWizardStepVariantOption,
    PriceWizardStepVariantButton,
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
      model(state: any): VariantInput {
        return state.inputData[this.stepIndex].variants[this.variantIndex];
      },
    }),

    price(): number {
      let sum = 0;
      sum += this.variant.price_default;
      this.model.options.forEach((option: boolean, optionIndex: number) => {
        if (option) {
          sum += this.variant.options[optionIndex].price;
        }
      });
      this.model.select.forEach((select: number, selectIndex: number) => {
        sum += this.variant.select[selectIndex].items[select].price;
      });
      return sum;
    },

    formattedPrice(): string {
      return formatPrice(this.price);
    },
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
export default class PriceWizardStepVariant extends Vue {
  stepIndex!: number;

  variantIndex!: number;
}
</script>

<style scoped lang="scss">
  .variant {
    display: flex;
    margin: 16px 0;
    &__outline {
      background-color: #CCCCCC;
      border-radius: 4px 0 0 4px;
      width: 6px;
    }
    &__content {
      padding: 16px;
      width: 100%;
      border-radius: 0 4px 4px 0;
      background-color: #F8F8F8;
      &-title-row {
        display: flex;
        justify-content: space-between;
        &-price {
          font-size: 14pt;
          font-weight: 500;
        }
      }
      &-main{
        @media (min-width: 780px) {
          display: flex;
        }
        &-description {
          font-size: 11pt;
          color: #666666;
          font-weight: 500;
          width: 100%;
        }
        &-options {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          @media (min-width: 780px) {
            border-left: 2px solid #DDDDDD;
            min-width: 205px;
            max-width: 205px;
            margin-left: 14px;
            padding: 14px 0 0 14px;
          }
        }
      }
    }
  }
</style>
