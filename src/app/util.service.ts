export default class UtilService {
    
    returnFive(b: boolean): number {
        // This method is written verbosely because building with gulp-typescript/gulp-ng-annotate will result in
        // the "if (b)" line not having coverage info, whereas when building with vanilla tsc, it will
        if (b) {
            return 5;
        }
        return 0;
    }
};

angular.module('testMod').service('UtilService', UtilService);
