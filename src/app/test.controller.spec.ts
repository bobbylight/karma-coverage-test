import TestController from './test.controller';
import UtilService from './util.service';
import { IControllerService } from 'angular';

describe('test', () => {

    let $controller: IControllerService,
        UtilService: UtilService;

    // load the module
    beforeEach(() => {
        angular.mock.module('testMod');
    });

    const createController: () => TestController = () => {
        return $controller('TestController', {
            UtilService: UtilService
        });
    };

    beforeEach(angular.mock.inject((_$controller_: IControllerService, _UtilService_: UtilService) => {
        $controller = _$controller_;
        UtilService = _UtilService_;
    }));

    it('returnFive() should return 5', () => {
        const controller: TestController = createController();
        expect(controller.returnFive(true)).toBe(5);
    });
});