document.getElementById("login-btn").addEventListener("click", function(){
   const userInput = document.getElementById("userName")
   const userValue = userInput.value;

   const userPin = document.getElementById("password");
   const pinValue = userPin.value;
   console.log(pinValue)

   if(userValue == "admin" && pinValue == "admin123"){
    alert("Login Successful")
      window.location.assign("./home.html")

   }else{
    alert("Invalid Username or Password")
   }

})