import TestModuleTypes from '@/store/modules/test/interface.ts';

export default interface RootStateTypes {
    test: string;
}

export interface AllStateTypes extends RootStateTypes {
    testModule: TestModuleTypes;
}

