import $ from "./jquery.min";
import d3 from "./d3.min";
import uuid from "./uuid/uuid";
import * as constant from "./constant";
import {initPipeline} from "./initPipeline";
import {initAction} from "./initAction";
import {pipelineData} from "./pipelineData";


export function clickStage(sd, si) {

    // clickNodeData = sd;

    //show stage form
    $.ajax({
        url: "./templates/stageEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(sd.setupData, function (name, value) {
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);
        }
    });

    constant.buttonView.selectAll("image").remove();

    //show stage pop button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/actionAdd.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return constant.svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX - (constant.svgButtonWidth * 2);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {

            return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            sd.actions.splice(
                sd.actions.length,
                0,
                {
                    id: constant.PIPELINE_ACTION + "-" + uuid.v1(),
                    type: constant.PIPELINE_ACTION,
                    class: constant.PIPELINE_ACTION,
                    drawX: 0,
                    drawY: 0,
                    width: 0,
                    height: 0,
                    translateX: 0,
                    translateY: 0,
                    setupData: {}
                });
            constant.buttonView.selectAll("image").remove();
            initAction();
        });

    //show del stage button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/stageDel.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return constant.svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX + (constant.svgButtonWidth / 3);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY - (constant.svgButtonHeight * 2);
        })
        .attr("transform", function (d, i) {
            return "translate("
                + this.attributes["translateX"].value + ","
                + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            constant.buttonView.selectAll("image").remove();
            pipelineData.splice(si, 1);

          
            initPipeline();
            initAction();
        });


    //show close stage pop button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/stageClosePop.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return constant.svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX + (constant.svgButtonWidth * 2.6);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {
            return "translate("
                + this.attributes["translateX"].value + ","
                + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            constant.buttonView.selectAll("image").remove();
        });

}