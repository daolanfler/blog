<template>
  <div class="demo-wrapper pt-8">
    <canvas
      id="canvas"
      width="300"
      height="300"
      class="m-auto bg-white"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

interface Point {
  x?: number;
  y?: number;
}

let canvas: HTMLCanvasElement;

onMounted(() => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  function animate() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctx.save();
    ctx.clearRect(0, 0, 300, 300);

    ctx.translate(150, 150);
    ctx.rotate(-Math.PI / 2);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.save();
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.lineWidth = 3;
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 30);
      ctx.moveTo(110, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.rotate(
      hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
    );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(105, 0);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.rotate((Math.PI / 30) * sec);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(110, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore();
    requestAnimationFrame(animate);
  }
  animate();
});
</script>

<style scoped></style>
