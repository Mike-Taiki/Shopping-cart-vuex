import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // = data  
        products: []
    },

    getters: { // = computed properties
        availableProducts(state, getters) {
            return state.products.filter(product => {
                return product.inventory > 0;
            })
        }
    },

    actions: {
        fetchProducts({commit}) {
            return new Promise((resolve, reject) => {
                // make the call
                // run setProducts mutation
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },        
    },

    mutations: {
        setProducts(state, products) {
            // update products
            state.products = products
        }
    }
})