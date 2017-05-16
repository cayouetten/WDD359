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
		apiRequest = "https://gateway.marvel.com/v1/public/comics?dateRange=" + query + "%2C%202017-04-04&ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
	}

	if(query == "") {
		console.log("Empty Entry");
		e.preventDefault();
	} else {
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
                resultContent += "No results. Please try again.";
            } else if(option == "character") {
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
                    } else {
                        if(option == "comicD"){
                            resultContent += "No results, please try again.<br>Use format MM-DD-YYY.";
                        }
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