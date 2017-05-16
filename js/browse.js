//BROWSE
var browseComics = document.querySelector('#browseComics');
var bcoRender = document.querySelector("#browseComicsRender");

var browseCharacters = document.querySelector('#browseCharacters');
var bchRender = document.querySelector("#browseCharactersRender");

var browseCreators = document.querySelector('#browseCreators');
var bcrRender = document.querySelector("#browseCreatorsRender");

browseComics.addEventListener("click", function(e) {
    var category = "comics";
    
    bcoRender.innerHTML = "Title begins with " + showAZ() + "<button type='button' id='" + category + "GoButton'>GO</button>";
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
    bchRender.innerHTML = "Name begins with " + showAZ() + "<button type='button' id='" + category + "GoButton'>GO</button>";
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
    bcrRender.innerHTML = "Last name begins with " + showAZ() + "<button type='button' id='" + category + "GoButton'>GO</button>";
    
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
		createBrowseRequest(apiRequest, category);
	}
}

//REQUEST & RESULTS
function createBrowseRequest(url, category) {
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
                resultContent += "No results. Please try again.";
            } else if(category == "comics") {                
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.title;
                        var issue = resPath.issueNumber;
                        var description = resPath.description;
                        var pages = resPath.pageCount;
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_medium." + resPath.thumbnail.extension + "'/>";

                        resultContent += "<br><br><br>Name: " + name;
                        resultContent += "<br>Issue: " + issue;
                        resultContent += "<br>Description: " + description;
                        resultContent += "<br>Page Count: " + pages;
                        resultContent += "<br>Image: " + image;
                    }
	            }
            } else if(category == "characters") {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.name;
                        var description = resPath.description;
                        var comicsTotal = resPath.comics.available;
                        var comicsCollection = resPath.comics.comicsCollection;
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_medium." + resPath.thumbnail.extension + "'/>";

                        resultContent += "<br><br><br>Name: " + name;
                        resultContent += "<br>Description: " + description;
                        resultContent += "<br>Total: " + comicsTotal;
                        resultContent += "<br>Collection: " + comicsCollection;
                        resultContent += "<br>Image: " + image;
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
                        
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_medium." + resPath.thumbnail.extension + "'/>";

                        resultContent += "<br><br><br>Name: " + name;
                        resultContent += "<br><br>Attributed with comics: " + attributedComics;
                        resultContent += "<br><br>Attributed with stories: " + attributedStories;
                        resultContent += "<br>Image: " + image;
                    }
	            }
            }
			
			//RENDER
			var res = document.querySelector(".resultDiv");
			if(res != null) {
				res.innerHTML = "<h1>Results for <em>" + searchField.value + "</em></h1>" + resultContent;
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