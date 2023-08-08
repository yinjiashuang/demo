import {createStore, Store, useStore as baseUseStore} from 'vuex';
import RootStateTypes, {AllStateTypes} from '@/store/interface.ts';
import {InjectionKey} from 'vue';
import testModule from '@/store/modules/test';

export default createStore<RootStateTypes>({
    state: {
        test: 'test'
    },
    mutations: {
        CHANGE_TEST(state, val) {
            state.test = val;
        }
    },
    actions: {},
    modules: {
        testModule
    }
});
export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

export function useStore<T = AllStateTypes>(): Store<T> {
    return baseUseStore<T>(key);
}
