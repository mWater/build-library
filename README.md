# Build Library

Builds, tests and demos library projects written in js and typescript

To use:

* Add following to package.json:
```
  "scripts": {
    "test": "node_modules/build-library/test-cli",
    "watch": "node_modules/build-library/watch",
    "build": "node_modules/build-library/build",
    "test-browser": "node_modules/build-library/test-browser",
```

* Add `@babel/runtime` as dependency and `typescript` as devdependency.

* Run `npm run test`, `npm run watch`, `npm run build` or `npm run test-browser`