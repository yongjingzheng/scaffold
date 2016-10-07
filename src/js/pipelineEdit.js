import {jsonEditor} from "./jquery.jsoneditor";
import {bipatiteJson} from "./bipatiteJson";
import {bipatiteLine} from "./bipatiteLine";
import {bipatiteView} from "./bipatiteView";
import {resizeWidget} from "./theme/widget";

export var importJson = {
    "ref": "simple-tag",
    "repository": {
        "id": 35129377,
    }
};
   
export var outputJson = {
    "ref": "simple-tag",
    "repository": {
        "id": 35129377,
    }};

export var bipatiteViewOn = false;

export function pipelineEdit(data){

	$("#pipeline-info-edit").html($(data));
    
	
    bipatiteView(importJson,outputJson);
    

    resizeWidget();
}