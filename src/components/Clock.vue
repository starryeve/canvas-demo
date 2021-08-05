<template>
  <canvas
    id="clock"
    ref="canvas"
    width="600"
    height="600"
  >
    <p>当前浏览器不支持canvas，请升级浏览器</p>
  </canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useClock from '../composables/useClock';
export default defineComponent({
  name: 'Clock', 
  setup   () {
    const { canvas, initClock } = useClock ();

    onMounted(() => {
      initClock();
    });

    return {
      canvas,
      initClock
    };
  }
});
</script>

<style lang="scss" scoped>
 
</style>>
