"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickStage = clickStage;

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

var _initPipeline = require("../pipeline/initPipeline");

var _initAction = require("../pipeline/initAction");

var _pipelineData = require("../pipeline/pipelineData");

var _widget = require("../theme/widget");

var _removeLinkArray = require("../relation/removeLinkArray");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function clickStage(sd, si) {

    // clickNodeData = sd;

    //show stage form
    $.ajax({
        url: "../../templates/stage/stageEdit.html",
        type: "GET",
        cache: false,
        success: function success(data) {
            $("#pipeline-info-edit").html($(data));

            $.each(sd.setupData, function (name, value) {
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            (0, _widget.resizeWidget)();
        }
    });

    constant.buttonView.selectAll("image").remove();

    //show stage pop button
    constant.buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/actionAdd.svg";
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
        sd.actions.splice(sd.actions.length, 0, {
            id: constant.PIPELINE_ACTION + "-" + uuid.v1(),
            type: constant.PIPELINE_ACTION,
            parentIndex: si,
            index: i,
            setupData: {}
        });
        constant.buttonView.selectAll("image").remove();
        (0, _initAction.initAction)();
    });

    //show del stage button
    constant.buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/stageDel.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX + constant.svgButtonWidth / 3;
    }).attr("translateY", function (d, i) {
        return sd.translateY - constant.svgButtonHeight * 2;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        constant.buttonView.selectAll("image").remove();

        $("#pipeline-info-edit").html("");
        _pipelineData.pipelineData.splice(si, 1);

        (0, _removeLinkArray.removeLinkArray)(sd);
        (0, _initPipeline.initPipeline)();
        (0, _initAction.initAction)();
    });

    //show close stage pop button
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