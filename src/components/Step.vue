<template>
  <div class="step">
    <hr>
    <h2
      :class="{ muted: step !== stepIndex,
        clickable: visitedSteps.includes(stepIndex) && stepIndex !== step}"
      @click="() => { selectStep(stepIndex) }"
    >
      {{wizardData[stepIndex].title}}<span v-if="step === stepIndex">:</span>
    </h2>
    <div v-if="stepIndex === step">
      <variant
        v-for="(variant, i) in wizardData[stepIndex].variants"
        :key="i"
        :step-index="stepIndex"
        :variant-index="i"
      >
      </variant>
    </div>
  </div>
</template>

<script lang="ts">
import Variant from '@/components/Variant.vue';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

@Options({
  components: {
    Variant,
  },
  props: {
    stepIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['step', 'visitedSteps', 'wizardData', 'inputData']),
  },
  methods: {
    ...mapActions(['selectStep']),
  },
})
export default class Step extends Vue {
  stepIndex!: number;
}
</script>

<style scoped lang="scss">
  .step {
    margin-bottom: 14px;
  }
</style>
