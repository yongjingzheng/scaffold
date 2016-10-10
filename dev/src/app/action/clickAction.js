"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickAction = clickAction;

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

var _initPipeline = require("../pipeline/initPipeline");

var _initAction = require("../pipeline/initAction");

var _initLine = require("../pipeline/initLine");

var _pipelineData = require("../pipeline/pipelineData");

var _widget = require("../theme/widget");

var _pipelineEdit = require("../relation/pipelineEdit");

var _removeLinkArray = require("../relation/removeLinkArray");

var _action = require("./action.io");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function clickAction(sd, si) {

    // clickNodeData = sd;

    //show git form
    $.ajax({
        url: "../../templates/action/actionEdit.html",
        type: "GET",
        cache: false,
        success: function success(data) {
            $("#pipeline-info-edit").html($(data));

            (0, _action.initActionIO)(sd);
            (0, _action.initTreeEdit)();

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            $("#see-links").click(function () {
                $.ajax({
                    url: "../../templates/relation/pipelineEdit.html",
                    type: "GET",
                    cache: false,
                    success: function success(data) {
                        (0, _pipelineEdit.pipelineEdit)(data);
                    }
                });
            });

            // input output from edit
            $("#tree-edit-tab").on('click', function () {
                (0, _action.initTreeEdit)();
            });

            $("#input-from-edit-tab").on('click', function () {
                (0, _action.initFromEdit)("input");
            });

            $("#output-from-edit-tab").on('click', function () {
                (0, _action.initFromEdit)("output");
            });

            (0, _widget.resizeWidget)();
        }
    });

    constant.buttonView.selectAll("image").remove();

    // show action del button
    constant.buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/actionDel.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX - constant.svgButtonWidth * 2;
    }).attr("translateY", function (d, i) {
        return sd.translateY;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        constant.buttonView.selectAll("image").remove();
        $("#pipeline-info-edit").html("");
        for (var key in _pipelineData.pipelineData) {
            if (_pipelineData.pipelineData[key].type == constant.PIPELINE_STAGE && _pipelineData.pipelineData[key].actions.length > 0) {
                for (var actionKey in _pipelineData.pipelineData[key].actions) {
                    if (_pipelineData.pipelineData[key].actions[actionKey].id == sd.id) {
                        _pipelineData.pipelineData[key].actions.splice(actionKey, 1);
                    }
                }
            }
        }
        (0, _removeLinkArray.removeLinkArray)(sd);
        (0, _initPipeline.initPipeline)();
        (0, _initAction.initAction)();
        (0, _initLine.initLine)();
    });

    //show close action pop button
    constant.buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/stageClosePop.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX + constant.svgButtonWidth * 2.6;
    }).attr("translateY", function (d, i) {
        return sd.translateY;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        constant.buttonView.selectAll("image").remove();
    });
}

function jsonChanged(root, json) {
    root.val(JSON.stringify(json));
}