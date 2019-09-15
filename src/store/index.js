import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // = data  
        products: [],
        cart: [],
        checkoutStatus: null
    },

    getters: { // = computed properties
        availableProducts(state, getters) {
            return state.products.filter(product => {
                return product.inventory > 0;
            })
        },
        Cart(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                }
            })
        },
        totalCart(state, getters) {
            return getters.Cart.reduce((total, product) => total + product.price * product.quantity, 0)
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
        buyProducts(context, product) {
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id)
                if (!cartItem) {
                    context.commit('addItem', product.id)
                } else {
                    context.commit('inscreaseQuantity', cartItem)
                }
                context.commit('decreaseProductInventory', product)
            }
        },
        checkout({state, commit}) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    },

    mutations: {
        setProducts(state, products) {
            // update products
            state.products = products
        },
        addItem(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        inscreaseQuantity(state, cartItem) {
            cartItem.quantity++;
        },
        decreaseProductInventory(state, product) {
            product.inventory--;
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
        emptyCart(state) {
            state.cart = []
        }

    }
})