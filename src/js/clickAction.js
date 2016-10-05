import {jsonEditor} from "./jquery.jsoneditor";
import * as constant from "./constant";
import {initPipeline} from "./initPipeline";
import {initAction} from "./initAction";
import {initLine} from "./initLine";
import {pipelineData} from "./pipelineData";
import {resizeWidget} from "./theme/widget";
import {pipelineEdit} from "./pipelineEdit";

export var inputJson = {};
   
export var outputJson = {};

export function clickAction(sd, si) {

    // clickNodeData = sd;

    //show git form
    $.ajax({
        url: "./templates/actionEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

           // input
             $("#importInputIcon").click(function(){
                 if($("#inputJsonDiv").hasClass("hide")){
                     $("#inputJsonDiv").removeClass("hide").addClass("show");
                     
                 }else{
                     $("#inputJsonDiv").removeClass("show").addClass("hide");
                     
                 }
             })
 

            $("#importInputJson").click(function(){
                var val = $("#inputJsonText").val();
                try{
                    inputJson = (JSON.parse(val));
                    jsonEditor($('#inputTreeDiv'),inputJson, {
                        change:function(data){
                            inputJson = data;
                            jsonChanged($("#inputJsonText"),inputJson);
                        }
                    });
                    $("#inputJsonDiv").removeClass("show").addClass("hide");

                }catch(e){
                    console.log("Error in parsing json.");
                    alert("Error in parsing json.");
                }
                
            });

            $("#closeImportInputJson").click(function(){
                $("#inputJsonDiv").removeClass("show").addClass("hide");
            })

            // output
             $("#importOutputIcon").click(function(){
                 if($("#outputJsonDiv").hasClass("hide")){
                     $("#outputJsonDiv").removeClass("hide").addClass("show");
                     
                 }else{
                     $("#outputJsonDiv").removeClass("show").addClass("hide");
                     
                 }
             })

            $("#importOutputJson").click(function(){
                var val = $("#outputJsonText").val();
                try{
                    outputJson = (JSON.parse(val));
                    jsonEditor($('#outputTreeDiv'),outputJson, {
                        change:function(data){
                            outputJson = data;
                            jsonChanged($("#outputJsonText"),outputJson);
                        }
                    });
                    $("#outputJsonDiv").removeClass("show").addClass("hide");

                }catch(e){
                    console.log("Error in parsing json.");
                    alert("Error in parsing json.");
                }
                
            });

            $("#closeImportOutputJson").click(function(){
                 $("#outputJsonDiv").removeClass("show").addClass("hide");
             })


            resizeWidget();


            $("#see-links").click(function(){
                $.ajax({
                    url: "./templates/pipelineEdit.html",
                    type: "GET",
                    cache: false,
                    success: function (data) {
                        pipelineEdit(data);
                    }
                });
            })
        }
    });

    constant.buttonView.selectAll("image").remove();

    // show action del button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/actionDel.svg";
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
            constant.buttonView.selectAll("image").remove();

            for (var key in pipelineData) {
                if (pipelineData[key].type == constant.PIPELINE_STAGE && pipelineData[key].actions.length > 0) {
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


function jsonChanged(root,json){
    root.val(JSON.stringify(json));
}