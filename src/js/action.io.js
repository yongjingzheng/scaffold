export let inputJson = {},
           outputJson = {};

var codeEditor,treeEditor;

export function initFromEdit(type,codeContainer,treeContainer){
    if(codeEditor){
        codeEditor.destroy();
    }

    if(treeEditor){
        treeEditor.destroy();
    }

    var options = {
        "mode": "code",
        "indentation": 2
    };
    codeEditor = new JSONEditor(codeContainer, options);

    var options = {
        "mode": "tree",
        "search": true
    };
    treeEditor = new JSONEditor(treeContainer, options);

    if(type == "input"){
        codeEditor.set(inputJson);
        treeEditor.set(inputJson);
        $("#inputFromJson").on('click',function(){
            fromCodeToTree("input");
        })       
    }else if(type == "output"){
        codeEditor.set(outputJson);
        treeEditor.set(outputJson);
        $("#outputFromJson").on('click',function(){
            fromCodeToTree("output");
        })
    }
    
    treeEditor.expandAll();
}

function fromCodeToTree(type){
    if(type == "input"){
        inputJson = codeEditor.get();
        treeEditor.set(inputJson);
    }else if(type == "output"){
        outputJson = codeEditor.get();
        treeEditor.set(outputJson);
    }
    
    treeEditor.expandAll();
}