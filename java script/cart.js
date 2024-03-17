let totalCartPrice = JSON.parse(localStorage.getItem('totalCartPrice')) || 0;

function quantitySetting(quantity, productStock, id, priceElem, pricePerUnit, productid) {

    let quantityElement = document.querySelector(`#${id}`);
    let priceElement = document.querySelector(`#${priceElem}`);

    let currentPrice = parseInt(pricePerUnit, 10);
    let updateQuantity = parseInt(quantityElement.innerHTML, 10);
    quantityReceive = parseInt(quantity, 10);

    if (updateQuantity + quantityReceive < 0 || updateQuantity + quantityReceive > productStock) {
        console.error('Invalid operation: quantity cannot go below 0 or exceed product stock');
        return;
    }


    let productInCart = cartArray.find(product => product.productId === productid);

    if (productInCart) {
        // If the product is already in the cart, update its quantity
        productInCart.productQuantity += productQuantity;
    } else {
        // If the product is not in the cart, add it
        cartArray.push({ productId: productId, productQuantity: productQuantity });
    }


    updateQuantity += quantityReceive;
    let totalProductPrice = currentPrice * updateQuantity;
    let previousTotalProductPrice = currentPrice * (updateQuantity - quantityReceive); // total price before quantity was updated


    if (quantity == 1) {
        totalCartPrice += (totalProductPrice - previousTotalProductPrice);

    }
    else if (quantity == -1) {
        totalCartPrice -= (previousTotalProductPrice - totalProductPrice);
    }
    else {
        console.error('Invalid operation: ');
        return;
    }

    if (totalCartPrice < 0) {
        totalCartPrice = 0;
    }

    quantityElement.innerHTML = updateQuantity;
    priceElement.innerHTML = `$${totalProductPrice}`;
    localStorage.setItem('quantityLocal', updateQuantity);

    const cartPriceElement = document.querySelector('#totalCartPrice');
    cartPriceElement.innerHTML = '';
    cartPriceElement.innerHTML += `$${totalCartPrice}`


    cartArray.forEach(cartElem => {
        if (cartElem.productId == productid) {
            cartElem.productQuantity = updateQuantity
        }
    })
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    localStorage.setItem('totalCartPrice', JSON.stringify(totalCartPrice));
}

function addToCart(productId, productQuantity) {
    // Get the cartArray from localStorage
    let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

    // Check if the product is already in the cart
   
    // Store the updated cartArray in localStorage
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}

let cartArray;
let storedApiData;

function renderCart() {
    totalCartPrice = 0;
    cartArray = JSON.parse(localStorage.getItem('cartArray'));
    // ALL PRODUCTS FROM API
    storedApiData = JSON.parse(localStorage.getItem('apiData'));


    const shopProducts = document.querySelector('#cartData');
    shopProducts.innerHTML = '';

    console.log(shopProducts.innerHTML);
    storedApiData.forEach(product => {
        cartArray.forEach(cartProduct => {
            if (product.id == cartProduct.productId) {
                let totalPrice = cartProduct.productQuantity * product.basePrice;
                totalCartPrice += totalPrice;

                shopProducts.innerHTML += `
                    <tr class="tr-1 ">
                        <td class="border p-3 col-4 text-nowrap">${product.name} </td>
                        <td class="border p-3 col-1">$${product.basePrice}</td>
                        <td class="border p-0 col-1 w-100 d-flex justify-content-around align-items-center">
                            <button class="btn  border py-0 " onclick="quantitySetting(-1,'${product.stock}','quantity${product.id}','price${product.id}','${product.basePrice}','${product.id}')">
                                <i class="bi bi-dash-lg"></i>
                            </button>
                            <p class="fs-3  pt-3 " id="quantity${product.id}">${cartProduct.productQuantity}</p>
                            <button class="btn  border py-0" onclick="quantitySetting(1,'${product.stock}','quantity${product.id}','price${product.id}','${product.basePrice}','${product.id}')">
                                <i class="bi bi-plus-lg"></i>
                            </button>
                        </td>
                        <td class="border p-3 col-1" id="price${product.id}">$${totalPrice}</td>
                        <td class="border p-3 col-1" id="cancelCart" onclick="cancelFromCart('cancel${product.id}')">
                            <i class="bi bi-x-lg"></i>
                        </td>
                    </tr>
                `;

            };
        })
    });
    const cartPriceElement = document.querySelector('#totalCartPrice');
    cartPriceElement.innerHTML = `$${totalCartPrice}`;
    localStorage.setItem('totalCartPrice', JSON.stringify(totalCartPrice));

}

document.addEventListener('DOMContentLoaded', function () {
    // PRODUCTS ADD IN THE CART
    renderCart();

});



function cancelFromCart(productId) {

    // Remove 'cancel' from the start of productId
    const actualProductId = productId.replace('cancel', '');

    cartArray = cartArray.filter(product => product.productId != actualProductId);
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
    renderCart();

}