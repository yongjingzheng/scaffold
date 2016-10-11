import {jsonEditor} from "../../vendor/jquery.jsoneditor";
import {k8sServiceAdvancedData,k8sPodAdvancedData} from "./action.form.data";

let k8sServiceAdvancedEditor,k8sPodAdvancedEditor;
let k8sServiceAdvancedContainer,k8sPodAdvancedContainer;

let k8sSAD = $.extend(true,{},k8sServiceAdvancedData);
let k8sPAD = $.extend(true,{},k8sPodAdvancedData);

export function initK8sForm(){
    k8sServiceAdvancedContainer = $("#service-advanced")[0];
    k8sPodAdvancedContainer = $("#pod-advanced")[0];
    initK8sServiceAdvanced();
    initK8sPodAdvanced();
}

function initK8sServiceAdvanced(){
    if(k8sServiceAdvancedEditor){
        k8sServiceAdvancedEditor.destroy();
    }

    var treeOptions = {
        "mode": "tree",
        "search": true
    };

    k8sServiceAdvancedEditor = new JSONEditor(k8sServiceAdvancedContainer, treeOptions);
    k8sServiceAdvancedEditor.set(k8sSAD);
    
    k8sServiceAdvancedEditor.expandAll();
}

function initK8sPodAdvanced(){
    if(k8sPodAdvancedEditor){
        k8sPodAdvancedEditor.destroy();
    }

    var treeOptions = {
        "mode": "tree",
        "search": true
    };

    k8sPodAdvancedEditor = new JSONEditor(k8sPodAdvancedContainer, treeOptions);
    k8sPodAdvancedEditor.set(k8sPAD);
    
    k8sPodAdvancedEditor.expandAll();
}

export function saveActionData(){
    if(!$('#action-form').parsley().validate()){
        return;
    }
}