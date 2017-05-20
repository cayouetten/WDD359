//BROWSE
var browseComics = document.querySelector("#browseComics");
var bcoRender = document.querySelector("#browseComicsRender");

var browseCharacters = document.querySelector("#browseCharacters");
var bchRender = document.querySelector("#browseCharactersRender");

var browseCreators = document.querySelector("#browseCreators");
var bcrRender = document.querySelector("#browseCreatorsRender");

browseComics.addEventListener("click", function(e) {
    var category = "comics";
    
    bcoRender.innerHTML = "<span>Title begins with </span>" + showAZ() + "<button type='button' id='" + category + "GoButton'><img src='images/search.svg'></button>";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "";
    
    var comicsGoButton = document.querySelector('#comicsGoButton');
    
    if(comicsGoButton != null) {
        comicsGoButton.addEventListener("click", function(){
            var querySelect = document.querySelector(".azSelect").value;

            browseQuery(category, querySelect);
        });
    }
});

browseCharacters.addEventListener("click", function(e) {
    var category = "characters";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "<span>Name begins with </span>" + showAZ() + "<button type='button' id='" + category + "GoButton'><img src='images/search.svg'></button>";
    bcrRender.innerHTML = "";
    
    var charactersGoButton = document.querySelector('#charactersGoButton');

    if(charactersGoButton != null) {
        charactersGoButton.addEventListener("click", function(){
            var querySelect = document.querySelector(".azSelect").value;

            browseQuery(category, querySelect);
        });
    }
});

browseCreators.addEventListener("click", function(e) {
    var category = "creators";
    
    bcoRender.innerHTML = "";
    bchRender.innerHTML = "";
    bcrRender.innerHTML = "<span>Last name begins with </span>" + showAZ() + "<button type='button' id='" + category + "GoButton'><img src='images/search.svg'></button>";
    
    var creatorsGoButton = document.querySelector('#creatorsGoButton');
    
    if(creatorsGoButton != null) {  
        creatorsGoButton.addEventListener("click", function(){
            var querySelect = document.querySelector(".azSelect").value;

            browseQuery(category, querySelect);
        });
    }
});

function showAZ() {
    var azSelect = "<select class='azSelect'><option value='A'>A</option><option value='B'>B</option><option value='C'>C</option><option value='D'>D</option><option value='E'>E</option><option value='F'>F</option><option value='G'>G</option><option value='H'>H</option><option value='I'>I</option><option value='J'>J</option><option value='K'>K</option><option value='L'>L</option><option value='M'>M</option><option value='N'>N</option><option value='O'>O</option><option value='P'>P</option><option value='Q'>Q</option><option value='R'>R</option><option value='S'>S</option><option value='T'>T</option><option value='U'>U</option><option value='V'>V</option><option value='W'>W</option><option value='X'>X</option><option value='Y'>Y</option><option value='Z'>Z</option></select>";
    
    return azSelect;
}

function browseQuery(category, querySelect) {
    var category = category;
	var querySelect = querySelect;
    
	var ts = Date.now();
	var prk = "e905dec29af77abecaf1564b880c03623352a259";
	var puk = "153d55787ad52565f6bb07d8a4764968";
	var hash = MD5(ts + prk + puk);

	var apiRequest ='';

	if(category == "comics") {
		//comics
        apiRequest = "https://gateway.marvel.com/v1/public/comics?titleStartsWith=" + querySelect + "&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else if(category == "characters") {
		//characters
		apiRequest = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + querySelect + "&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else {
		//creators
		apiRequest = "https://gateway.marvel.com/v1/public/creators?lastNameStartsWith=" + querySelect + "&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	}

	if(querySelect == "") {
		console.log("Empty Entry");
		e.preventDefault();
	} else {
console.log("browseQuery", category, apiRequest);
		createBrowseRequest(apiRequest, category, querySelect);
	}
}

//REQUEST & RESULTS
function createBrowseRequest(url, category, querySelect) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	
	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			//SUCCESSFUL
			var resultData = JSON.parse(request.responseText);
			
			var resultContent = "";
            
            var resultsFound = resultData.data.total;
            
            //COMPILE
            if(resultsFound == 0) {
                resultContent += "<span class='noResults'>No results found, please try again.</span>";
            } else if(category == "comics") {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.title;
                        var issue = resPath.issueNumber;
                        var description = resPath.description;
                        if(description == "" || description == null) {
                            description = "No description available.";
                        }
                        var pages = resPath.pageCount;
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_incredible." + resPath.thumbnail.extension + "'/>";

                        resultContent += "<div class='resultSingleItem'><span class='searchImage'>" + image + "</span>";
                        
                        resultContent += "<div class='searchDetails'><span class='searchName'>" + name + "</span>";
                        resultContent += "<span class='searchIssue'>Issue #" + issue + "</span>";
                        resultContent += "<span class='searchDescription'>" + description + "</span>";
                        resultContent += "<span class='searchPageCount'>" + pages + " pages</span></div></div>";
                    }
	            }
            } else if(category == "characters") {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.name;
                        var description = resPath.description;
                        if(description == "" || description == null) {
                            description = "No description available.";
                        }
                        var comicsTotal = resPath.comics.available;
                        var comicsCollection = resPath.comics.comicsCollection;
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_incredible." + resPath.thumbnail.extension + "'/>";

                        resultContent += "<div class='resultSingleItem'><span class='searchImage'>" + image + "</span>";
                        
                        resultContent += "<div class='searchDetails'><span class='searchName'>" + name + "</span>";
                        resultContent += "<span class='searchDescription'>" + description + "</span>";
                        resultContent += "<span class='searchTotal'>" + comicsTotal + " Comic Appearances</span></div></div>";
                    }
	            }
            } else {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.fullName;
                        var attributedComics = "";
                        for(var j=0; j<resPath.comics.returned; j++) {
                            if(resPath.comics.items[j].name != undefined) {
                                attributedComics += "<br>" + resPath.comics.items[j].name;
                            }
                        }
                        var attributedStories = "";
                        for(var k=0; k<resPath.stories.returned; k++) {
                            if(resPath.stories.items[k].name != undefined && resPath.stories.items[k].type != undefined)
                            attributedStories += "<br>" + resPath.stories.items[k].name + ": " + resPath.stories.items[k].type;
                        }
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_incredible." + resPath.thumbnail.extension + "'/>";
                        
                        resultContent += "<div class='resultSingleItem'><span class='searchImage'>" + image + "</span>";
                        
                        resultContent += "<div class='creatorsSearchDetails'><span class='searchName'>" + name + "</span>";
                        resultContent += "<span class='searchAttrComics'>Attributed Comics: " + attributedComics + "</span>";
                        resultContent += "<span class='searchAttrtories'>Attributed Stories" + attributedStories + "</span></div></div>";
                    }
	            }
            }
			
			//RENDER
            var resHead = document.querySelector("#resultHeading");
			var res = document.querySelector("#resultDiv");
			if(res != null) {
                resHead.className = "";
				resHead.innerHTML = "<h1><img src='images/arrow-right.svg'><span class='resH1'>" + category.toUpperCase() + "</span> results beginning with <em class='resH1'>" + querySelect + "</em></h1>";
                res.innerHTML = resultContent;
			}
		}
		else {
			console.log("response error", request);
		}
	}
	
	request.onerror = function() {
		console.log("connection error");
	}

	request.send();
}