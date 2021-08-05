<template>
  <canvas
    id="next"
    ref="nest"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, ref,  onMounted } from 'vue';
import useNest from '../composables/useNest';

export default defineComponent({
  setup() {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);
    
    const nest = ref<HTMLCanvasElement | null>(null);
    

    onMounted(() => {
      const canvas = nest.value as HTMLCanvasElement;
      const { initNest } = useNest (canvas, { zIndex: -1,
        opacity:0.5,
        color:'36,185,133',
        pointColor:'10,150,10',
        count:100});
      initNest();
    });

    return {
      nest,
      width,
      height
    };
  }
});
</script>

<style lang="scss" scoped>
#next {
  position: fixed;
  top: 0px;
  left: 0px;
  border: 1px dashed red;
}
</style>>
