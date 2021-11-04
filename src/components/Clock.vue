<template>
  <canvas id="clock" ref="clock" width="600" height="600">
    <p>当前浏览器不支持canvas，请升级浏览器</p>
  </canvas>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import useClock from "../composables/useClock";
  export default defineComponent({
    name: "Clock",
    setup() {
      const clock = ref<HTMLCanvasElement | null>(null);

      onMounted(() => {
        const canvas = clock.value as HTMLCanvasElement;
        const { initClock } = useClock(canvas);
        initClock();
      });

      return {
        clock
      };
    }
  });
</script>

<style lang="scss" scoped></style>
>
