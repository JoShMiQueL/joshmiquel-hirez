const tsc = require("tsc-prog");
const path = require("path");

tsc.build({
  basePath: path.resolve(__dirname, ".."),
  configFilePath: "tsconfig.json",
  clean: { outDir: true, declarationDir: true },
  bundleDeclaration: {
    entryPoint: "index.d.ts",
  },
});
