"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actionButtonView = actionButtonView;

var _constant = require("../common/constant");

function actionButtonView() {
    buttonView.selectAll("image").remove();

    // show action del button
    buttonView.append("image").attr("xlink:href", function (d, i) {
        return "../../assets/svg/actionDel.svg";
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
        buttonView.selectAll("image").remove();

        for (var key in pipelineData) {
            if (pipelineData[key].type == _constant.PIPELINE_STAGE && pipelineData[key].actions.length > 0) {
                for (var actionKey in pipelineData[key].actions) {
                    if (pipelineData[key].actions[actionKey].id == sd.id) {
                        pipelineData[key].actions.splice(actionKey, 1);
                        initPipeline();
                        initAction();
                        initLine();
                        return;
                    }
                }
            }
        }

        // console.log(pipelineData);
    });

    //show close action pop button
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