// const logoutBtn = document.querySelector('#SignOff')
const logoutBtn = document.getElementById('logoutBtn');
const userIntro = document.getElementById("userIntro");
// const BASE_URL = 'http://13.235.87.215:4000';
var BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";

logoutBtn.addEventListener("click", logoutFn);

function logoutFn(){
  // console.log(localStorage.getItem("username"));
  localStorage.removeItem('username');
  localStorage.removeItem('cartId')
  window.location.href = "login.html";
}

if (!localStorage.getItem("username")) {
  window.location.href = "login.html";
} else {
  userIntro.innerText = "Hi " + localStorage.getItem("username");
}
