/* ============================================================
   Ryan Potter — hero canvas
   The ASCII "fog" canvas behind the hero and page headers. A
   springy comet trail follows the cursor (or drifts on its own
   until the cursor first moves) and reveals a faint grid of
   monospace glyphs around it, with a warm accent at the head.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

class HeroCanvas {
  /* The glyphs scattered across the grid. */
  static glyphCharacters = ['/', '\\', '|', '—', '·', '+', '<', '>', '=', ':', ';', '[', ']', '{', '}', '•', '°', '~', '¬', '╱', '╲', '·', '.', '/', '\\'];

  static cellSize = 22;            /* px between glyph centres        */
  static trailLength = 26;         /* points in the comet chain       */
  static springStrength = 0.14;    /* how hard each point chases      */
  static friction = 0.62;          /* velocity damping per frame      */
  static revealRadius = 185;      /* base glyph-reveal radius        */

  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.hostElement = canvasElement.parentElement;
    this.drawingContext = canvasElement.getContext('2d');
    this.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.columnCount = 0;
    this.rowCount = 0;
    this.glyphGrid = [];

    this.pointer = { x: -9999, y: -9999 };  /* cursor target, host-local   */
    this.glowPower = 0;                     /* 0 = fog hidden, 1 = full    */
    this.glowTween = null;
    this.wavePhase = 0;
    this.pointerHasMoved = false;

    /* The comet trail: each point spring-chases the one before it. */
    this.trailPoints = [];
    for (let pointIndex = 0; pointIndex < HeroCanvas.trailLength; pointIndex += 1) {
      this.trailPoints.push({ x: this.pointer.x, y: this.pointer.y, velocityX: 0, velocityY: 0 });
    }

    this.boundRunFrame = this.runFrame.bind(this);
    this.boundRebuild = this.rebuildGrid.bind(this);
    this.boundHandlePointerMove = this.handlePointerMove.bind(this);
    this.boundRaiseGlow = this.raiseGlow.bind(this);
    this.boundResumeDrift = this.resumeDrift.bind(this);

    this.start();
  }

  /* Measures the host, sizes the canvas for the device pixel ratio
     and reseeds the glyph grid. Called on construction and resize. */
  rebuildGrid() {
    const hostRectangle = this.hostElement.getBoundingClientRect();
    this.canvasWidth = hostRectangle.width;
    this.canvasHeight = hostRectangle.height;
    this.canvasElement.width = this.canvasWidth * this.devicePixelRatio;
    this.canvasElement.height = this.canvasHeight * this.devicePixelRatio;
    this.canvasElement.style.width = this.canvasWidth + 'px';
    this.canvasElement.style.height = this.canvasHeight + 'px';
    this.drawingContext.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0);

    this.columnCount = Math.ceil(this.canvasWidth / HeroCanvas.cellSize) + 1;
    this.rowCount = Math.ceil(this.canvasHeight / HeroCanvas.cellSize) + 1;
    this.glyphGrid = new Array(this.columnCount * this.rowCount);
    for (let cellIndex = 0; cellIndex < this.glyphGrid.length; cellIndex += 1) {
      this.glyphGrid[cellIndex] = Math.floor(Math.random() * HeroCanvas.glyphCharacters.length);
    }

    this.drawingContext.font = '12px ' + getComputedStyle(document.body).getPropertyValue('--mono');
    this.drawingContext.textBaseline = 'middle';
    this.drawingContext.textAlign = 'center';

    /* Seed the trail at centre so it does not swoosh in from a corner. */
    if (this.pointer.x < -9000) {
      this.pointer.x = this.canvasWidth * 0.5;
      this.pointer.y = this.canvasHeight * 0.5;
      for (let pointIndex = 0; pointIndex < this.trailPoints.length; pointIndex += 1) {
        const trailPoint = this.trailPoints[pointIndex];
        trailPoint.x = this.pointer.x;
        trailPoint.y = this.pointer.y;
        trailPoint.velocityX = 0;
        trailPoint.velocityY = 0;
      }
    }
  }

  /* Eases the fog brightness toward a target using the Tween core. */
  animateGlowTo(targetPower, durationMilliseconds) {
    if (this.glowTween) { this.glowTween.cancel(); }
    const startingPower = this.glowPower;
    const change = targetPower - startingPower;
    const self = this;
    this.glowTween = new Tween({
      durationMilliseconds: durationMilliseconds,
      easingFunction: Easing.circOut,
      onUpdate: function (easedProgress) {
        self.glowPower = startingPower + (change * easedProgress);
      }
    }).start();
  }

  raiseGlow() { this.animateGlowTo(1, 1300); }
  lowerGlow() { this.animateGlowTo(0, 2000); }

  /* When the cursor leaves the hero, hand control back to the idle
     drift so the mask cruises around on its own (fog stays lit). */
  resumeDrift() {
    this.pointerHasMoved = false;
    this.raiseGlow();
  }

  handlePointerMove(pointerEvent) {
    const hostRectangle = this.hostElement.getBoundingClientRect();
    this.pointer.x = pointerEvent.clientX - hostRectangle.left;
    this.pointer.y = pointerEvent.clientY - hostRectangle.top;
    this.pointerHasMoved = true;
    this.raiseGlow();
  }

  /* One animation frame: advance the trail, then paint the grid. */
  runFrame() {
    this.wavePhase += 0.006;

    /* Idle Lissajous drift until the visitor first moves the cursor,
       so the fog is alive on load. */
    if (!this.pointerHasMoved && this.canvasWidth) {
      const now = performance.now();
      this.pointer.x = (0.5 + 0.28 * Math.cos(0.0007 * now) * Math.sin(0.0013 * now)) * this.canvasWidth;
      this.pointer.y = (0.5 + 0.20 * Math.cos(0.0011 * now) + 0.08 * Math.cos(0.0023 * now)) * this.canvasHeight;
    }

    /* Advance the spring chain: each point chases the one ahead. */
    for (let pointIndex = 0; pointIndex < HeroCanvas.trailLength; pointIndex += 1) {
      const trailPoint = this.trailPoints[pointIndex];
      const target = pointIndex === 0 ? this.pointer : this.trailPoints[pointIndex - 1];
      const spring = pointIndex === 0 ? 0.42 * HeroCanvas.springStrength : HeroCanvas.springStrength;
      trailPoint.velocityX += (target.x - trailPoint.x) * spring;
      trailPoint.velocityY += (target.y - trailPoint.y) * spring;
      trailPoint.velocityX *= HeroCanvas.friction;
      trailPoint.velocityY *= HeroCanvas.friction;
      trailPoint.x += trailPoint.velocityX;
      trailPoint.y += trailPoint.velocityY;
    }

    this.paintGrid();
    window.requestAnimationFrame(this.boundRunFrame);
  }

  /* Paints every glyph cell whose brightness is above threshold. */
  paintGrid() {
    const context = this.drawingContext;
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex += 1) {
        const cellX = columnIndex * HeroCanvas.cellSize;
        const cellY = rowIndex * HeroCanvas.cellSize;

        /* Ambient diagonal wave band — a slow, very faint shimmer. */
        const wave = Math.sin((columnIndex * 0.45) + (rowIndex * 0.32) - this.wavePhase * 6);
        const ambientBrightness = Math.max(0, wave - 0.72) * 0.18;

        /* Fog reveal: brightest near the trail head, tapering down
           the tail. Track closeness to the head for the accent tint. */
        let fogBrightness = 0;
        let headCloseness = 0;
        if (this.glowPower > 0.01) {
          for (let pointIndex = 0; pointIndex < HeroCanvas.trailLength; pointIndex += 1) {
            const weight = (HeroCanvas.trailLength - pointIndex) / HeroCanvas.trailLength;
            const radius = HeroCanvas.revealRadius * (0.45 + 0.55 * weight);
            const deltaX = cellX - this.trailPoints[pointIndex].x;
            const deltaY = cellY - this.trailPoints[pointIndex].y;
            const distanceSquared = (deltaX * deltaX) + (deltaY * deltaY);
            if (distanceSquared < radius * radius) {
              const falloff = 1 - (Math.sqrt(distanceSquared) / radius);
              const brightness = falloff * falloff * weight;
              if (brightness > fogBrightness) { fogBrightness = brightness; }
              if (pointIndex <= 2 && falloff > headCloseness) { headCloseness = falloff; }
            }
          }
          fogBrightness *= 0.6 * this.glowPower;
        }

        const cellAlpha = Math.max(ambientBrightness, fogBrightness);
        if (cellAlpha < 0.015) { continue; }

        const cellIndex = (rowIndex * this.columnCount) + columnIndex;

        /* "Decode" flicker for strongly lit cells. */
        if (fogBrightness > 0.30 && Math.random() < 0.05) {
          this.glyphGrid[cellIndex] = Math.floor(Math.random() * HeroCanvas.glyphCharacters.length);
        }

        if (headCloseness > 0.55 && fogBrightness > 0.36) {
          context.fillStyle = 'rgba(255,90,31,' + cellAlpha.toFixed(3) + ')';   /* accent at the head */
        } else {
          context.fillStyle = 'rgba(21,23,28,' + cellAlpha.toFixed(3) + ')';    /* ink everywhere else */
        }
        context.fillText(
          HeroCanvas.glyphCharacters[this.glyphGrid[cellIndex]],
          cellX + (HeroCanvas.cellSize / 2),
          cellY + (HeroCanvas.cellSize / 2)
        );
      }
    }
  }

  /* Paints one faint, motionless pass for reduced-motion visitors. */
  paintStaticPass() {
    this.drawingContext.fillStyle = 'rgba(21,23,28,0.04)';
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex += 1) {
        if (((columnIndex + rowIndex) % 7) === 0) {
          this.drawingContext.fillText(
            HeroCanvas.glyphCharacters[((rowIndex * this.columnCount) + columnIndex) % HeroCanvas.glyphCharacters.length],
            (columnIndex * HeroCanvas.cellSize) + (HeroCanvas.cellSize / 2),
            (rowIndex * HeroCanvas.cellSize) + (HeroCanvas.cellSize / 2)
          );
        }
      }
    }
  }

  /* Wires events and starts the animation loop (or the static pass). */
  start() {
    this.rebuildGrid();
    window.addEventListener('resize', this.boundRebuild);
    this.hostElement.addEventListener('mousemove', this.boundHandlePointerMove);
    this.hostElement.addEventListener('mouseenter', this.boundRaiseGlow);
    this.hostElement.addEventListener('mouseleave', this.boundResumeDrift);

    if (MotionPreferences.prefersReducedMotion()) {
      this.paintStaticPass();
      return;
    }

    this.animateGlowTo(1, 2800);
    window.requestAnimationFrame(this.boundRunFrame);
  }
}
