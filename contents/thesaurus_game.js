// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	var API_KEY = "b7b7845edb66369b02c819b12df6630e";

	getSynonymsObject("love");

    $(document).on('click', ".synonym", function(event) {
    	synonymClicked(event.target.innerText);    
	});

	function synonymClicked(word) {
		getSynonymsObject(word);
	}

	function getSynonymsObject(word) {

		$(".word").text(word);
		var w = document.createElement('span');
		var g = document.createElement('span');
    	$(w).text(word);
    	$(w).addClass("wordTreeWord");
    	$(g).addClass("glyphicon glyphicon-arrow-right");
    	$(".wordTree").append(g);
    	$(".wordTree").append(w);
		$(".wordList").empty();

		$.ajax({
		  url : "http://words.bighugelabs.com/api/2/" + API_KEY + "/" + word + "/json?callback=?", 
		  dataType : 'json',
		  complete : function(jqXHR, textStatus) {
		    if (textStatus == 'parsererror') {
		      // Did not find any synonyms
		      alert("404 error because no synonyms exist for this word");
		    }
		  },
		  success : function(data) {
		    // find synonyms
		    var synonyms = getAllSynonyms(data);
		    for (var i=0; i<synonyms.length; i++) {
		    	var syn = document.createElement('div');
		    	$(syn).text(synonyms[i]);
		    	$(syn).addClass("synonym");
		    	$(".wordList").append(syn);
		    }
		  }
		});
	}

	function getAllSynonyms(data) {
		var synonyms = []
		for (var k in data) {
	    	if (data.hasOwnProperty(k)) {
	    		for (var d in data[k]) {
	    			if (data[k].hasOwnProperty(d)) {
	    				if (d == 'syn') { 
		    				for (var w in data[k][d]) {
		    					if (data[k][d].hasOwnProperty(w)) {
		    						synonyms.push(data[k][d][w]);
		    					}
		    				}
	    				}
	    			}
	    		}
	    	}
	    }
	    return synonyms;
	}

});
