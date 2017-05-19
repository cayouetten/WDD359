//CONTENT when no results displayed
(function() {
    var contentWrap = document.querySelector("#content");
    contentWrap.innerHTML += "<span class='preResultContent'>the MARVEL Universe</span>";
    
    createAPIreq();
})();

function createAPIreq() {
	var ts = Date.now();
	var prk = "e905dec29af77abecaf1564b880c03623352a259";
	var puk = "153d55787ad52565f6bb07d8a4764968";
	var hash = MD5(ts + prk + puk);

	var apiRequest = "https://gateway.marvel.com/v1/public/characters/1017479?ts=" + ts + "&apikey=" + puk + "&hash=" + hash;
    
    onloadRequest(apiRequest);
}

//REQUEST & RESULTS
function onloadRequest(url) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
    
	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			//SUCCESSFUL          
			var resultData = JSON.parse(request.responseText);
            
            //COMPILE
            var resultContent = "<img class='homeImgSearch' src='" + resultData.data.results[0].thumbnail.path + "/landscape_incredible." + resultData.data.results[0].thumbnail.extension + "'/>";
			
			//RENDER
			var resHead = document.querySelector("#resultHeading");
            var res = document.querySelector("#resultDiv");
			if(res != null) {
				resHead.className = "toggleHide";
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