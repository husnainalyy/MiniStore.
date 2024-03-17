// show the information details of the products
function productInfoShow(infoType) {
    if (infoType == 'DESCRIPTION') {
        document.querySelector('#description').style.display = "block";
        document.querySelector('#additionalInfo').style.display = "none";
        document.querySelector('#reviews').style.display = "none";
    }
    else if (infoType == 'ADDITIONAL INFORMATION') {
        document.querySelector('#description').style.display = "none";
        document.querySelector('#additionalInfo').style.display = "block";
        document.querySelector('#reviews').style.display = "none";
    }
    else {
        document.querySelector('#description').style.display = "none";
        document.querySelector('#additionalInfo').style.display = "none";
        document.querySelector('#reviews').style.display = "block";
    }
}


// products quantity increase
function quantitySetting(quantity, productStock) {
    let numberElement = document.querySelector('#quantity');
    let number = parseInt(numberElement.innerHTML, 10);
    quantity = parseInt(quantity, 10);
    if (number + quantity < 0) {
        console.error('Invalid operation: quantity cannot go below 0');
        return;
    }
    if (number + quantity > productStock) {
        console.error('Invalid operation: quantity cannot exceed product stock');
        return;
    }
    number += quantity;
    numberElement.innerHTML = number;
    localStorage.setItem('quantityLocal', number);

}


document.addEventListener('DOMContentLoaded', function () {
    // SELECTED PRODUCT DISPLAY 
    let storedApiData = JSON.parse(localStorage.getItem('apiData'));

    let id = JSON.parse(localStorage.getItem('id'));

    const shopProducts = document.querySelector('#singleProduct');
    shopProducts.innerHTML = '';


    const productInformation = document.querySelector('#productAdditionalInformation');;
    productInformation.innerHTML = '';

    storedApiData.forEach(product => {

        if (product.id == id) {
            shopProducts.innerHTML += `
                    <div class="container">
                        <img class="singleProductImg img-fluid"
                            src="${product.featuredImage}" alt="">
                    </div>
                    <div class="container">
                        <h1>${product.name}</h1>
                        <div class="my-4">
                            <i class="bi bi-star text-dark"> 5.2</i>
                            <p class="fs-1  text-primary" style="font-weight: bold;">$${product.basePrice}</p>
                            <p>${product.description}</p>
                            <h3>COLOR:</h3>
                            <div class="d-flex mb-4">
                                <p class="  text-dark" >${product.colorOptions}</p>
                                
                            </div>
                            <h3>Storage:</h3>
                            <div class="d-flex mb-1">
                                <p class=" text-decoration-none text-dark" >${product.storageOptions}</p>
                                
                            </div>
                            <p>${product.stock} in stock</p>
                            <div class="d-flex my-3 align-items-center">
                                <button class="btn-lg me-2 border py-0 " onclick="quantitySetting(-1,'${product.stock}')">
                                    <i class="bi bi-dash-lg"></i>
                                </button>
                                <p class="fs-3  pt-3 " id="quantity" >1</p> 
                                <button class="btn-lg ms-2 border py-0" onclick="quantitySetting(+1,'${product.stock}')">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>
                            <div class="d-flex mb-4">
                                <a href="./cart.html">
                                    <button type="button" class="btn  btn-outline-primary btn-lg px-5 me-3">Check Your Cart</button>
                                </a>
                                
                                <button type="button" class="btn  btn-outline-dark btn-lg px-5" onclick="addToCart('${product.id}')" >Add to Cart</button>
                                </div>
                            <p>id: ${product.id}</p>
                            <p>Category: ${product.productCategory}</p>
                            <p>Brand: ${product.brand}</p>
                        </div>
                    </div>
            `;
            productInformation.innerHTML += `
                <div class="container d-flex justify-content-around">
                    <p class=" productInfo" onclick="productInfoShow('DESCRIPTION')">DESCRIPTION</p>
                    <p class=" productInfo text-nowrap" onclick="productInfoShow('ADDITIONAL INFORMATION')">ADDITIONAL
                        INFORMATION</p>
                    <p class=" productInfo" onclick="productInfoShow('REVIEWS')">REVIEWS</p>
                </div>
                <div class="border"></div>
                <div class="container  my-4 " id="description">
                    <p class="my-4">${product.description}</p>
                </div>
            
                <div class="container" id="additionalInfo">
                    <p class="my-4">
                    <strong>Display:</strong> ${product.display} <br>
                    <strong>CPU:</strong> ${product.CPU} </br>
                    </p>
                </div>
            
                <div class="container" id="reviews">
                    <div class=" d-flex flex-column flex-lg-row ">
                        <div class="container d-flex my-4">
                            <div class="me-2 ">
                                <img class="reviewImg "
                                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGh1bWFufGVufDB8fDB8fHww"
                                    alt="">
                            </div>
                            <div>
                                <p class=" p-0 m-0">(3.5)</p>
                                <p class=" p-0 m-0 text-muted">Tina Johnson – 03/07/2023</p>
                                <p class=" p-0 m-0">The product is simply amazing! From its sleek design to its
                                    lightning-fast performance,
                                    it's everything I could ask
                                    for in a device. The camera quality is superb, and the battery life is impressive.
                                    Overall, I'm extremely satisfied
                                    with my purchase!</p>
                            </div>
                        </div>
                        <div class="container d-flex my-4">
                            <div class="me-2 ">
                                <img class="reviewImg"
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="">
                            </div>
                            <div class="d-flex flex-column p-0 m-0">
                                <p class="lh-0 p-0 m-0">(5.0)</p>
                                <p class="lh-0 p-0 m-0 text-muted">Tina Johnson – 03/07/2023</p>
                                <p class="lh-0 p-0 m-0">I'm loving my new  device! The sleek design feels great in my hand,
                                    and
                                    the
                                    display is
                                    stunning. The camera takes
                                    beautiful photos, and I'm impressed by how long the battery lasts. Company has once again
                                    delivered a top-notch device.</p>
                            </div>
                        </div>
                    </div>
                </div>     
            `;
        };
    });
});


// Add to cart function
function addToCart(productId) {
    let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    let productQuantity = JSON.parse(localStorage.getItem('quantityLocal'));
    let existingProduct = cartArray.find(product => product.productId === productId);

    if (existingProduct) {
        existingProduct.productQuantity += productQuantity;
    } else {
        let cartProduct = { productId, productQuantity };
        cartArray.push(cartProduct);
    }
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    console.log(cartArray)
}



