// filterig categories
const filterContainer = document.querySelector(".filters");
const allProducts = document.querySelector('.products');
// let searchInput = document.querySelector('.searchInput');
let searchInput = document.querySelector(".searchInput")


// search()
getProducts()
filterCategories()
getCategory();



// function search() {

//     searchInput.addEventListener('keyup', (e) => {
//         e.preventDefault();
//         console.log(e.target.value);

//     })
// }


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
    // search
    searchInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        var inputs = e.target.value;
    })

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => (
            products.forEach(product => {

                console.log(product);
                const { image, title, price } = product;

                title.filter((searched) => {
                    if (searched == inputs) {
                        inputs.style.color = "orange"
                    }
                })

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
        getCategories = '/';
        // console.log(getCategories)
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