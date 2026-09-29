import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const visionDir = resolve(root, 'node_modules/@mediapipe/tasks-vision');
const output = resolve(root, 'dist');

await mkdir(resolve(output, 'mediapipe'), { recursive: true });
await cp(resolve(visionDir, 'wasm'), resolve(output, 'mediapipe/wasm'), { recursive: true });
await mkdir(resolve(output, 'models'), { recursive: true });
await cp(resolve(root, 'models/hand_landmarker.task'), resolve(output, 'models/hand_landmarker.task'));
