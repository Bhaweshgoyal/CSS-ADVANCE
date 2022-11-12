// variables

const productList = document.getElementById("productList");
const categoryList = document.getElementById("categoryList");
const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const clear = document.getElementById('clear')
let query = "";
// events


searchInput.addEventListener('keyup',searchProduct)
minPrice.addEventListener('change',searchProduct);
maxPrice.addEventListener('change',searchProduct)
clear.addEventListener('click',clearAllFilters)

loadProducts();
loadCategories();


// function s=


function clearAllFilters(){
    window.location.href= 'productList.html'
}
function searchProduct(){

let data = {
    name : searchInput.value,
    minCost : minPrice.value,
    maxCost : maxPrice.value
}
if(window.location.search){
        data.id = window.location.search.split('=')[1]
}
let URI = '/products?'
fetch(BASE_URL + URI + new URLSearchParams(data)).then(response => response.json()).then(data => renderProducts(data))

}

function loadCategories() {
    fetch(BASE_URL + "/categories")
      .then((response) => response.json())
      .then((data) => renderCategories(data))
      .catch((err) => console.log(err));
  }
  
  function loadProducts() {
    const data = {};
    if (window.location.search) {
      data.id = window.location.search.split("=")[1];
    }
    let URI = "/products";
    if (data.id) {
      URI = `/categories/${data.id}/products`;
    }
    fetch(BASE_URL + URI)
      .then((response) => response.json())
      .then((data) => renderProducts(data))
      .catch((err) => console.log(err));
  }
  
  function renderProducts(products) {
    let productListHTML = '';
    for (let i = 0; i < products.length; i++) {
      productListHTML += `<a class = "product-item text-decoration-none d-inline-block" href = "productDetails.html?productId=${products[i].id}" 
          <div class="product-img"><img src = "https://picsum.photos/200/300" alt ="RANDOM PIC"></div>
          <div class="product-name text-center">${products[i].name}</div>
          <div class="product-price text-center">&#8377; ${products[i].cost} </div>
          </a>`;
    }
     productList.innerHTML = productListHTML;
  }
  function renderCategories(categories) {
      let categoryListHtml = '';
      for(i = 0; i < categories.length; i++) {
          categoryListHtml += '<a class="d-flex text-decoration-none" href="productList.html?categoryId=' + categories[i].id + '">' + categories[i].name + '</a>';
      }
  
      categoryList.innerHTML = categoryListHtml;
  }