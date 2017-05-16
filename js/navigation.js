//NAVIGATION TOGGLE
var navS = document.querySelector("#navSearch");
var navB = document.querySelector("#navBrowse");
var navC = document.querySelector("#navCollections");

var secS = document.querySelector("#searchSection");
var secB = document.querySelector("#browseSection");
var secC = document.querySelector("#collectionsSection");

navS.addEventListener("click", function(e){
    secS.className = "toggleShow"; //show
    secB.className = "toggleHide";
    secC.className = "toggleHide";
    
    navS.className = "selected";
    navB.className = "";
    navC.className = "";
});

navB.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleShow"; //show
    secC.className = "toggleHide";
    
    navS.className = "";
    navB.className = "selected";
    navC.className = "";
});

navC.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secC.className = "toggleShow"; //show
    
    navS.className = "";
    navB.className = "";
    navC.className = "selected";
});
