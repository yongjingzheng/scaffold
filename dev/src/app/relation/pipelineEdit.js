"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bipatiteViewOn = exports.outputJson = exports.importJson = undefined;
exports.pipelineEdit = pipelineEdit;

var _jquery = require("../../vendor/jquery.jsoneditor");

var _bipatiteJson = require("./bipatiteJson");

var _bipatiteLine = require("./bipatiteLine");

var _bipatiteView = require("./bipatiteView");

var _widget = require("../theme/widget");

var _pipelineData = require("../pipeline/pipelineData");

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var importJson = exports.importJson = {};

var outputJson = exports.outputJson = {};

var bipatiteViewOn = exports.bipatiteViewOn = false;

function pipelineEdit(data, linkDom) {

    var fromParent = linkDom.attr("from-parent"),
        fromIndex = linkDom.attr("from-index"),
        toParent = linkDom.attr("to-parent"),
        toIndex = linkDom.attr("to-index"),
        index = linkDom.attr("data-index");

    $("#pipeline-info-edit").html($(data));

    $("#removeLink").click(function () {
        linkDom.remove();
        constant.linePathAry.splice(index, 1);
        $("#pipeline-info-edit").html("");
    });

    if (fromParent != -1) {
        if (_pipelineData.pipelineData[fromParent].actions[fromIndex].inputJson != undefined) {
            $("#importDiv").html("");
            exports.importJson = importJson = _pipelineData.pipelineData[fromParent].actions[fromIndex].outputJson;
        } else {
            $("#importDiv").html("no data");
            exports.importJson = importJson = {};
        }
    } else {
        $("#importDiv").html("no data");
        exports.importJson = importJson = {};
    }

    if (_pipelineData.pipelineData[toParent].actions[toIndex].outputJson != undefined) {
        $("#outputDiv").html("");
        exports.outputJson = outputJson = _pipelineData.pipelineData[toParent].actions[toIndex].inputJson;
    } else {
        $("#outputDiv").html("no data");
        exports.outputJson = outputJson = {};
    }

    (0, _bipatiteView.bipatiteView)(importJson, outputJson, constant.linePathAry[index]);

    (0, _widget.resizeWidget)();
}