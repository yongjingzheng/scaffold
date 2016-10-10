'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actionData = undefined;
exports.initActionIO = initActionIO;
exports.initTreeEdit = initTreeEdit;
exports.initFromEdit = initFromEdit;
exports.initFromView = initFromView;

var _jquery = require('../../vendor/jquery.jsoneditor');

var actionData = exports.actionData = void 0;

var treeEdit_InputContainer, treeEdit_OutputContainer;
var fromEdit_InputCodeContainer, fromEdit_InputTreeContainer, fromEdit_OutputCodeContainer, fromEdit_OutputTreeContainer;
var fromEdit_OutputViewContainer;
var fromEdit_CodeEditor, fromEdit_TreeEditor;

function initActionIO(data) {
    exports.actionData = actionData = data;
    if (actionData.inputJson == undefined) {
        actionData.inputJson = {};
    }
    if (actionData.outputJson == undefined) {
        actionData.outputJson = {};
    }

    treeEdit_InputContainer = $('#inputTreeDiv');
    treeEdit_OutputContainer = $('#outputTreeDiv');
    fromEdit_InputCodeContainer = $("#inputCodeEditor")[0];
    fromEdit_InputTreeContainer = $("#inputTreeEditor")[0];
    fromEdit_OutputCodeContainer = $("#outputCodeEditor")[0];
    fromEdit_OutputTreeContainer = $("#outputTreeEditor")[0];
    fromEdit_OutputViewContainer = $("#outputTreeViewer")[0];
}

function initTreeEdit() {
    try {
        (0, _jquery.jsonEditor)(treeEdit_InputContainer, actionData.inputJson, {
            change: function change(data) {
                actionData.inputJson = data;
            }
        });
    } catch (e) {
        alert("Input Error in parsing json.");
    }

    try {
        (0, _jquery.jsonEditor)(treeEdit_OutputContainer, actionData.outputJson, {
            change: function change(data) {
                actionData.outputJson = data;
            }
        });
    } catch (e) {
        alert("Output Error in parsing json.");
    }
}

function initFromEdit(type) {
    if (fromEdit_CodeEditor) {
        fromEdit_CodeEditor.destroy();
    }

    if (fromEdit_TreeEditor) {
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

    if (type == "input") {
        fromEdit_CodeEditor = new JSONEditor(fromEdit_InputCodeContainer, codeOptions);
        fromEdit_TreeEditor = new JSONEditor(fromEdit_InputTreeContainer, treeOptions);
        fromEdit_CodeEditor.set(actionData.inputJson);
        fromEdit_TreeEditor.set(actionData.inputJson);
        $("#inputFromJson").on('click', function () {
            fromCodeToTree("input");
        });
        $("#inputToJson").on('click', function () {
            fromTreeToCode("input");
        });
    } else if (type == "output") {
        fromEdit_CodeEditor = new JSONEditor(fromEdit_OutputCodeContainer, codeOptions);
        fromEdit_TreeEditor = new JSONEditor(fromEdit_OutputTreeContainer, treeOptions);
        fromEdit_CodeEditor.set(actionData.outputJson);
        fromEdit_TreeEditor.set(actionData.outputJson);
        $("#outputFromJson").on('click', function () {
            fromCodeToTree("output");
        });
        $("#outputToJson").on('click', function () {
            fromTreeToCode("output");
        });
    }

    fromEdit_TreeEditor.expandAll();
}

function fromCodeToTree(type) {
    if (type == "input") {
        try {
            actionData.inputJson = fromEdit_CodeEditor.get();
            fromEdit_TreeEditor.set(actionData.inputJson);
        } catch (e) {
            alert("Input Code Changes Error in parsing json.");
        }
    } else if (type == "output") {
        try {
            actionData.outputJson = fromEdit_CodeEditor.get();
            fromEdit_TreeEditor.set(actionData.outputJson);
        } catch (e) {
            alert("Output Code Changes Error in parsing json.");
        }
    }

    fromEdit_TreeEditor.expandAll();
}

function fromTreeToCode(type) {
    if (type == "input") {
        try {
            actionData.inputJson = fromEdit_TreeEditor.get();
            fromEdit_CodeEditor.set(actionData.inputJson);
        } catch (e) {
            alert("Input Tree Changes Error in parsing json.");
        }
    } else if (type == "output") {
        try {
            actionData.outputJson = fromEdit_TreeEditor.get();
            fromEdit_CodeEditor.set(actionData.outputJson);
        } catch (e) {
            alert("Output Tree Changes Error in parsing json.");
        }
    }
}

function initFromView() {
    if (fromEdit_TreeEditor) {
        fromEdit_TreeEditor.destroy();
    }

    var treeOptions = {
        "mode": "view",
        "search": true
    };

    fromEdit_TreeEditor = new JSONEditor(fromEdit_OutputViewContainer, treeOptions);
    fromEdit_TreeEditor.set(actionData.outputJson);

    fromEdit_TreeEditor.expandAll();
}