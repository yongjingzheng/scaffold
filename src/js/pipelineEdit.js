import {jsonEditor} from "./jquery.jsoneditor";
import {bipatiteJson} from "./bipatiteJson";
import {bipatiteLine} from "./bipatiteLine";


export var importJson = {
    	
		      "login": "baxterthehacker",
		      "id": 6752317,
		      "avatar_url": {
		      	  "gravatar_id": "",
			      "url": "https://api.github.com/users/baxterthehacker",
			      "html_url": "https://github.com/baxterthehacker",
			      "followers_url": "https://api.github.com/users/baxterthehacker/followers",
			      "following_url": "https://api.github.com/users/baxterthehacker/following{/other_user}",
			      "gists_url": "https://api.github.com/users/baxterthehacker/gists{/gist_id}",
			      "starred_url": "https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}",
			      "subscriptions_url": "https://api.github.com/users/baxterthehacker/subscriptions",
			      "organizations_url": "https://api.github.com/users/baxterthehacker/orgs",
			      "repos_url": "https://api.github.com/users/baxterthehacker/repos",
			      "events_url": "https://api.github.com/users/baxterthehacker/events{/privacy}",
			      "received_events_url": "https://api.github.com/users/baxterthehacker/received_events",
			      "type": "User"
		      }
		      
		   
    };
   
export var outputJson = {};

export var bipatiteViewOn = false;

export function pipelineEdit(data){

	$("#pipeline-info-edit").html($(data));
    

	$("#importEditIcon").click(function(){
		if($("#importJsonDiv").hasClass("hide")){
			$("#importJsonDiv").removeClass("hide").addClass("show");
			
		}else{
			$("#importJsonDiv").removeClass("show").addClass("hide");
			
		}
	})

    $("#importJson").click(function(){
        var val = $("#importJsonText").val();
        try{
            importJson = (JSON.parse(val));
            jsonEditor($('#importDiv'),importJson, {
            	change:function(data){
            		outputJson = data;
	            }
	        });
	        outputJson = importJson;
            $("#importJsonDiv").removeClass("show").addClass("hide");

        }catch(e){
            console.log("Error in parsing json.");
            alert("Error in parsing json.");
        }
        
    });

    $("#bipartiteView").click(function(){

    	var type = $(this).text().trim()
    	if(type == "editView"){
			$(this).text("bipartiteView");
			$(".json-editor").removeClass("bipartite-view");
			$(".config-col").children().removeClass("hide");
			bipatiteViewOn = false;
    	}else{
    		$(this).text("editView");
    		$(".json-editor").addClass("bipartite-view");
    		$(".config-col").children().addClass("hide");
    		bipatiteViewOn = true;
    		bipatiteLine(bipatiteJson(importJson,outputJson,"start"));
    	}

    });

    $("#importOutput").click(function(){
    	jsonEditor($('#outputDiv'),outputJson, {});
    });


    $("#closeImportJson").click(function(){
        $("#importJsonDiv").removeClass("show").addClass("hide");
    })


}