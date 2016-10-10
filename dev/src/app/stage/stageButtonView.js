"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stageButtonView = stageButtonView;

var _constant = require("..common/constant");

function stageButtonView(sd, si, buttonView, initAction, initPipeline, pipelineData) {

    buttonView.selectAll("image").remove();

    //show stage pop button
    buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/actionAdd.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return _constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return _constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX - _constant.svgButtonWidth * 2;
    }).attr("translateY", function (d, i) {
        return sd.translateY;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - _constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - _constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        sd.actions.splice(sd.actions.length, 0, {
            id: _constant.PIPELINE_ACTION + "-" + uuid.v1(),
            type: _constant.PIPELINE_ACTION,
            class: _constant.PIPELINE_ACTION,
            drawX: 0,
            drawY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0,
            setupData: {}
        });
        buttonView.selectAll("image").remove();
        initAction();
    });

    //show del stage button
    buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/stageDel.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return _constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return _constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX + _constant.svgButtonWidth / 3;
    }).attr("translateY", function (d, i) {
        return sd.translateY - _constant.svgButtonHeight * 2;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - _constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - _constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        buttonView.selectAll("image").remove();
        pipelineData.splice(si, 1);
        initPipeline();
        initAction();
    });

    //show close stage pop button
    buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/stageClosePop.svg";
    }).attr("id", function (d, i) {
        return "button" + "-" + uuid.v1();
    }).attr("width", function (d, i) {
        return _constant.svgButtonWidth;
    }).attr("height", function (d, i) {
        return _constant.svgButtonHeight;
    }).attr("translateX", function (d, i) {
        return sd.translateX + _constant.svgButtonWidth * 2.6;
    }).attr("translateY", function (d, i) {
        return sd.translateY;
    }).attr("transform", function (d, i) {
        return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
    }).on("mouseover", function (d, i) {
        d3.select(this).attr("transform", "translate(" + (this.attributes["translateX"].value - _constant.svgButtonWidth / 2) + "," + (this.attributes["translateY"].value - _constant.svgButtonHeight / 2) + ") scale(2)");
    }).on("mouseout", function (d, i) {
        d3.select(this).attr("transform", "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ") scale(1)");
    }).on("click", function (d, i) {
        buttonView.selectAll("image").remove();
    });
}