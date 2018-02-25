# karma-coverage-test
This project shows a difference in generated map files when using `gulp-typescript`/`gulp-ng-annotate` vs. vanilla
`tsc`.

## gulp-typescript/gulp-ng-annotate
Build this simple project with these tools like so:

```bash
npm install
gulp build-gulp-typescript
```

This compiles two typescript files in `src/app/` and runs a simple unit test.  `karma-coverage` and
`karma-remap-istanbul` are used to generate an HTML report showing code coverage mapped to the original
`*.ts` files.  Unfortunately, the report is broken, containing broken links, absolute paths, and coverage
against a mix of `*.js` and `*.ts` files.

This appears to be because the generated map files aren't right.  When using this build setup, the map file for
`test.js` looks like this:

```json
{
   "version": 3,
   "sources": [
      "app/test.controller.js",
      "../src/app/test.controller.ts"
   ],
   "names": [],
   "mappings": "AAAA,OAAO,CAAC,WAAW,YAAY,UAAU,SAAS,SAAS;IACvD;IACA,OAAO,eAAe,SAAS,cAAc,EAAE,OAAO;;sDCA1D,IAAA,gCAAA,YAAA;QAEI,SAAA,eAAoB,aAAwB;YAAxB,KAAA,cAAA;;QAGpB,eAAA,UAAA,aAAA,UAAW,MAAa;YACpB,OAAO,KAAK,YAAY,WAAW;;QAE3C,OAAA;;IDEI,QAAQ,UAAU;ICAtB,QAAQ,OAAO,WAAW,WAAW,kBAAkB;;ADGvD",
   "file": "test.controller.js",
   "sourcesContent": [
      "define([\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    var TestController = /** @class */ (function () {\n        function TestController(UtilService) {\n            this.UtilService = UtilService;\n        }\n        TestController.prototype.returnFive = function (doIt) {\n            return this.UtilService.returnFive(doIt);\n        };\n        return TestController;\n    }());\n    exports.default = TestController;\n    angular.module('testMod').controller('TestController', TestController);\n});\n",
      "import UtilService from './util.service';\n\nexport default class TestController {\n\n    constructor(private UtilService: UtilService) {\n    }\n\n    returnFive(doIt: boolean): number {\n        return this.UtilService.returnFive(doIt);\n    }\n}\n\nangular.module('testMod').controller('TestController', TestController);\n"
   ]
}
```

I'm assuming it's related, but another problem is that the report erroneously omits code coverage for some lines in the
`*.ts` files.  It appears to be consistent (in a larger project):  conditionals such as `if` statements, as well as
`return` statements.

Finally, also note that the unmapped coverage report (if you run this locally, it will be put into
`coverage/lcov/lcov-report/`) is correct.  It's the mapping to the original `.ts` files that's broken.

### tsc
Build this simple project with vanilla tsc like so:

```bash
npm install
gulp build-tsc
```

This does the same steps as above to generate a coverage report mapped to the original `*.ts` files.  However,
with this setup, the coverage report is correct.

When using vanilla tsc, the map file for `test.js` looks like this:

```json
{
   "version": 3,
   "file": "test.controller.js",
   "sourceRoot": "",
   "sources": [
      "../../src/app/test.controller.ts"
   ],
   "names": [],
   "mappings": ";;;IAEA;QAEI,wBAAoB,WAAwB;YAAxB,gBAAW,GAAX,WAAW,CAAa;QAC5C,CAAC;QAED,mCAAU,GAAV,UAAW,IAAa;YACpB,MAAM,CAAC,IAAI,CAAC,WAAW,CAAC,UAAU,CAAC,IAAI,CAAC,CAAC;QAC7C,CAAC;QACL,qBAAC;IAAD,CAAC,AARD,IAQC;;IAED,OAAO,CAAC,MAAM,CAAC,SAAS,CAAC,CAAC,UAAU,CAAC,gBAAgB,EAAE,cAAc,CAAC,CAAC"
}
```

Note:
* The lack of the `.js` file in the `sources` section
* The different source path for the `.ts` file
* Unlike when using `gulp-typescript`/`gulp-ng-annotate`, the coverage report correctly flags all lines as
either covered or not.
