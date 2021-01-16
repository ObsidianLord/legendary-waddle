import { WizardVariant, WizardStep } from '@/types/WizardStep';
import { createStore } from 'vuex';
import dummyData from '@/data/data.json';
import { StepInput, VariantInput } from '@/types/StepInput';

export default createStore({
  state: {
    currentStep: 0,
    visitedSteps: [0],
    wizardData: Array<WizardStep>(),
    inputData: Array<StepInput>(),
  },

  mutations: {
    setWizardData(state, data: Array<WizardStep>): void {
      state.wizardData = data;
    },

    initInputData(state, data: Array<WizardStep>): void {
      state.inputData = data.map((step: WizardStep): StepInput => ({
        variants: step.variants.map((variant: WizardVariant): VariantInput => ({
          isSelected: false,
          options: new Array(variant.options.length).fill(false),
          select: new Array(variant.select.length).fill(0),
        })),
      }));
    },

    setVariantOption(state, {
      stepData, variant, optionIndex, newVal,
    }): void {
      const stepIndex: number = state.wizardData.indexOf(stepData);
      const variantIndex: number = stepData.variants.indexOf(variant);
      state
        .inputData[stepIndex]
        .variants[variantIndex]
        .options[optionIndex] = newVal;
    },

    setSelectOption(state, {
      stepData, variant, selectIndex, newVal,
    }): void {
      const stepIndex: number = state.wizardData.indexOf(stepData);
      const variantIndex: number = stepData.variants.indexOf(variant);
      state
        .inputData[stepIndex]
        .variants[variantIndex]
        .select[selectIndex] = newVal;
    },

    setStep(state, step: number): void {
      if (!state.visitedSteps.includes(step)) {
        state.visitedSteps.push(step);
      }
      state.currentStep = step;
    },

    setSelectedVariant(state, {
      stepIndex,
      variantIndex,
    }): void {
      state.inputData[stepIndex].variants.forEach(
        (variant: VariantInput, i: number) => {
          const currentVariant: VariantInput = variant;
          currentVariant.isSelected = variantIndex === i;
        },
      );
    },
  },

  actions: {
    fetchWizardData({ commit }): void {
      // inser API call to get wizard data here
      commit('setWizardData', dummyData);
      commit('initInputData', dummyData);
    },

    selectVariant({ commit, state }, {
      stepData,
      variant,
    }): void {
      const stepIndex: number = state.wizardData.indexOf(stepData);
      const variantIndex: number = stepData.variants.indexOf(variant);
      commit('setSelectedVariant', {
        stepIndex,
        variantIndex,
      });
      if (stepIndex + 1 < state.wizardData.length) {
        commit('setStep', stepIndex + 1);
      }
    },

    selectStep({ commit, state }, step: number | WizardStep): void {
      const stepIndex: number = typeof step === 'number' ? step : state.wizardData.indexOf(step);
      if (state.visitedSteps.includes(stepIndex)) {
        commit('setStep', stepIndex);
      }
    },
  },

  getters: {
    totalPrice: (state): number => {
      let sum = 0;
      state.inputData.forEach((stepInput: StepInput, stepIndex: number) => {
        stepInput.variants.forEach((variantInput: VariantInput, variantIndex: number) => {
          if (variantInput.isSelected) {
            sum += state.wizardData[stepIndex].variants[variantIndex].price_default;

            variantInput.options.forEach((option: boolean, optionIndex: number) => {
              if (option) {
                sum += state.wizardData[stepIndex].variants[variantIndex]
                  .options[optionIndex].price;
              }
            });

            variantInput.select.forEach((select: number, selectIndex: number) => {
              sum += state.wizardData[stepIndex].variants[variantIndex]
                .select[selectIndex].items[select].price;
            });
          }
        });
      });
      return sum;
    },
  },
});
