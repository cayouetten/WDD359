//NAVIGATION TOGGLE
var homeButton = document.querySelector('#navHome');

var navS = document.querySelector("#navSearch");
var navB = document.querySelector("#navBrowse");
var navF = document.querySelector("#navFeatured");

var infoButton = document.querySelector('#navInfo');

var preResultContent = document.querySelector(".preResultContent");
var miniContent = document.querySelector(".miniContent");

var secS = document.querySelector("#searchSection");
var secB = document.querySelector("#browseSection");
var secF = document.querySelector("#featuredSection");

var bcoRender = document.querySelector("#browseComicsRender");
var bchRender = document.querySelector("#browseCharactersRender");
var bcrRender = document.querySelector("#browseCreatorsRender");

navS.addEventListener("click", function(e){
    secS.className = "toggleShow"; //show
    secB.className = "toggleHide";
    secF.className = "toggleHide";
    
    preResultContent.className = "miniContent";
    
    navS.className = "selected";
    navB.className = "";
    navF.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

navB.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleShow"; //show
    secF.className = "toggleHide";
    
    preResultContent.className = "miniContent";
    
    navS.className = "";
    navB.className = "selected";
    navF.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

navF.addEventListener("click", function(e){
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secF.className = "toggleShow"; //show
    
    preResultContent.className = "miniContent";
    
    navS.className = "";
    navB.className = "";
    navF.className = "selected";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

//HOME button
homeButton.addEventListener("click", function(e) {
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secF.className = "toggleHide";

    if(preResultContent != null) {
        preResultContent.className = "preResultContent";
    }
    
    navS.className = "";
    navB.className = "";
    navF.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    createAPIreq();
});

//INFO button
infoButton.addEventListener("click", function(e) {
    secS.className = "toggleHide";
    secB.className = "toggleHide";
    secF.className = "toggleHide";

    if(preResultContent != null) {
        preResultContent.className = "preResultContent";
    }
    
    navS.className = "";
    navB.className = "";
    navF.className = "";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    
    //RENDER
    var resultContent = "<h1>About</h1>";
    resultContent += "<span class='genAttribution'>Data provided by <a href='http://marvel.com' target='_blank'>Marvel</a>. © 2014 Marvel</span>";
    
    var resHead = document.querySelector('#resultHeading');
    resHead.innerHTML = "";
    var res = document.querySelector("#resultDiv");
    res.innerHTML = resultContent;
});