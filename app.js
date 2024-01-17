// filterig categories
const filterContainer = document.querySelector(".filters");
const allProducts = document.querySelector('.products');
let searchInput = document.querySelector(".searchInput")
const productTitle = document.querySelector(".productTitle");
const basketMenu = document.querySelector(".basketMenu")

let searchArr = [];


getProducts();
search();
filterCategories();
getCategory();

function getProducts() {

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => (
            getData(products)

        ))
    // console.log(searchArr);
}

function getData(products) {
    products.forEach(product => {

        // console.log(product);

        // pushing all products to arr

        searchArr.push(product);


        const { image, title, price } = product;

        allProducts.innerHTML += `
        <div class="productItem">
        <div class="productPhoto">
            <img src="${image}" alt="">
        </div>

        <div class="product-info">
            <h5 class='productTitle' >${title.slice(0, 20).concat('...')}</h5>
            <h6 class='productPrice' >$ ${price}</h6>
                <button onclick="addToCart('${title}','${image}','${price}')">Add to cart</button>
        </div>
    </div>
    `
    })
}

// search

function search() {
    // console.log(searchArr);
    searchInput.addEventListener('keyup', (e) => {
        // e.preventDefault();
        const searchText = e.target.value.toLowerCase();
        const filteredProducts = searchArr.filter(product => {
            // console.log(searchText);
            return product.title.toLowerCase().includes(searchText)
            // console.log(product.title.toLowerCase())
        });

        if (filteredProducts.length == 0) {
            alert('no products like that! ');

        }
        else {
            displayProducts(filteredProducts);
            console.log(filteredProducts);
        }

    });
}

function displayProducts(filtered) {
    allProducts.innerHTML = '';

    filtered.forEach(product => {
        // productTitle.classList.add("active");

        // console.log(filtered);
        // console.log(searchArr);

        const { image, title, price } = product;

        allProducts.innerHTML += `
            <div class="productItem">
               <div class="productPhoto">
                   <img src="${image}" alt="">
               </div>
       
               <div class="product-info">
                   <h5 class='productTitle highlighted'>${title.slice(0, 20).concat('...')}</h5>
                   <h6 class='productPrice' >$ ${price}</h6>
                       <button>Add to cart</button>
                       </div>
                       </div>
                       `
        // alert("ho")
    })
}

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
            // console.log(searchArr);
        })


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
                // console.log(allProducts);
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

function addToCart(title, photo, price) {

    // console.log(title, photo);

    basketMenu.innerHTML += `
    <div class="productItem">
        <div class="productPhoto">
            <img src="${photo}" alt="">
        </div>

        <div class="product-info">
            <h5 class='productTitle' >${title.slice(0, 15).concat('...')}</h5>
            <h6 class='productPrice' >$ ${price}</h6>
        </div>
    </div>
    `
}
