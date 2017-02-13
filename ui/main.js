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

//Submit Name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //Make A Request To The Server And Send The Name
    //Capture A List Of Name And Render It As A List
    var names = ['name1', 'name2', 'name3', 'name4'];
    var list = '';
    for (var i=0; i,names.length; i++){
        list += '<li>' + name[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
    
};