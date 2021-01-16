<template>
  <div class="step">
    <hr>
    <h2
      :class="titleClass"
      @click="() => { selectStep(stepData) }"
    >
      {{ stepData.title }}<span v-if="!collapsed">:</span>
    </h2>
    <div v-if="!collapsed">
      <PriceWizardStepVariant
        v-for="(variant, i) in stepData.variants"
        :key="i"
        :step-data="stepData"
        :variant="variant"
      ></PriceWizardStepVariant>
    </div>
  </div>
</template>

<script lang="ts">
import PriceWizardStepVariant from '@/components/PriceWizardStepVariant.vue';
import { WizardStep } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapActions } from 'vuex';

@Options({
  components: {
    PriceWizardStepVariant,
  },
  props: {
    stepData: {
      type: Object,
      required: true,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    expandable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    titleClass(): object {
      return {
        muted: this.collapsed,
        clickable: this.expandable,
      };
    },
  },
  methods: {
    ...mapActions(['selectStep']),
  },
})
export default class PriceWizardStep extends Vue {
  stepData!: WizardStep;

  collapsed!: boolean;

  expandable!: boolean;
}
</script>

<style scoped lang="scss">
  .step {
    margin-bottom: 14px;
  }
</style>
