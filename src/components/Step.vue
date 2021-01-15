<template>
  <div>
    <hr>
    <h2 @click="() => { selectStep(stepIndex) }">{{wizardData[stepIndex].title}}</h2>
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
import { mapActions, mapMutations, mapState } from 'vuex';

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
    ...mapState(['step', 'wizardData', 'inputData']),
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

</style>
