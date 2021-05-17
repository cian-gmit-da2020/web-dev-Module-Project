var uEmail
var uName

function userLogged(){
	document.getElementById("login").style.display = "none";

	uName = localStorage.getItem("Name");

	document.getElementById("logUser").style.display = "inline";
	document.getElementById("logUser").innerHTML = uName;

  	}

function checkStorage(){
	if (localStorage.getItem("Name") === null){
		console.log("Not logged in");
	  	}

	else{
		userLogged();

		console.log("logged in");
	  	}
	 }

function logOutHoverIn() {
	document.getElementById("logUser").innerHTML = "Log Out";
	}

function logOutHoverOut() {
	document.getElementById("logUser").innerHTML = uName;
	}

function logOutUser(){
	localStorage.clear();
	location.reload();

	}
  

function openForm() {
	document.getElementById("loginFormID").style.display = "grid";
  
}

function closeForm() {
	document.getElementById("loginFormID").style.display = "none";
}

function loginForm() {
	uEmail = document.getElementById("entEmail").value;
	localStorage.setItem("email", uEmail);
	uName = document.getElementById("entName").value;
	localStorage.setItem("Name", uName);
	closeForm();
	location.reload();
}
	

