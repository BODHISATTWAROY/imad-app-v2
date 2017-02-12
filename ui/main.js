console.log('Loaded!');

// Change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = 'New value';

//Move The Image
var img = document.getElementById('bodhi1');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
    
}
img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};