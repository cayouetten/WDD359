//NAVIGATION TOGGLE
var homeButton = document.querySelector('#navHome');

var navS = document.querySelector("#navSearch");
var navB = document.querySelector("#navBrowse");
var navC = document.querySelector("#navCollections");

var infoButton = document.querySelector('#navInfo');

var preResultContent = document.querySelector(".preResultContent");
var miniContent = document.querySelector(".miniContent");

var secS = document.querySelector("#searchSection");
var secB = document.querySelector("#browseSection");
var secC = document.querySelector("#collectionsSection");

var bcoRender = document.querySelector("#browseComicsRender");
var bchRender = document.querySelector("#browseCharactersRender");
var bcrRender = document.querySelector("#browseCreatorsRender");

navS.addEventListener("click", function(e){
    secS.className = "toggleShow"; //show
    secB.className = "toggleHide";
    secC.className = "toggleHide";
    
    preResultContent.className = "miniContent";
    
    navS.className = "selected";
    navB.className = "";
    navC.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

navB.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleShow"; //show
    secC.className = "toggleHide";
    
    preResultContent.className = "miniContent";
    
    navS.className = "";
    navB.className = "selected";
    navC.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

navC.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secC.className = "toggleShow"; //show
    
    preResultContent.className = "miniContent";
    
    navS.className = "";
    navB.className = "";
    navC.className = "selected";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

//HOME button
homeButton.addEventListener("click", function(e) {
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secC.className = "toggleHide";

    if(preResultContent != null) {
        preResultContent.className = "preResultContent";
    }
    
    navS.className = "";
    navB.className = "";
    navC.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

//INFO button
infoButton.addEventListener("click", function(e) {
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secC.className = "toggleHide";

    if(preResultContent != null) {
        preResultContent.className = "preResultContent";
    }
    
    navS.className = "";
    navB.className = "";
    navC.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    
    //RENDER
    var resultContent = "<h1>About</h1>";
    resultContent += "<span class='genAttribution'>Data provided by Marvel. © 2014 Marvel</span>";
    
    var resHead = document.querySelector('#resultHeading');
    resHead.innerHTML = "";
    var res = document.querySelector("#resultDiv");
    res.innerHTML = resultContent;
});