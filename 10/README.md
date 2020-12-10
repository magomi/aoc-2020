Yesterdays attempt to use TypeScript went better than I thaugt. At least regarding that I was able to solve the puzzle and not regarding to write beautfiul code. Keep in mind that I am the noobest noob in programming TypeScript one can imagine.

So for today the goal is to introduce unit tests.

How to setup unit testing for TypeScript:

* see https://basarat.gitbook.io/typescript/intro-1/jest for details
* init it whith the following commands

```
npm i jest @types/jest ts-jest typescript -D
```

* create/modify `jest.config.js`

```
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
```

* add `"test": "jest"` to the scripts of your `package.json`
* run it with `npm t` or `npm t -- --watch` or `npx jest --watch`
