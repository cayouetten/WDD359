//featured
var avengers = document.querySelector("#avengers");
var xmen = document.querySelector("#xmen");
var guardians = document.querySelector("#guardians");
var fantastic = document.querySelector("#fantastic");

avengers.addEventListener("click", function(e) {
    featuredQuery("a");
});

xmen.addEventListener("click", function(e) {
    featuredQuery("x");
});

guardians.addEventListener("click", function(e) {
    featuredQuery("g");
});

fantastic.addEventListener("click", function(e) {
    featuredQuery("f");
});


function featuredQuery(category) {
    var category = category;
    
	var ts = Date.now();
	var prk = "e905dec29af77abecaf1564b880c03623352a259";
	var puk = "153d55787ad52565f6bb07d8a4764968";
	var hash = MD5(ts + prk + puk);

	var apiRequest ='';

	if(category == "a") {
		//avengers
        apiRequest = "https://gateway.marvel.com/v1/public/characters/1009165?&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else if(category == "x") {
		//xmen
		apiRequest = "https://gateway.marvel.com/v1/public/characters/1009726?&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else if(category == "g") {
		//guardians
		apiRequest = "https://gateway.marvel.com/v1/public/characters/1011299?&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else {
		//fantastic
		apiRequest = "https://gateway.marvel.com/v1/public/characters/1009299?&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	}

	createFeaturedsRequest(apiRequest, category);
}

//REQUEST & RESULTS
function createFeaturedsRequest(url, category) {
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
            } else {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.name;
                        var description = resPath.description;
                        if(description == "" || description == null) {
                            description = "No description available.";
                        }
                        var comics = resPath.comics.items;
                        var image = "<img src='" + resPath.thumbnail.path + "/portrait_incredible." + resPath.thumbnail.extension + "'/>";
                        var links = resPath.urls;

                        resultContent += "<div class='featuredWrap'><span class='featuredImage'>" + image + "</span>";
                        
                        resultContent += "<div class='featuredDetails'><span class='featuredDescription'>" + description + "</span><span class='linkBack'>";
                        for(var j=0; j<links.length; j++) {
                            resultContent += "<a href='" + links[j].url + "' target='_blank'>" + links[j].type.toUpperCase() + "</a>";
                        }
                        resultContent += "</span></span></div>";
                        
                        resultContent += "<span class='featuredComics'>"
                        for(var i=0; i<comics.length; i++) {
                            resultContent += "<span class='indivComic'>" + comics[i].name + "</span>";
                        }
                        resultContent += "</span></div>";
                    }
	            }
            }
			
			//RENDER
            var resHead = document.querySelector("#resultHeading");
            var resHeadContent = "";
            
            if(category == "a") {
               resHeadContent = "THE AVENGERS";
            } else if(category == "x") {
               resHeadContent = "X-MEN";
            } else if(category == "g") {
               resHeadContent = "GUARDIANS OF THE GALAXY";
            } else {
                resHeadContent = "FANTASTIC FOUR"; 
            }
            
			var res = document.querySelector("#resultDiv");
			if(res != null) {
                resHead.className = "";
				resHead.innerHTML = "<h1><img src='images/arrow-right.svg'><em class='resH1'>" + resHeadContent + "</em></h1>";
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