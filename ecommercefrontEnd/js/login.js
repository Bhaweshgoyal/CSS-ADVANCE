const showLoginBtn = getEleId("#showLoginBtn");
const showSignUpBtn = getEleId("#showSignupBtn");
const loginForm = getEleId("#loginform");
const SignUpForm = getEleId("#signupForm");
const loginBtn = getEleId("#loginbtn");
const SignUpBtn = getEleId("#Signupbtn");
const loginUserName = getEleId("#loginUserName");
const loginPassword = getEleId("#loginPassword");
const SignupUserName = getEleId("#SignupUserName");
const SignupPassword = getEleId("#SignupPassword");
const authErrMsg = getEleId("#authErrMsg");
const succErrMsg = getEleId("#succErrMsg");
const Email = getEleId("#Email");

// var BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1"; 

// event listner
showSignUpBtn.addEventListener("click", showSignUpForm);
showLoginBtn.addEventListener("click", showLoginForm);
loginBtn.addEventListener("click", loginFn);
SignUpBtn.addEventListener("click", signupFn);

// functions
function createCart(){
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${token}`
  }
fetch(BASE_URL + '/carts',{
    method : 'POST',
    headers : headers,
    body : JSON.stringify({userId})
  }).then(response => response.json()).then((data) => {
    console.log('CART DATA',data)
    localStorage.setItem('cartId' ,data.id )
    window.location.href='index.html'
  })
}
function signupFn() {
  if (SignupUserName.value == "") {
    updateAuthErrorMsg("Username Should Not Be Empty")
    updateSuccessErrorMsg("");
  } else if (SignupPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
    updateSuccessErrorMsg("");
  } else if (Email.value == "") {
    updateAuthErrorMsg("Email Is Required");
    updateSuccessErrorMsg("");
  } else {
    let data = {
      username : SignupUserName.value,
      password: SignupPassword.value,
      email: Email.value,
    };
    console.log(data,"Data")
    fetch(BASE_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateSuccessErrorMsg(data.message);
        updateAuthErrorMsg("")
      })
      .catch((err) => {
        console.log(err);
      });
    SignupUserName.value ="";
    SignupPassword.value="";
    Email.value = ""
  }
}

function loginFn() {
  console.log("working");
  if (loginUserName.value == "") {
    updateAuthErrorMsg("Username Should Not Be Empty");
    updateSuccessErrorMsg("");
  } else if (loginPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
    updateSuccessErrorMsg("");
  } else {
    let data = {
      username: loginUserName.value,
      password: loginPassword.value,
    };
    fetch(BASE_URL + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.accessToken){
          console.log(data.username,"loginBTN")
          localStorage.setItem("username", data.username)
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("email", data.email);
          updateSuccessErrorMsg("logged In succefully")
          createCart()
            
        }else{
            updateAuthErrorMsg("Invalid Username Or Passowrd");
        }
      })
      .catch((err) => {
        console.log(err );
      });
    updateAuthErrorMsg("");
  }
}
function redirectToHomeFn(){
    window.location.href="index.html"
}
function updateAuthErrorMsg(msg) {
    
  authErrMsg.innerHTML = `<h6>${msg}</h6>`;
//   succErrMsg.remove();   
}
function updateSuccessErrorMsg(Mssg) {
  succErrMsg.innerHTML = `<h6>${Mssg}</h6>`;
  
}

function showSignUpForm() {
  SignUpForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
}
function showLoginForm() {
  SignUpForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
}
function getEleId(id) {
  return document.querySelector(id);
}



// If Conditions


if(localStorage.getItem('username')){
    window.location.href = "index.html"; 
}