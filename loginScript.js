/* 
Cian Hogan, Web Development Module Project
Script for login functions
Uses local storage to hold information in the browser to keep user logged in
Interacts with elements on the webpage to allow login
*/

// Variable for temp storage of user info
var uEmail
var uName

// If user logged in hides login button and shows logUser button
// with users name showing on page
function userLogged(){
// hides login button
	document.getElementById("login").style.display = "none";
// gets name from local storage
	uName = localStorage.getItem("Name");
// shows other button with name as value
	document.getElementById("logUser").style.display = "inline";
	document.getElementById("logUser").innerHTML = uName;
  	}


// on page load the function checks if the user details are stored in browser
// and uses above userLogged fucntion to display if they are
function checkStorage(){
	if (localStorage.getItem("Name") === null){
		console.log("Not logged in");
	  	}

	else{
		userLogged();
		console.log("logged in");
	  	}
	 }


// logUser button changes if user hovers over
function logOutHoverIn() {
// shows user text to let them know they can log out when hovered over
	document.getElementById("logUser").innerHTML = "Log Out";
	}
// When the hover ends returns to normal
function logOutHoverOut() {
	document.getElementById("logUser").innerHTML = uName;
	}

// when user logs out clear the local storage and reload the page
function logOutUser(){
	localStorage.clear();
	location.reload();
	}
  
// when user clicks the login button the login form is displayed
function openForm() {
	document.getElementById("loginFormID").style.display = "grid";
}

// when used clicks close on login, form is hidden
function closeForm() {
	document.getElementById("loginFormID").style.display = "none";
}

// When use submits the login form we save details to the local storage
// Reloads page and when page reloads it recognises the use is logged in
function loginForm() {
	uEmail = document.getElementById("entEmail").value;
	uName = document.getElementById("entName").value;
	localStorage.setItem("email", uEmail);
	localStorage.setItem("Name", uName);
	closeForm(); // closes form
	location.reload();
}
	

