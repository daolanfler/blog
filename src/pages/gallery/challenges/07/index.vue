<template>
  <div class="demo-wrapper pt-8">
    <canvas
      id="canvas"
      width="500"
      height="500"
      class="m-auto bg-white"
    ></canvas>

    <div class="mt-6 text-center">
      <button class="btn-primary mr-4" @click="save">
        保存
      </button>
      <button class="btn" @click="reset">
        重置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

interface Point {
  x?: number;
  y?: number;
}

let canvas: HTMLCanvasElement;

function save() {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.download = "画板";
  a.click();
}

function reset() {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // or ctx.clearRect(0, 0, canvas.width, canvas.height);
}

onMounted(() => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  let startPoint: Point = { x: undefined, y: undefined };
  let painting = false;
  canvas.onmousedown = e => {
    painting = true;
    const { offsetX, offsetY } = e;
    startPoint.x = offsetX;
    startPoint.y = offsetY;
  };

  // mobile
  canvas.ontouchstart = (e: TouchEvent) => {
    painting = true;
    const { clientX, clientY } = e.touches[0];
    const { left, top } = canvas.getBoundingClientRect();
    startPoint.x = clientX - left;
    startPoint.y = clientY - top;
  };

  canvas.onmousemove = e => {
    if (!painting) return;
    const newPoint: Required<Point> = { x: e.offsetX, y: e.offsetY };

    drawLine(startPoint.x!, startPoint.y!, newPoint.x, newPoint.y);
    startPoint = newPoint;
  };

  // mobile
  canvas.ontouchmove = (e: TouchEvent) => {
    if (!painting) return;
    const { clientX, clientY } = e.touches[0];
    const { left, top } = canvas.getBoundingClientRect();
    const newPoint: Required<Point> = {
      x: clientX - left,
      y: clientY - top
    };

    drawLine(startPoint.x!, startPoint.y!, newPoint.x, newPoint.y);
    startPoint = newPoint;
  };

  canvas.onmouseup = e => {
    painting = false;
  };

  // mobile
  canvas.ontouchend = e => {
    painting = false;
  };

  function drawLine(
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
  ) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.closePath();
  }
});
</script>

<style scoped></style>
