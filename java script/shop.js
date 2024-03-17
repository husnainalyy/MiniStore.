// this portion is to divide the shop into 4 pages

let currentPage = 1;
let apiData = [];
let filteredProduct = [];


function fetchProduct() {
    fetch(`https://dummyapi.online/api/products`)
        .then(response => response.json())
        .then(data => {
            apiData = data;
            localStorage.setItem('apiData', JSON.stringify(apiData));
            renderProducts();
        })
        .catch(error => console.error('Error:', error));
}

// pagination section 

function pagination(pageNumber) {
    currentPage = pageNumber;
    renderProducts();
}

function renderProducts() {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const productsToShow = apiData.slice(startIndex, endIndex);
    const shopProducts = document.querySelector('#Shop-Products');
    shopProducts.innerHTML = '';
    productsToShow.forEach(product => {
        shopProducts.innerHTML += `
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 productShop d-flex flex-column">
                <img src="${product.thumbnailImage}" class="w-100" alt="">
                <div class="d-flex justify-content-between">
                    <a class="text-decoration-none text-dark lh-1" href="./product.html">
                        <p class="fs-5" onclick="productOpening('${product.id}');">${product.name}</p>
                    </a>
                    <p class="fs-5 price">$${product.basePrice}</p>
                </div>
            </div>
        `;
    });

}

// CATEGORIZING PRODUCTS

// filter products on category
function filtering_categorize(category) {
    if (category == 'All') {
        filteredProduct = apiData;
        categorizing(filteredProduct)

    }
    else {
        filteredProduct = apiData.filter(product => product.productCategory === category);
        categorizing(filteredProduct);
    }
}



//Filter products on Brands
function filtering_brands(brand) {
    if (brand == 'All') {
        filteredProduct = apiData;
        categorizing(filteredProduct)

    }
    else {
        filteredProduct = apiData.filter(product => product.brand === brand);
        categorizing(filteredProduct);
    }
}



//Filter Products on Price
function filtering_price(priceRange) {
    if (priceRange == 'Less than $500') {
        filteredProduct = apiData.filter(product => product.basePrice < 500);
        categorizing(filteredProduct);

    }
    else if (priceRange == '$500 - $999') {
        filteredProduct = apiData.filter(product => (product.basePrice >= 500 && product.basePrice < 1000));
        categorizing(filteredProduct);
    }
    else if (priceRange == '$1000 - $1499') {
        filteredProduct = apiData.filter(product => (product.basePrice >= 1000 && product.basePrice < 1499));
        categorizing(filteredProduct);
    }
    else if (priceRange == '$1500 - $1999') {
        filteredProduct = apiData.filter(product => (product.basePrice >= 1500 && product.basePrice <= 1999));
        categorizing(filteredProduct);
    }
    else {
        filteredProduct = apiData.filter(product => product.basePrice >= 2000);
        categorizing(filteredProduct);
    }

}


// categorizing products method
function categorizing(filteredProduct) {

    const shopProduct = document.querySelector('#Shop-Products');
    shopProduct.innerHTML = '';
    filteredProduct.forEach(product => {
        shopProduct.innerHTML += `
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 productShop d-flex flex-column">
                <img src="${product.thumbnailImage}" class="w-100" alt="">
                <div class="d-flex justify-content-around">
                <a class="text-decoration-none text-dark lh-1" href="./product.html?id=${product.id}">
                    <p class="fs-5" onclick="productOpening('${product.id}');">${product.name}</p>
                </a>                    
                <p class="fs-5 price">$${product.basePrice}</p>
                </div>
            </div>
        `;
    });
}









document.addEventListener('DOMContentLoaded', function () {

    fetchProduct();

});

function productOpening(id) {
    localStorage.setItem('id', JSON.stringify(id));
    
}



















