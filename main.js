var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/images/vmSocks-green.jpeg',
        link: 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [{variantId: 2234, variantColor: 'green'}, {variantId: 2235, variantColor: 'blue'}],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
})