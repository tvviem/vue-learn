Vue.config.devtools = true
Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
            <p>Shipping: <b>{{ shipping }} </b></p>

            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)">
            </div>
            <p>
                Size:
                <span v-for="(s, idx) in sizes">
                    {{ s }} <span v-if="idx < sizes.length - 1">, </span>
                </span>
            </p>
            <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to cart</button>
            
            <button @click="removeFromCart">Rm fro-cart </button>
        </div>
    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            link: 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [{
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/images/vmSocks-green.jpeg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/images/vmSocks-blue.jpeg',
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            onSale: true
        }
    } ,
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99;
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
                 break; // to remove each item
              }
            }
        }
    }
})