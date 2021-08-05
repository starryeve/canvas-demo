<template>
  <canvas
    id="next"
    ref="canvas"
    :width="canvas_width"
    :height="canvas_height"
  />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';


export default defineComponent({
  setup() {
    interface Point { // 定义点对象
      x: number;
      y: number;
      xSpeed: number;
      ySpeed: number;
    }

    let canvas_width = ref(window.innerWidth),
      canvas_height = ref(window.innerHeight);


    const canvas = ref<HTMLCanvasElement | null>(null);




    const points: Array<Point> = [];
    const drawPoints = function (): void {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas_width.value;
        const y = Math.random() * canvas_height.value;
        const xSpeed = 2 * Math.random() - 1;
        const ySpeed = 2 * Math.random() - 1;

        points.push({ x, y, xSpeed, ySpeed });
      }
    };


    const drawNext = function(): void {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx: CanvasRenderingContext2D = (canvas as Ref<
        HTMLCanvasElement
      >).value.getContext('2d')!;

      ctx.clearRect(0, 0, canvas_width.value, canvas_height.value);
      points.forEach((point): void => {
        console.log(canvas_width.value);

        point.x = point.x + point.xSpeed;
        point.y = point.y + point.ySpeed;
        point.xSpeed *= point.x > canvas_width.value || point.x < 0 ? -1 : 1;
        point.ySpeed *= point.y > canvas_height.value || point.y < 0 ? -1 : 1;
        ctx.fillRect(point.x - 0.5, point.y - 0.5, 1, 1);
      })

      for(let i = 0; i < points.length; i++) {
        for(let j = 1; j < points.length; j++) {
          if(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2) < 10000 ) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
            ctx.closePath()
          }
        }
      }

      requestAnimationFrame(drawNext);
    };
    const onWindowResize = function (): void {
      canvas_width.value = window.innerWidth;

      canvas_height.value = window.innerHeight;
    };
    onMounted(() => {
      drawPoints();
      drawNext();
      window.addEventListener('resize', onWindowResize);
    });

    return {
      canvas,
      canvas_width,
      canvas_height,
      points,
      drawPoints,
      drawNext,
      onWindowResize
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
