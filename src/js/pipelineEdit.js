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
            		importJson = data;
	            }
	        });
            $("#importJsonDiv").removeClass("show").addClass("hide");

        }catch(e){
            console.log("Error in parsing json.");
            alert("Error in parsing json.");
        }
        
    });

    $("#bipartiteView").click(function(){

    	bipatiteView(importJson,outputJson);
    });

    $("#importOutput").click(function(){
    	outputJson = importJson;
    	jsonEditor($('#outputDiv'),outputJson, {
    		change:function(data){
            	outputJson = data;
	        }
    	});
    });


    $("#closeImportJson").click(function(){
        $("#importJsonDiv").removeClass("show").addClass("hide");
    })


}