# Testing AgentOS

Delete or make working `client.ts` or `server.ts`


Fix:

```bash
me@DESKTOP-2QD9KQQ MINGW64 ~/work/ai/rivet-agentos
$ npm start

> start
> cross-env NODE_OPTIONS=--experimental-sqlite npx tsx main.ts

(node:50156) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
node:events:496
      throw er; // Unhandled 'error' event
      ^

Error: spawn secure-exec-v8 ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:285:19)
    at onErrorNT (node:internal/child_process:483:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
Emitted 'error' event on ChildProcess instance at:
    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
    at onErrorNT (node:internal/child_process:483:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn secure-exec-v8',
  path: 'secure-exec-v8',
  spawnargs: []
}

Node.js v22.11.0

```