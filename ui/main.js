

//Submit Username/Password to Log In

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    
    //Create a Request Object
    var request = new XMLHttpRequest();
    
      //Capture the response and store it in a variable.
   request.onreadystatechange = function(){
       if (request.readyState === XMLHttpRequest.DONE){
      // Take Some Action
           if (request.status === 200){
                //Capture A List Of Name And Render It As A List
          console.log('User Logged In');
          alert('Logged In Successfully');
           } else if (request.status === 403) {
               alert('Username/Password is Incorrect');
           } else if (request.status === 500) {
               alert('Something Went Wrong On The Server');
           }
       }
       //Not Done Yet
   };
    
    //Make A Request To The Server And Send The Name
  
    
     //Make The Request
    
     var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      console.log(username);
      console.log(password);
          request.open('POST', 'http://bodhisattwaroy.imad.hasura-app.io/login', true);
          request.setRequestHeader('Content-Type', 'application/json');
     request.send(JSON.stringify({username: username, password: password}));
     
};