import p5 from "p5";
import React, { useEffect, useRef } from "react";

export const HeroCaCanvas: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inst = new p5((p: p5) => {
      const CELL = 12;
      const INK: [number, number, number] = [30, 30, 36];
      const PAPER: [number, number, number] = [243, 242, 238];

      // Pure math hash — no p5 needed
      function hash(n: number): number {
        const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
        return s - Math.floor(s);
      }

      function typeGlyph(
        ch: string,
        cx: number,
        cy: number,
        seed: number,
        a = 1,
      ) {
        const h1 = hash(seed),
          h2 = hash(seed + 17.3);
        const px = cx * CELL + CELL / 2 + (h1 - 0.5) * 1.4;
        const py = cy * CELL + CELL / 2 + (h2 - 0.5) * 1.4;
        p.fill(INK[0], INK[1], INK[2], (160 + 80 * h1) * a);
        p.text(ch, px, py);
      }

      function overlap(
        a: { x: number; y: number; w: number; h: number },
        b: { x: number; y: number; w: number; h: number },
        m: number,
      ): boolean {
        return !(
          a.x + a.w + m <= b.x ||
          b.x + b.w + m <= a.x ||
          a.y + a.h + m <= b.y ||
          b.y + b.h + m <= a.y
        );
      }

      class Cluster {
        id: number;
        kind: string;
        x: number;
        y: number;
        w: number;
        h: number;
        speed: number;
        warm: number;
        stall: number;
        lastKey: string;
        glyphs: string[];
        rule?: number;
        L?: number;
        H?: number;
        line?: number[];
        hist?: number[][];
        dir?: number;
        states?: number;
        grid?: number[][];
        band?: number;
        len?: number;

        constructor(
          id: number,
          kind: string,
          x: number,
          y: number,
          w: number,
          h: number,
          opts: Record<string, number> = {},
        ) {
          this.id = id;
          this.kind = kind;
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          if (opts.band !== undefined) this.band = opts.band;
          if (opts.len !== undefined) this.len = opts.len;
          this.speed = Math.floor(p.random(1, 4));
          this.warm = Math.floor(p.random(2, 16));
          this.stall = 0;
          this.lastKey = "";
          this.glyphs = p.random([
            ["·", "-", "=", "+", "x", "X", "#", "%", "@"],
            [".", ":", "/", "x", "X", "#", "#", "@", "@"], // fixed: was #' missing opening quote
            [",", "-", "o", "O", "0", "8", "#", "@", "@"],
          ]);
          if (kind === "elementary" || kind === "diagonal") {
            this.rule = p.random([30, 45, 73, 90, 105, 110, 150, 182]);
            this.L = kind === "diagonal" ? this.band! : w;
            this.H = kind === "diagonal" ? this.len! : h;
            this.line = Array.from({ length: this.L }, () =>
              p.random() < 0.5 ? 1 : 0,
            );
            this.hist = [this.line];
            this.dir = p.random() < 0.5 ? 1 : -1;
            this.warm = this.H;
          } else {
            this.states = kind === "cyclic" ? Math.floor(p.random(4, 7)) : 3;
            this.seedGrid();
          }
        }

        seedGrid() {
          const density: Record<string, number> = {
            life: 0.35,
            seeds: 0.12,
            brain: 0.3,
            majority: 0.5,
          };
          const d = density[this.kind];
          this.grid = [];
          for (let j = 0; j < this.h; j++) {
            this.grid.push([]);
            for (let i = 0; i < this.w; i++) {
              this.grid[j].push(
                this.kind === "cyclic"
                  ? Math.floor(p.random(this.states!))
                  : p.random() < d
                    ? 1
                    : 0,
              );
            }
          }
        }

        count(i: number, j: number, test: (v: number) => boolean): number {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const a = i + dx,
                b = j + dy;
              if (
                a >= 0 &&
                a < this.w &&
                b >= 0 &&
                b < this.h &&
                test(this.grid![b][a])
              )
                n++;
            }
          }
          return n;
        }

        step() {
          if (this.hist) return this.step1D();
          const nx: number[][] = [];
          for (let j = 0; j < this.h; j++) {
            nx.push([]);
            for (let i = 0; i < this.w; i++) {
              const s = this.grid![j][i];
              let v = 0;
              switch (this.kind) {
                case "life": {
                  const n = this.count(i, j, (c) => c === 1);
                  v =
                    (s === 1 && (n === 2 || n === 3)) || (s === 0 && n === 3)
                      ? 1
                      : 0;
                  break;
                }
                case "seeds": {
                  v =
                    s === 0 && this.count(i, j, (c) => c === 1) === 2 ? 1 : 0;
                  break;
                }
                case "brain": {
                  v =
                    s === 1
                      ? 2
                      : s === 2
                        ? 0
                        : this.count(i, j, (c) => c === 1) === 2
                          ? 1
                          : 0;
                  break;
                }
                case "cyclic": {
                  const nextS = (s + 1) % this.states!;
                  v =
                    this.count(i, j, (c) => c === nextS) > 0 ? nextS : s;
                  break;
                }
                case "majority": {
                  const t = this.count(i, j, (c) => c === 1) + s;
                  v = [4, 6, 7, 8, 9].includes(t) ? 1 : 0;
                  break;
                }
              }
              nx[j].push(v);
            }
          }
          this.grid = nx;
          const key = nx.flat().join("");
          const pop = nx.flat().filter((v) => v > 0).length;
          this.stall = key === this.lastKey ? this.stall + 1 : 0;
          this.lastKey = key;
          if (pop < 3 || this.stall > 5) this.sprinkle();
        }

        sprinkle() {
          for (let k = 0; k < 4 + Math.floor(p.random(4)); k++) {
            const i = Math.floor(p.random(this.w)),
              j = Math.floor(p.random(this.h));
            this.grid![j][i] =
              this.kind === "cyclic"
                ? Math.floor(p.random(this.states!))
                : 1 - (this.grid![j][i] ? 1 : 0);
          }
          this.stall = 0;
        }

        step1D() {
          const L = this.L!,
            pr = this.line!,
            n: number[] = [];
          for (let i = 0; i < L; i++) {
            const idx =
              (pr[(i - 1 + L) % L] << 2) |
              (pr[i] << 1) |
              pr[(i + 1) % L];
            n.push((this.rule! >> idx) & 1);
          }
          if (n.every((v) => v === n[0])) n[Math.floor(p.random(L))] ^= 1;
          this.line = n;
          this.hist!.push(n);
          if (this.hist!.length > this.H!) this.hist!.shift();
        }

        draw() {
          const base = this.id * 9973;
          if (this.hist) return this.draw1D(base);
          for (let j = 0; j < this.h; j++) {
            for (let i = 0; i < this.w; i++) {
              const s = this.grid![j][i];
              if (!s) continue;
              const cx = this.x + i,
                cy = this.y + j;
              const seed = base + i * 131 + j * 71;
              switch (this.kind) {
                case "life": {
                  const n = this.count(i, j, (c) => c === 1);
                  typeGlyph(this.glyphs[n], cx, cy, seed);
                  if (n >= 4)
                    typeGlyph(
                      p.random(["/", "\\", "-"]),
                      cx,
                      cy,
                      seed + 3,
                      0.7,
                    );
                  break;
                }
                case "seeds":
                  typeGlyph(hash(seed) < 0.5 ? "o" : "*", cx, cy, seed);
                  break;
                case "brain":
                  typeGlyph(s === 1 ? "#" : "/", cx, cy, seed, s === 1 ? 1 : 0.5);
                  break;
                case "cyclic": {
                  const set = ["", ".", "-", "=", "x", "#", "%"];
                  typeGlyph(
                    set[s % set.length],
                    cx,
                    cy,
                    seed,
                    0.6 + (0.4 * s) / this.states!,
                  );
                  break;
                }
                case "majority": {
                  const n = this.count(i, j, (c) => c === 1);
                  p.fill(INK[0], INK[1], INK[2], 200);
                  p.noStroke();
                  p.circle(
                    cx * CELL + CELL / 2,
                    cy * CELL + CELL / 2,
                    2.5 + n * 0.55,
                  );
                  break;
                }
              }
            }
          }
        }

        draw1D(base: number) {
          this.hist!.forEach((row, t) =>
            row.forEach((v, i) => {
              if (!v) return;
              const seed = base + i * 131 + t * 71;
              if (this.kind === "elementary") {
                typeGlyph(
                  hash(seed) < 0.7 ? ":" : "|",
                  this.x + i,
                  this.y + t,
                  seed,
                );
              } else {
                const off = this.dir! > 0 ? t : this.H! - 1 - t;
                typeGlyph(
                  this.dir! > 0 ? "\\" : "/",
                  this.x + i + off,
                  this.y + t,
                  seed,
                );
              }
            }),
          );
        }
      }

      let cols = 0,
        rows = 0;
      let clusters: Cluster[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let paperG: any;

      function makePaper() {
        const g = p.createGraphics(p.width, p.height);
        g.pixelDensity(2);
        g.background(PAPER[0], PAPER[1], PAPER[2]);
        g.noStroke();
        for (let i = 0; i < 9000; i++) {
          g.fill(0, p.random(4, 12));
          g.rect(p.random(p.width), p.random(p.height), 1, 1);
        }
        g.fill(INK[0], INK[1], INK[2], 150);
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            g.circle(
              i * CELL + CELL / 2 + p.random(-0.3, 0.3),
              j * CELL + CELL / 2 + p.random(-0.3, 0.3),
              1.4,
            );
          }
        }
        g.textFont("Courier New");
        g.textAlign(p.CENTER, p.CENTER);
        g.fill(INK[0], INK[1], INK[2], 170);
        g.textSize(CELL * 0.9);
        for (let j = 4; j < rows; j += 8) {
          g.text("x", CELL * 0.5, j * CELL + CELL / 2);
        }
        g.textSize(CELL * 0.6);
        for (let k = 0; k < 4; k++) {
          g.text(
            Math.floor(p.random(1, 6)) * 10,
            Math.floor(p.random(4, cols - 2)) * CELL,
            Math.floor(p.random(3, rows - 3)) * CELL + CELL / 2,
          );
        }
        return g;
      }

      function generate() {
        clusters = [];
        const kinds = [
          "life",
          "life",
          "seeds",
          "cyclic",
          "brain",
          "majority",
          "elementary",
          "diagonal",
        ];
        const target = Math.floor(p.random(7, 11));
        let tries = 0;
        while (clusters.length < target && tries++ < 500) {
          const kind = p.random(kinds);
          let w: number, h: number;
          const opts: Record<string, number> = {};
          if (kind === "elementary") {
            w = Math.floor(p.random(5, 10));
            h = Math.floor(p.random(14, 30));
          } else if (kind === "diagonal") {
            opts.band = Math.floor(p.random(3, 6));
            opts.len = Math.floor(p.random(8, 18));
            w = opts.band + opts.len;
            h = opts.len;
          } else {
            w = Math.floor(p.random(5, 14));
            h = Math.floor(p.random(4, 12));
          }
          const x = Math.floor(p.random(4, cols - w - 2));
          const y = Math.floor(p.random(3, rows - h - 3));
          const r = { x, y, w, h };
          if (clusters.some((c) => overlap(c, r, 2))) continue;
          clusters.push(
            new Cluster(clusters.length, kind, x, y, w, h, opts),
          );
        }
        // fixed bug: c.ste) → c.step()
        clusters.forEach((c) => {
          for (let i = 0; i < c.warm; i++) c.step();
        });
        paperG = makePaper();
      }

      p.setup = () => {
        const w = el.clientWidth || window.innerWidth;
        const h = el.clientHeight || window.innerHeight;
        p.createCanvas(w, h);
        p.pixelDensity(2);
        p.textFont("Courier New");
        p.textStyle(p.BOLD);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(CELL * 1.05);
        cols = Math.floor(p.width / CELL);
        rows = Math.floor(p.height / CELL);
        p.frameRate(8);
        generate();
      };

      p.draw = () => {
        p.image(paperG, 0, 0);
        clusters.forEach((c) => {
          if (p.frameCount % c.speed === 0) c.step();
        });
        clusters.forEach((c) => c.draw());
      };

      p.keyPressed = () => {
        if (p.key === " ") generate();
        if (p.key === "p" || p.key === "P") {
          // pause toggled by key only
        }
        if (p.key === "s" || p.key === "S")
          p.saveCanvas("typewriter-ca", "png");
      };

      p.windowResized = () => {
        const w = el.clientWidth || window.innerWidth;
        const h = el.clientHeight || window.innerHeight;
        p.resizeCanvas(w, h);
        cols = Math.floor(p.width / CELL);
        rows = Math.floor(p.height / CELL);
        generate();
      };
    }, el);

    return () => inst.remove();
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, ...style }}
    />
  );
};
