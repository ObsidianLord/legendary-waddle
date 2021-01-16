<template>
  <div class="price-wizard">
    <PriceWizardStep
      v-for="(step, i) in wizardData"
      :key="i"
      :step-data="step"
      :collapsed="currentStep !== i"
      :expandable="currentStep !== i && visitedSteps.includes(i)"
    ></PriceWizardStep>
    <div class="total-price">
      <div class="total-price__title">Итого к оплате</div>
      <div>{{ formattedTotalPrice }}&nbsp;₽</div>
    </div>
  </div>
</template>

<script lang="ts">
import formatPrice from '@/util/formatPrice';
import PriceWizardStep from '@/components/PriceWizardStep.vue';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters, mapState } from 'vuex';

@Options({
  components: {
    PriceWizardStep,
  },
  mounted() {
    this.fetchWizardData();
  },
  computed: {
    ...mapState(['wizardData', 'currentStep', 'visitedSteps']),
    ...mapGetters(['totalPrice']),
    formattedTotalPrice(): string {
      return formatPrice(this.totalPrice);
    },
  },
  methods: {
    ...mapActions(['fetchWizardData']),
  },
})
export default class PriceWizard extends Vue {}
</script>

<style scoped lang="scss">
  .price-wizard {
    max-width: 100%;
    @media (min-width: 780px) {
      max-width: 778px;
    }
  }
  .total-price {
    background-color: #2FCB5A;
    border-radius: 3px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 14pt;
    padding: 20px;
    @media (min-width: 780px) {
      font-size: 18pt;
    }
    &__title {
      font-weight: 700;
    }
  }
</style>
