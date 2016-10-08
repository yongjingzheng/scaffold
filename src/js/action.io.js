import {jsonEditor} from "./jquery.jsoneditor";

export let actionData;

var treeEdit_InputContainer,treeEdit_OutputContainer;
var fromEdit_InputCodeContainer,fromEdit_InputTreeContainer,fromEdit_OutputCodeContainer,fromEdit_OutputTreeContainer;

var fromEdit_CodeEditor,fromEdit_TreeEditor;

export function initActionIO(data){
    actionData = data;
    if(actionData.inputJson == undefined){
        actionData.inputJson = {};
    }
    if(actionData.outputJson == undefined){
        actionData.outputJson = {};
    }

    treeEdit_InputContainer = $('#inputTreeDiv');
    treeEdit_OutputContainer = $('#outputTreeDiv');
    fromEdit_InputCodeContainer = $("#inputCodeEditor")[0];
    fromEdit_InputTreeContainer = $("#inputTreeEditor")[0];
    fromEdit_OutputCodeContainer = $("#outputCodeEditor")[0];
    fromEdit_OutputTreeContainer = $("#outputTreeEditor")[0];
}

export function initTreeEdit(){
    try{
        jsonEditor(treeEdit_InputContainer,actionData.inputJson, {
            change:function(data){
                actionData.inputJson = data;
            }
        });
    }catch(e){
        alert("Input Error in parsing json.");
    }

    try{
        jsonEditor(treeEdit_OutputContainer,actionData.outputJson, {
            change:function(data){
                actionData.outputJson = data;
            }
        });
    }catch(e){
        alert("Output Error in parsing json.");
    }
}

export function initFromEdit(type){
    if(fromEdit_CodeEditor){
        fromEdit_CodeEditor.destroy();
    }

    if(fromEdit_TreeEditor){
            fromEdit_TreeEditor.destroy();
    }

    var codeOptions = {
        "mode": "code",
        "indentation": 2
    };

    var treeOptions = {
        "mode": "tree",
        "search": true
    };

    if(type == "input"){
        fromEdit_CodeEditor = new JSONEditor(fromEdit_InputCodeContainer, codeOptions);
        fromEdit_TreeEditor = new JSONEditor(fromEdit_InputTreeContainer, treeOptions);
        fromEdit_CodeEditor.set(actionData.inputJson);
        fromEdit_TreeEditor.set(actionData.inputJson);
        $("#inputFromJson").on('click',function(){
            fromCodeToTree("input");
        })  
        $("#inputToJson").on('click',function(){
            fromTreeToCode("input");
        })       
    }else if(type == "output"){
        fromEdit_CodeEditor = new JSONEditor(fromEdit_OutputCodeContainer, codeOptions);
        fromEdit_TreeEditor = new JSONEditor(fromEdit_OutputTreeContainer, treeOptions);
        fromEdit_CodeEditor.set(actionData.outputJson);
        fromEdit_TreeEditor.set(actionData.outputJson);
        $("#outputFromJson").on('click',function(){
            fromCodeToTree("output");
        })
        $("#outputToJson").on('click',function(){
            fromTreeToCode("output");
        })
    }
    
    fromEdit_TreeEditor.expandAll();
}

function fromCodeToTree(type){
    if(type == "input"){
        try{
            actionData.inputJson = fromEdit_CodeEditor.get();
            fromEdit_TreeEditor.set(actionData.inputJson);
        }catch(e){
            alert("Input Code Changes Error in parsing json.");
        }  
    }else if(type == "output"){
        try{
            actionData.outputJson = fromEdit_CodeEditor.get();
            fromEdit_TreeEditor.set(actionData.outputJson);
        }catch(e){
            alert("Output Code Changes Error in parsing json.");
        } 
    }
    
    fromEdit_TreeEditor.expandAll();
}

function fromTreeToCode(type){
    if(type == "input"){
        try{
            actionData.inputJson = fromEdit_TreeEditor.get();
            fromEdit_CodeEditor.set(actionData.inputJson);
        }catch(e){
            alert("Input Tree Changes Error in parsing json.");
        }  
    }else if(type == "output"){
        try{
            actionData.outputJson = fromEdit_TreeEditor.get();
            fromEdit_CodeEditor.set(actionData.outputJson);
        }catch(e){
            alert("Output Tree Changes Error in parsing json.");
        } 
    }
}