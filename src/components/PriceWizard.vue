<template>
  <div class="price-wizard">
    <step
      v-for="(step, i) in wizardData"
      :key="i"
      :step-index="i"
    ></step>
    <div class="total-price">
      <div class="total-price__title">Итого к оплате</div>
      <div>{{totalPrice.toLocaleString('en').replaceAll(',',' ')}}&nbsp;₽</div>
    </div>
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
    font-size: 18pt;
    padding: 20px;
    &__title {
      font-weight: 700;
    }
  }
</style>
