# karma-coverage-test
This project shows a difference in generated map files when using gulp-typescript/ngAnnotate vs. vanilla tsc.

## gulp-typescript/ngAnnotate
When using this build setup, the map file for `test.js` looks like this:

```json
{
   "version": 3,
   "sources": [
      "app/test.js",
      "../src/app/test.ts"
   ],
   "names": [],
   "mappings": "AAAA,OAAO,CAAC,WAAW,YAAY,UAAU,SAAS,SAAS;IACvD;IACA,OAAO,eAAe,SAAS,cAAc,EAAE,OAAO;;qCCA1D,IAAA,sBAAA,YAAA;QAEI,SAAA,KAAoB,MAAU;YAAV,KAAA,OAAA;;QAGpB,KAAA,UAAA,aAAA,UAAW,MAAa;YACpB,OAAO,KAAK,KAAK,WAAW;;QAEpC,OAAA;;IDEI,QAAQ,UAAU;ICAtB,QAAQ,OAAO,WAAW,WAAW,QAAQ;;ADG7C",
   "file": "test.js",
   "sourcesContent": [
      "define([\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    var Test = /** @class */ (function () {\n        function Test(Util) {\n            this.Util = Util;\n        }\n        Test.prototype.returnFive = function (doIt) {\n            return this.Util.returnFive(doIt);\n        };\n        return Test;\n    }());\n    exports.default = Test;\n    angular.module('testMod').controller('test', Test);\n});\n",
      "import Util from './util';\r\n\r\nexport default class Test {\r\n\r\n    constructor(private Util: Util) {\r\n    }\r\n\r\n    returnFive(doIt: boolean): number {\r\n        return this.Util.returnFive(doIt);\r\n    }\r\n}\r\n\r\nangular.module('testMod').controller('test', Test);\r\n"
   ]
}
```

### tsc
When using vanilla tsc, the map file for `test.js` looks like this:

```json
{
"version": 3,
"file": "test.js",
"sourceRoot": "",
"sources": [
   "../../src/app/test.ts"
],
"names": [],
"mappings": ";;;IAEA;QAEI,cAAoB,IAAU;YAAV,SAAI,GAAJ,IAAI,CAAM;QAC9B,CAAC;QAED,yBAAU,GAAV,UAAW,IAAa;YACpB,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,UAAU,CAAC,IAAI,CAAC,CAAC;QACtC,CAAC;QACL,WAAC;IAAD,CAAC,AARD,IAQC;;IAED,OAAO,CAAC,MAAM,CAAC,SAAS,CAAC,CAAC,UAAU,CAAC,MAAM,EAAE,IAAI,CAAC,CAAC"
}
```
