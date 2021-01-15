<template>
  <div @click="() => { selectVariant({ stepIndex, variantIndex }) }">
    Выбрать
  </div>
</template>

<script lang="ts">
import { Select, Option } from '@/types/WizardStep';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapMutations, mapState } from 'vuex';

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
})
export default class SelectButton extends Vue {
  stepIndex!: number;

  variantIndex!: number;
}
</script>

<style scoped lang="scss">

</style>
