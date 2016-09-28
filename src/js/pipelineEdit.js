import {jsonEditor} from "./jquery.jsoneditor";
import {bipatiteJson} from "./bipatiteJson";
import {bipatiteLine} from "./bipatiteLine";
import {bipatiteView} from "./bipatiteView";

export var importJson = {};
   
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

    	bipatiteView(importJson,outputJson);
    	

   //  	var type = $(this).text().trim()
   //  	if(type == "editView"){
			// $(this).text("bipartiteView");
			// $(".json-editor").removeClass("bipartite-view");
			// $(".config-col").children().removeClass("hide");
			// bipatiteViewOn = false;
   //  	}else{
   //  		$(this).text("editView");
   //  		$(".json-editor").addClass("bipartite-view");
   //  		$(".config-col").children().addClass("hide");
   //  		bipatiteViewOn = true;
   //  		bipatiteLine(bipatiteJson(importJson,outputJson,"start"));
   //  	}

    });

    $("#importOutput").click(function(){
    	jsonEditor($('#outputDiv'),outputJson, {});
    });


    $("#closeImportJson").click(function(){
        $("#importJsonDiv").removeClass("show").addClass("hide");
    })


}