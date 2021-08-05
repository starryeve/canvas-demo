interface Config { // 定义配置
  zIndex: number, 
  opacity: number, // 透明度
  color: string, // 线的颜色
  pointColor: string,//点的颜色
  count: number // 点的数量
}
interface Point { // 定义点对象
  x: number; // x坐标
  y: number; // y坐标
  xV: number; // x方向速度
  yV: number; // y方向速度
  max:number; // 最大吸附距离
}
interface Current { // 鼠标点
  x: number | null; // 当前鼠标x
  y: number | null; // 当前鼠标y
  max: number; // 圆半径平方
}

class Nest {
  canvas: HTMLCanvasElement;
  points: Array<Point | Current>;
  current: Current;
  all: Array<Point | Current>;
  config: Config;
  constructor(canvas:HTMLCanvasElement,config:Config ) {
   
    
    this.canvas = canvas;
    console.log(this.canvas);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.config = config;
    this.current = {
      x: null,
      y: null,
      max: 20000
    }
    this.points = this.randomPoints();
    this.all = this.points.concat([this.current]);
 
    this.drawCanvas();
  

    //绑定事件，判断是否添加鼠标这个点
    window.onmousemove = e => {
      e = e || window.event;
      this.current.x = e.clientX;
      this.current.y = e.clientY;   
    };
    window.onmouseout = () => {
      this.current.x = null;
      this.current.y = null;
    };
  }

  randomPoints():Array<Point> { // 生成随机点
    console.log(this);
    
    return new Array(this.config.count).fill({}).map(() => {
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        xV: 2 * Math.random() - 1, // 随机运动返现
        yV: 2 * Math.random() - 1,
        max: 12000 // 沾附距离
      }
    })
  }

  drawCanvas():void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const points = this.points;
    const all = this.all;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = this.canvas.getContext('2d')!;
    
    ctx?.clearRect(0,0,width,height)
    points.forEach((pot, idx) => {
      const p = pot as Point
      p.x += p.xV; // 运动
      p.y += p.yV;
      p.xV *= p.x > width || p.x < 0 ? -1 : 1; // 边界反弹
      p.yV *= p.y > height || p.y < 0 ? -1 : 1;

      ctx.fillStyle = `rgba(${this.config.pointColor})`;
      ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1); // 绘制点
      for(let i = idx + 1; i < all.length; i++ ) {
        const pi = all[i];
        if(pi.x !== null && pi.y !== null) {
          const x_dist = p.x - pi.x;
          const y_dist = p.y - pi.y;
          const dist = x_dist * x_dist + y_dist * y_dist;
          dist < pi.max && (pi === this.current && dist >= pi.max / 2 && (p.x -= 0.03 * x_dist, p.y -= 0.03 * y_dist));
          const w = (pi.max - dist) / pi.max;
          ctx.beginPath();
          ctx.lineWidth = w / 2;
        
          ctx.strokeStyle = `rgba(16,15,133,${w + 0.2})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pi.x, pi.y);
          ctx.stroke();  
        }
      }
    })
    window.requestAnimationFrame(this.drawCanvas.bind(this))
  }
}




export default function useNest(canvas: HTMLCanvasElement, config:Config = {
  zIndex: -1,
  opacity:0.5,
  color:'0,0,0',
  pointColor:'0,0,0',
  count:100
}):{
  initNest:() => void
} {
 
  
  const initNest: () => void = (): void => {
    new Nest(canvas, config)
  }

  return {
    initNest
  };
}