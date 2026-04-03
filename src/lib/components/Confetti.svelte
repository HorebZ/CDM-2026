<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    active?: boolean;
  }

  const { active = false }: Props = $props();

  let canvas: HTMLCanvasElement = $state()!;
  let animationId: number = 0;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    width: number;
    height: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    fadeSpeed: number;
  }

  const COLORS = [
    '#002395', // bleu France
    '#ED2939', // rouge France
    '#FFFFFF', // blanc France
    '#FFD700', // or trophée
    '#00C2FF',
    '#FF6B6B',
    '#A8FF78',
    '#FFC6FF',
  ];

  const MAX_PARTICLES = 400;

  function createParticle(w: number): Particle {
    return {
      x: Math.random() * w,
      y: -10,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: Math.random() * 10 + 5,
      height: Math.random() * 6 + 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
      fadeSpeed: Math.random() * 0.008 + 0.004,
    };
  }

  function start(ctx: CanvasRenderingContext2D) {
    const particles: Particle[] = [];
    let lastSpawn = 0;

    function loop(ts: number) {
      animationId = requestAnimationFrame(loop);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ts - lastSpawn > 40 && particles.length < MAX_PARTICLES) {
        for (let i = 0; i < 4; i++) {
          particles.push(createParticle(canvas.width));
        }
        lastSpawn = ts;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0 || p.y > canvas.height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
    }

    animationId = requestAnimationFrame(loop);
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    }
  }

  $effect(() => {
    if (active) {
      if (animationId) stop();
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        start(ctx);
      }
    } else {
      stop();
    }
  });

  onMount(() => {
    const onResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      stop();
    };
  });

</script>

{#if active}
  <canvas bind:this={canvas} class="confetti-canvas" aria-hidden="true"></canvas>
{/if}

<style>
  .confetti-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
  }
</style>
