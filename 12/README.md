While day 11 was a complete desaster I decided to move forward and go back to the missing puzzle later on.

What I have learned by now:
* programming TypeScript makes a lot of fun
* it is hard not to implement solutions the way you would do it in the languages you already know
* I need to learn more/better how the different patterns are used in TypeScript
* I have no glue what the best practices are when programming TypeSkript
  * var/let/const
  * classes vs. types
  * different loop types
  * functions
  * ...

So, lets start a new day of learning and hopefully improving my skills.

# Setup

* copy the following into  `package.json`
```
{
  "name": "aoc2020-day12",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^26.0.19",
    "@types/node": "^14.14.12",
    "jest": "^26.6.3",
    "nodemon": "^2.0.6",
    "ts-jest": "^26.4.4",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.2"
  }
}
```
* install dependencies with running  `npm i` 
* run `npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs` to create a config for TypeScript

* configure jest: create `jest.config.js` with the following content
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