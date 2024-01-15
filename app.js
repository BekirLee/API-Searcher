// filterig categories
const filterContainer = document.querySelector(".filters");
const allProducts = document.querySelector('.products');

getProducts()
filterCategories()
getCategory();


function filterCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then((categories) => {
            console.log(categories)
            categories.forEach((category) => {
                filterContainer.innerHTML += `
                <button class="filterBtn" onclick="getCategory(this)">
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
                const { image, title, price } = product;

                allProducts.innerHTML += `
                <div class="productItem">
                <div class="productPhoto">
                    <img src="${image}" alt="">
                </div>

                <div class="product-info">
                    <h5 class='productTitle' >${title.slice(0, 20).concat('...')}</h5>
                    <h6 class='productPrice' >$ ${price}</h6>
                    <button>Add to cart</button>
                </div>
            </div>
                `
            })
        ))
}



function getCategory(categoryProducts) {
    let getCategories = categoryProducts.textContent.trim();
    // console.log(categoryProducts.innerHTML.trim())
    if (getCategories == 'All') {
        // getCategories = '/';
        console.log(getCategories)
    }
    else {
        getCategories = `category/${getCategories}`;
    }

    fetch(`https://fakestoreapi.com/products/${getCategories}`)
        .then(res => res.json())
        .then(products => {
            allProducts.innerHTML = '';
            products.forEach(product => {

                const { image, title, price } = product;
                console.log(allProducts);
                allProducts.innerHTML += `
                    <div class="productItem">
                    <div class="productPhoto">
                        <img src="${image}" alt="">
                    </div>
    
                    <div class="product-info">
                        <h5 class='productTitle' >${title.slice(0, 20).concat('...')}</h5>
                        <h6 class='productPrice' >$ ${price}</h6>
                        <button>Add to cart</button>
                    </div>
                </div>
    
                    `
            })
        })
}
// console.log('hello')