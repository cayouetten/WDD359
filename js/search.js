//SEARCH
var search = document.querySelector("#searchButton");
var searchType = document.querySelector("#userSearchType");
var searchField = document.querySelector("#searchField");
var searchForm = document.querySelector("#userSearchForm");

search.addEventListener("click", function(e) {
	var option = searchType.value;

	var query = searchField.value;
	var ts = Date.now();
	var prk = "e905dec29af77abecaf1564b880c03623352a259";
	var puk = "153d55787ad52565f6bb07d8a4764968";
	var hash = MD5(ts + prk + puk);

	var apiRequest ="";

	if(option == "character") {
		//character by name
		apiRequest = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + query + "&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else if(option == 'comicT') {
		//comic by title
		apiRequest = "https://gateway.marvel.com/v1/public/comics?titleStartsWith=" + query + "&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	} else {
		//comic by date
		apiRequest = "https://gateway.marvel.com/v1/public/comics?dateRange=" + query + "-01-01%2C" + query + "-12-31&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	}

	if(query == "") {
		console.log("Empty Entry");
		e.preventDefault();
	} else {
        console.log(apiRequest);
		createSearchRequest(apiRequest, option);
	}
});

//REQUEST & RESULTS
function createSearchRequest(url, option) {
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
            } else if(option == "character") {
            	for(var i=0; i<resultsFound; i++) {
		            var resPath = resultData.data.results[i];

                    if(resPath != null) {
                        var name = resPath.name;
                        var description = resPath.description;
                        if(description == "" || description == null) {
                            description = "No description available.";
                        }
                        var comicsTotal = resPath.comics.available;
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
                        
                        var id = resPath.id;
                console.log(id);
                        
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
            }
			
			//RENDER
			var resHead = document.querySelector("#resultHeading");
            var res = document.querySelector("#resultDiv");
			if(res != null) {
                resHead.className = "";
				resHead.innerHTML = "<h1><img src='images/arrow-right.svg'>Results for <em  class='resH1'>" + searchField.value + "</em></h1>";
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