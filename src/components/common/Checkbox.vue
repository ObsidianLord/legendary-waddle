<template>
  <div @click="onclick">
    <div v-if="selected">+</div>
    <div>{{title}}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';

@Options({
  props: {
    title: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    onclick: {
      type: Function,
      required: false,
    },
  },
  computed: {
    ...mapState(['wizardData', 'inputData']),
  },
})
export default class Checkbox extends Vue {
  title!: string;

  selected!: boolean;

  onclick!: () => void;
}
</script>

<style scoped lang="scss">

</style>
