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
          <BaseCheckbox
            v-for="(option, optionIndex) in variant.options"
            :key="optionIndex"
            :title="option.title"
            :selected="model.options[optionIndex]"
            :on-click="() => { toggleCheckbox(optionIndex, model.options[optionIndex]) }"
          ></BaseCheckbox>
          <BaseSelect
            v-for="(selectOption, selectOptionIndex) in variant.select"
            :key="selectOptionIndex"
            :value="selectOption.items[model.select[selectOptionIndex]].title"
            :title="selectOption.title"
            :items="selectOption.items.map((item) => item.title)"
            :onChange="(event) => { onSelectChange(selectOptionIndex, event) }"
          ></BaseSelect>
          <BaseButton
            :selected="selected"
            :on-click="selectCurrentVariant"
          ></BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import formatPrice from '@/util/formatPrice';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { VariantInput } from '@/types/StepInput';
import { Option, WizardStep, WizardVariant } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapMutations, mapState } from 'vuex';

@Options({
  components: {
    BaseSelect,
    BaseCheckbox,
    BaseButton,
  },

  props: {
    stepData: {
      type: Object,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model(state: any): VariantInput {
        const stepIndex: number = state.wizardData.indexOf(this.stepData);
        const variantIndex: number = this.stepData.variants.indexOf(this.variant);
        return state.inputData[stepIndex].variants[variantIndex];
      },
    }),

    selected(): boolean {
      return this.model.isSelected;
    },

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
    ...mapMutations(['setVariantOption', 'setSelectOption']),
    ...mapActions(['selectVariant']),

    toggleCheckbox(optionIndex: number, oldVal: boolean) {
      this.setVariantOption(
        this.getVariantOptionTogglePayload(optionIndex, oldVal),
      );
    },

    getVariantOptionTogglePayload(optionIndex: number, oldVal: boolean) {
      return {
        stepData: this.stepData,
        variant: this.variant,
        optionIndex,
        newVal: !oldVal,
      };
    },

    selectCurrentVariant(): void {
      this.selectVariant({
        stepData: this.stepData,
        variant: this.variant,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelectChange(selectIndex: number, event: any): void {
      if (event !== null && event.target) {
        this.setSelectOption({
          stepData: this.stepData,
          variant: this.variant,
          selectIndex,
          newVal: this.variant.select[selectIndex]
            .items.map((item: Option): string => item.title).indexOf(event.target.value),
        });
      }
    },
  },
})
export default class PriceWizardStepVariant extends Vue {
  stepData!: WizardStep;

  variant!: WizardVariant;
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
