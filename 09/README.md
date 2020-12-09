Will try to solve todays puzzle using TypeScript.

How to setup a TypeScript project:

* see https://basarat.gitbook.io/typescript/ for details
* create a folder containing your project (don't name it `typescript`, this will clash with the installation of the typescript module later)
* init it whith the following commands (assuming, you have recent version os `node`, `npm` and `npx` installed)

```
npm init -y
npm install typescript --save-dev
npm install @types/node --save-dev
npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs
npm install ts-node --save-dev
npm install nodemon --save-dev
mkdir src
```

* store all your sources in the source folder
* add the following to the scripts of your `package.json`

```
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
```

* this will use `src/index.ts` as the entry point of your project 
* call `npm start` to execute it