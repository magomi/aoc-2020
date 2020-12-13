Todays goals:
* write tests before code
* well structured code

Just to remember the steps for setting up a TypeScript project:
* init
```
npm init -y
npm install typescript --save-dev
npm install @types/node --save-dev
npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs
npm install ts-node --save-dev
npm install nodemon --save-dev
npm i jest @types/jest ts-jest typescript -D
```
* `jest.config.js`
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
* scripts in `package.json`
```
    "test": "jest",
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
```


I started late with this puzzle and couldn't solve it until now (day 13). 

What I can tell is that my current solution looks far too complicated. And if I've learned something throughout my developers live: if it's a complicated and complex solution then it is the wrong solution.

Hopefully I will get back to this puzzle and finish it.