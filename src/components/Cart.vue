<template>
    <div>
        <hr>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in cart" :key="product.id">
                {{ product.title }} - {{ product.price }} - {{ product.quantity }}
            </li>
        </ul>
        <h4>Total: {{ total | currency }}</h4>
        <button @click="$store.dispatch('checkout')">Checkout</button>
        <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
    </div>
</template>

<script>
export default {
    computed: {
        cart() {
            return this.$store.getters.Cart
        },
        total() {
            return this.$store.getters.totalCart
        }
    }
}
</script>

<style>

</style>