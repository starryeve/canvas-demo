
export default function useClock(canvas: HTMLCanvasElement):{
  initClock:() => void
} {

  const initClock: () => void = (): void => {
    const PI = Math.PI;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    const draw = function () {
      ctx.save();

      ctx.clearRect(0, 0, 600, 600);
      ctx.translate(300, 300); // 设置中心点

      ctx.save(); // 保存状态

      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, 2 * PI); // 画大圆

      ctx.moveTo(5, 0); // 移动笔触到小圆起点, 画小圆
      ctx.arc(0, 0, 5, 0, 2 * PI);
      ctx.moveTo(0, 0);

      ctx.closePath();
      ctx.stroke();
  

      //* 获取时间 */
      const time = new Date();
      const hour = time.getHours() % 12;
      const min = time.getMinutes();
      const sec = time.getSeconds();
   

      /* 绘制时针 */
      ctx.rotate(
        ((2 * PI) / 12) * hour + ((2 * PI) / 12) * (min / 60) - PI / 2
      );
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(40, 0);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#aad';
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
      ctx.save();

      /* 绘制分针 */
      ctx.rotate((min / 60) * 2 * PI + (sec / 3600) * 2 * PI - PI / 2);
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(80, 0);
      ctx.strokeStyle = '#a33';
      ctx.lineWidth = 5;
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
      ctx.save();

      /* 绘制秒针 */
      ctx.rotate((sec / 60) * 2 * PI - PI / 2);
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(80, 0);
      ctx.strokeStyle = '#faf';
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
      ctx.save();

      ctx.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        ctx.rotate((2 * PI) / 60);
        ctx.beginPath();
        ctx.moveTo(90, 0);
        ctx.lineTo(100, 0);
        ctx.stroke();
        ctx.closePath();
        if (i % 5 === 0) {
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(80, 0);
          ctx.lineTo(100, 0);
          ctx.stroke();
          ctx.closePath();
          ctx.lineWidth = 1;
        }
      }
      ctx.restore();

      ctx.restore();
      requestAnimationFrame(draw)
    };

    draw()
  };
  return {
    initClock
  };
}