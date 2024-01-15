// filterig categories
const filterContainer = document.querySelector(".filters");
const allProducts = document.querySelector('.products');

function filterCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then((categories) => {
            console.log(categories)
            categories.forEach((category) => {
                filterContainer.innerHTML += `
                <button class="filterBtn">
                    <span>${category}</span>
                </button>
                `;
            })
        })


}

function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => (
            products.forEach(product => {
                console.log(product);

                allProducts.innerHTML += `
                <div class="card productItem">
                <div class="product-photo">
                    <img src="${product.image}" alt="">
                </div>

                <div class="product-info">
                    <h5>${product.title}</h5>
                    <h6>${product.price}</h6>
                    <button>Add to cart</button>
                </div>
            </div>

                `
            })
        ))
}

getProducts()
filterCategories()

console.log('hello')