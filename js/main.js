$("#speak").click(function(){
	var responses = {"NOTFOUND" : ["What does that suggest to you?",
                        "I see.",
                        "I'm not sure I understand you fully.",
                        "Can you elaborate?",
                        "That is quite interesting."]  };
    responses["sorry"] = ["Please don't apologize."];

    responses["always"] = ["Can you think of a specific example?"];
    responses["because"] = ["Is that the real reason?"];
    responses["maybe"] = ["You  don't seem very certain."];
    responses["i think"] = ["Do you really think so?"];
    responses["you"] = ["We were discussing you, not me."];
    responses["yes"] = ["Why do you think so?",
                        "You seem quite positive."];
    responses["no"] = ["Why not?",
    				   "Are you sure?"];
   	var respVal = ["I am sorry to hear you are *.",
                        "How long have you been *?",
                        "Do you believe it is normal to be *?",
                        "Do you enjoy being *?"];
    responses["i am"] = respVal;
    responses["i'm"] = respVal;
    responses["i feel"] = ["Tell me more about such feelings.",
                         "Do you often feel *?",
                         "Do you enjoy feeling *?",
                         "Why do you feel that way?"];
    respVal = ["Tell me more about your family.",
                         "How do you get along with your family?",
                         "Is your family important to you?"];
    responses["family"] = respVal;
    responses["mother"] = respVal;
    responses["father"] = respVal;
    responses["mom"] = respVal;
    responses["dad"] = respVal;
    responses["sister"] = respVal;
    responses["brother"] = respVal;
    responses["husband"] = respVal;
    responses["wife"] = respVal;

    respVal = ["What does that dream suggest to you?",
                         "Do you dream often?",
                         "What persons appear in your dreams?",
                         "Are you disturbed by your dreams?"];
    responses["dream"] = respVal;
    responses["nightmare"] = respVal;

    var keywords = ["always","because","sorry","maybe","i think",
                           "you","yes","no","i am","i'm","i feel","family",
                           "mother","mom","dad","father","sister",
                           "brother","husband","wife","dream","nightmare"];
    var response = "";
    var response_array = [""];
    var found = false;
    var currentKeyword = "";
    var keywIndex = 0;
    var inputMessage = $("#messageIn").val();
    
    $('#chatWindow').append("You: " + inputMessage + "\n");

    // set it to lower for easier keyword mapping
    inputMessage = inputMessage.toLowerCase();

    // check all keywords against 
    while(keywIndex < keywords.length){
    	// If input has keyword and responses has key-value
    	// for that keyword
    	if(inputMessage.indexOf(keywords[keywIndex])!=-1){
    		found = true;
    		var currentKeyword = keywords[keywIndex];
    		console.log(currentKeyword);
    		console.log(responses[currentKeyword]);
    		response_array = responses[currentKeyword];
    		response = response_array[Math.floor(Math.random()*response_array.length)];

    		// Check for wildcard
    		if(response.indexOf("*")!=-1){
    			var remaining_input = inputMessage.substring(inputMessage.indexOf(currentKeyword)
    				+currentKeyword.length+1, inputMessage.length);
    		

    			response = response.substring(0, response.indexOf("*")) + remaining_input.substring(0, remaining_input.length-1) + 
    			 remaining_input.substring(remaining_input.length-1, remaining_input.length).replace("[^A-Za-z]","") + response.substring(response.indexOf("*")+1);

    		//response = response.trim();
    		}
    	}
    	keywIndex++;
    }
    // If no keywords get random notfound response
    if(!found){
    	response_array=responses["NOTFOUND"];
    	response = response_array[Math.floor(Math.random()*response_array.length)];
    }
    // Print Eliza's response.
    respondWait(response);
	// Lock textarea to bottom
	$('#chatWindow').scrollTop($('#chatWindow')[0].scrollHeight);
});

/**
    Make Eliza more human give her a delay to speak
    disable speak button
*/

function respondWait(response){
    var dTime = (response.length *.25) * 300;
    // Max it to 3 seconds
    if(dTime>3000){
        console.log(dTime)
         dTime = 4000;
    }
    console.log(dTime);
    $("#speak").prop("disabled", true);
    setTimeout(function(){
        $('#chatWindow').append("Eliza: " + response + "\n");
        $("#speak").prop("disabled", false);
        $("#messageIn").val("");
    }, dTime);
}