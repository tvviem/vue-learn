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
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
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
            onSale: true,
            cart: 0
        }
    } ,
    methods: {
        addToCart() {
            this.cart++;
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        removeFromCart: function () {
            this.cart -= 1;
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
        premium: true
    }
})