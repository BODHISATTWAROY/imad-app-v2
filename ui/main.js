//Counter Code
var button = document.getElementById('counter');


button.onclick = function(){
    
    //Ceate a Request Object
     var request = new XMLHttpRequest();
    //Capture the response and store it in a variable.
   request.onreadystatechange = function(){
       if (request.readyState === XMLHttpRequest.DONE){
      // Take Some Action
           if (request.status === 200){
              
           }
       }
       //Not Done Yet
   };
     //Make The Request
     request.open('GET', 'http://bodhisattwaroy.imad.hasura-app.io/counter', true);
     request.send(null);
};

//Submit Name

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
    var names = request.responseText;
    names = JSON.parse(names);
    var list = '';
    for (var i=0; i< names.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
           }
       }
       //Not Done Yet
   };
    
    //Make A Request To The Server And Send The Name
  
    
     //Make The Request
     var nameInput = document.getElementById('name');
     var name = nameInput.value;
     request.open('GET', 'http://bodhisattwaroy.imad.hasura-app.io/submit-name?name=' +  name, true);
     request.send(null);
     
};