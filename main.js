var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        link: 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {variantId: 2234, variantColor: 'green', variantImage: './assets/images/vmSocks-green.jpeg', variantQuantity: 10}, 
            {variantId: 2235, variantColor: 'blue', variantImage: './assets/images/vmSocks-blue.jpeg', variantQuantity: 0}
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        onSale: true,
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart++;
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);            
        },
        removeFromCart: function() {
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
            return  this.brand + ' ' + this.product + ' are not on sale'
        }
    }
})