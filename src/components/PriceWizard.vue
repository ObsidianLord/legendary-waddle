<template>
  <div>
    <step
      v-for="(step, i) in wizardData"
      :key="i"
      :step-index="i"
    ></step>
  </div>
  <div>
    <div>Итого к оплате</div>
    <div>{{totalPrice}}</div>
  </div>
</template>

<script lang="ts">
import Step from '@/components/Step.vue';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters, mapState } from 'vuex';

@Options({
  components: {
    Step,
  },
  props: {
    msg: String,
  },
  mounted() {
    this.fetchWizardData();
  },
  computed: {
    ...mapState(['wizardData', 'inputData']),
    ...mapGetters(['totalPrice']),
  },
  methods: {
    ...mapActions(['fetchWizardData']),
  },
})
export default class PriceWizard extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss">

</style>
