const productDetails = document.getElementById('productDetails');
const addCartToBtn = document.getElementById('addToCartBtn');
const goToCartBtn = document.getElementById('goToCartBtn');
// var BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";


// event Listner
addCartToBtn.addEventListener('click',addToCart)


//Functions 
function loadProductDetails(){
    const productId = window.location.search.split('=')[1];


    fetch(BASE_URL + `/products/${productId}`)
    .then(response => response.json())
    .then(data => renderProductDetails(data))
}


function renderProductDetails(data){
    const productDetailsHtml = '<div class="product-name">' + data.name + '</div>'
        + '<div class="product-price fw-bold">&#8377; ' + data.cost + '</div>'
        + '<div class="product-description">'
        + '<div class="product-description-title fw-bold">Description</div>'
        + '<div class="product-description-data">' + data.description + '</div>'
        + '</div>';

    productDetails.innerHTML = productDetailsHtml;

    if(data.addedToCart == 1) {
        goToCartBtn.classList.remove('d-none');
	    addCartToBtn.classList.add('d-none');
    }
}
function addToCart(){
    const productId= window.location.search.split('=')[1];
    const cartId = localStorage.getItem('cartId');
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type':`application/json`,
        'Authorization':`Bearer ${token}`  ///////
    };
    const data = {
        productIds : [productId]
    };
    fetch(BASE_URL + `/carts/${cartId}`, {
        method: 'PUT', 
        headers: headers,
        body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
        if(data){
            goToCartBtn.classList.remove(`d-none`);
            addCartToBtn.classList.add(`d-none`);
        }
    });
}



loadProductDetails()

