<template>
  <div>
      <h1>Product List</h1>
    <img 
        v-if="loading"
        src="https://a.disquscdn.com/get?url=http%3A%2F%2Fimgur.com%2FJfPpwOA.gif&key=wUJUXMr1tp11IuGb__NNSA&w=800&h=100" 
        alt="">
      <ul v-else>
          <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price | currency }} - {{  product.inventory }}
              <button @click="addProduct(product)">Add to cart</button>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    
    computed: {
        products() {
            return this.$store.getters.availableProducts
        },
    },

    created() {
        this.loading = true;
        this.$store.dispatch('fetchProducts')
            .then(() => {
                this.loading = false
            })
    },
    methods: {
        addProduct(product) {
            this.$store.dispatch('buyProducts', product)
        }
    }
}
</script>

<style>

</style>