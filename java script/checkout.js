document.querySelector('.btn-secondary').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    let promoCode = document.querySelector('.form-control').value; // Get the input value
    let usedPromoCodes = JSON.parse(localStorage.getItem('usedPromoCodes')) || [];

    if (usedPromoCodes.includes(promoCode)) {
        alert('This promo code has already been used.');
        return;
    }

    let promoPriceElement = document.querySelector('#promoPrice').innerHTML;
    let isNegative = promoPriceElement.includes('−');
    let promoCodePrice = parseInt(promoPriceElement.replace(/[\−$]/g, ''));
    promoCodePrice = isNegative ? -promoCodePrice : promoCodePrice;


    switch (promoCode) {
        case 'ALPHA1':
            promoCodePrice = 51;
            break;
        case 'ALPHA2':
            promoCodePrice = 21;
            break;
        case 'ALPHA3':
            promoCodePrice = 55;
            break;
        case 'ALPHA4':
            promoCodePrice = 100;
            break;
        case 'ALPHA5':
            promoCodePrice = 200;
            break;
        default:
            document.querySelector('.text-success small').textContent = 'Invalid Code';
            document.querySelector('#checkoutPrice').textContent = 0;
            return; // Exit the function
    }

    document.querySelector('.text-success small').textContent = promoCode; // Set the promo code
    document.querySelector('#promoPrice').textContent = '-$' + promoCodePrice;
    localStorage.setItem('promoCodePrice', JSON.stringify(promoCodePrice));

    let totalCartPrice = JSON.parse(localStorage.getItem('totalCartPrice'));
    let discountedPrice = totalCartPrice - promoCodePrice;

    document.querySelector('#totalPrice').innerHTML = '$' + totalCartPrice;
    document.querySelector('#discountedPrice').innerHTML = '$' + discountedPrice;

    usedPromoCodes.push(promoCode);
    localStorage.setItem('promoCodeApplied', 'false');

});


document.addEventListener('DOMContentLoaded', function () {

    let totalCartPrice = JSON.parse(localStorage.getItem('totalCartPrice'));
    let promoCodePrice = JSON.parse(localStorage.getItem('promoCodePrice')); // Retrieve promoCodePrice from localStorage

    let discountedPrice = totalCartPrice - promoCodePrice;

    document.querySelector('#totalPrice').innerHTML = '';
    document.querySelector('#totalPrice').innerHTML = '$' + totalCartPrice;


    document.querySelector('#discountedPrice').innerHTML = '';
    document.querySelector('#discountedPrice').innerHTML = '$' + discountedPrice;


});