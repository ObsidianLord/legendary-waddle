<template>
  <div
    class="checkbox button"
    @click="onclick"
  >
    <div
      class="checkbox__box"
    >
      <input
        :key="selected"
        :checked="selected"
        class="clickable"
        type="checkbox"
        @change="oncbclick($event)"
      >
    </div>
    <div
      class="checkbox__title"
    >{{title}}</div>
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
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    oncbclick(event: any) {
      event.preventDefault();
      this.onclick();
    },
  },
})
export default class Checkbox extends Vue {
  title!: string;

  selected!: boolean;

  onclick!: () => void;
}
</script>

<style scoped lang="scss">
  .checkbox {
    color: #666666;
    background-color: #FFF;
    border: 2px solid #DDDDDD;
    display: flex;
    font-weight: 500;
    margin-bottom: 10px;
    &__box {
      min-width: 30px;
      max-width: 30px;
    }
    &__title {
      width: 100%;
    }
  }
</style>
