<template>
  <div class="demo-wrapper pt-8">
    <canvas
      id="anime"
      width="400"
      height="300"
      style="border: 1px solid #ccc"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { Polyline } from "fabric/fabric-impl";
import { fabric } from "https://cdn.jsdelivr.net/npm/fabric@5.3.0/+esm";
import { onMounted } from "vue";

// alternative https://github.com/MMF-FE/vite-plugin-cdn-import 开发时使用 node_modules 版本，打包后使用 cdn 版本

function animateWithPolyline() {
  const animateLine = (line: Polyline) => {
    let offset = line.strokeDashOffset || 0;
    if (offset < -15) {
      offset = 0;
    }
    line.set("strokeDashOffset", offset - 0.3);
    fabric.util.requestAnimFrame(animateLine.bind(null, line));
    canvas.renderAll();
  };

  const canvas = new fabric.Canvas("anime", {
    renderOnAddRemove: false,
    selection: false,
    containerClass: "canvas-wrapper",
  });

  const line = new fabric.Polyline(
    [
      { x: 20, y: 20 },
      { x: 390, y: 200 },
      { x: 400, y: 300 },
      { x: 150, y: 250 },
      { x: 20, y: 20 },
    ],
    {
      strokeDashArray: [10, 5],
      stroke: "cyan",
      strokeWidth: 4,
      fill: "transparent",
    }
  );

  canvas.add(line);
  animateLine(line);
}

onMounted(() => {
  animateWithPolyline();
});
</script>

<style lang="css" scoped>
:deep(.canvas-wrapper) {
  @apply m-auto;
}
</style>
