import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const wasmDir = resolve('node_modules/@mediapipe/tasks-vision/wasm');
const wasmFiles = new Set([
  'vision_wasm_internal.js', 'vision_wasm_internal.wasm',
  'vision_wasm_module_internal.js', 'vision_wasm_module_internal.wasm',
  'vision_wasm_nosimd_internal.js', 'vision_wasm_nosimd_internal.wasm',
]);

export default defineConfig({
  base: '/',
  publicDir: false,
  build: { outDir: 'dist', emptyOutDir: true },
  plugins: [{
    name: 'mediapipe-wasm-dev-assets',
    configureServer(server) {
      server.middlewares.use('/mediapipe/wasm', async (req, res, next) => {
        const name = decodeURIComponent((req.url || '').split('?')[0].replace(/^\//, ''));
        if (!wasmFiles.has(name)) return next();
        try {
          const body = await readFile(resolve(wasmDir, name));
          res.setHeader('Content-Type', name.endsWith('.wasm') ? 'application/wasm' : 'text/javascript; charset=utf-8');
          res.end(body);
        } catch (error) { next(error); }
      });
    },
  }],
});
