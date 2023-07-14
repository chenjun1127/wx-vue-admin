// 背景动画设置
// color: String类型。默认'#dedede'。粒子颜色。
// particleOpacity: Number类型。默认0.7。粒子透明度。
// particlesNumber: Number类型。默认80。粒子数量。
// shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
// particleSize: Number类型。默认80。单个粒子大小。
// linesColor: String类型。默认'#dedede'。线条颜色。
// linesWidth: Number类型。默认1。线条宽度。
// lineLinked: 布尔类型。默认true。连接线是否可用。
// lineOpacity: Number类型。默认0.4。线条透明度。
// linesDistance: Number类型。默认150。线条距离。
// moveSpeed: Number类型。默认3。粒子运动速度。
// hoverEffect: 布尔类型。默认true。是否有hover特效。
// hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
// clickEffect: 布尔类型。默认true。是否有click特效。
// clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。

// particles 后续引入的变量 必须保持一致!

// 背景动画设置
export const particles = {
  fpsLimit: 60,
  background: {
    color: '#02061c'
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'push' },
      onHover: {
        enable: true,
        mode: 'repulse',
        parallax: { enable: false, force: 60, smooth: 10 }
      },
      resize: true
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 200, duration: 0.4 }
    }
  },
  particles: {
    color: { value: '#ffffff' },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'out',
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      animation: {
        enable: true,
        speed: 0.05,
        sync: true,
        startValue: 'max',
        count: 1,
        destroy: 'min'
      },
      value: {
        min: 0,
        max: 0.5
      }
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  }
};