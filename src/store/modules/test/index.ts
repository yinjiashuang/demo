import {Module} from 'vuex';
import TestModuleTypes from '@/store/modules/test/interface.ts';
import RootStateTypes from '@/store/interface.ts';

const testModule: Module<TestModuleTypes, RootStateTypes> = {
    namespaced: import.meta.env.MODE !== 'production',
    state: {
        name: 'testmodule',
        count: 0
    },
    mutations: {
        ADD_COUNT(state) {
            state.count++;
        }
    },
    actions: {},
    modules: {}
};

export default testModule;
