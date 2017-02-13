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
               var counter = request.responseText;
               var span = document.getElementById('count');
               span.innerHTML = counter.toString();
           }
       }
       //Not Done Yet
   };
     //Make The Request
     request.open('GET', 'http://bodhisattwaroy.imad.hasura-app.io/counter', true);
     request.send(null);
};
