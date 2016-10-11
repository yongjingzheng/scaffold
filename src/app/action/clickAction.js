import * as constant from "../common/constant";
import {initPipeline} from "../pipeline/initPipeline";
import {initAction} from "../pipeline/initAction";
import {initLine} from "../pipeline/initLine";
import {pipelineData} from "../pipeline/pipelineData";
import {resizeWidget} from "../theme/widget";
import {pipelineEdit} from "../relation/pipelineEdit";
import {removeLinkArray} from "../relation/removeLinkArray";
import {initActionIO,initTreeEdit,initFromEdit} from "./action.io";
import {initK8sForm,saveActionData} from "./action.form";

export function clickAction(sd, si) {

    // clickNodeData = sd;

    //show git form
    $.ajax({
        url: "../../templates/action/actionEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            initActionIO(sd);
            initTreeEdit();

            $("#action-component-select").select2({
               minimumResultsForSearch: Infinity
             });
            $("#k8s-service-protocol").select2({
               minimumResultsForSearch: Infinity
             });

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            $("#see-links").click(function(){
                $.ajax({
                    url: "../../templates/relation/pipelineEdit.html",
                    type: "GET",
                    cache: false,
                    success: function (data) {
                        pipelineEdit(data);
                    }
                });
            })

            // events binding

            // input output from edit
            $("#tree-edit-tab").on('click',function(){
                initTreeEdit();
            })

            $("#input-from-edit-tab").on('click',function(){
                initFromEdit("input");
            })

            $("#output-from-edit-tab").on('click',function(){
                initFromEdit("output");
            });

            // action form
            $("#saveAction").on('click',function(){
                saveActionData();
            })

            $("#k8s-service-advanced").on("click",function(){
                $("#k8s-service-advanced").hide();
                $("#close-k8s-service-advanced").show();
                $("#service-advanced").parent().show();
            })

            $("#close-k8s-service-advanced").on("click",function(){
                $("#k8s-service-advanced").show();
                $("#close-k8s-service-advanced").hide();
                $("#service-advanced").parent().hide();
            })

            $("#k8s-pod-advanced").on("click",function(){
                $("#k8s-pod-advanced").hide();
                $("#close-k8s-pod-advanced").show();
                $("#pod-advanced").parent().show();
            })

            $("#close-k8s-pod-advanced").on("click",function(){
                $("#k8s-pod-advanced").show();
                $("#close-k8s-pod-advanced").hide();
                $("#pod-advanced").parent().hide();
            })

            initK8sForm();

            resizeWidget(); 
        }
    });

    constant.buttonView.selectAll("image").remove();

    // show action del button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "../../assets/svg/actionDel.svg";
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
            $("#pipeline-info-edit").html("");
            for (var key in pipelineData) {
                if (pipelineData[key].type == constant.PIPELINE_STAGE && pipelineData[key].actions.length > 0) {
                    for (var actionKey in pipelineData[key].actions) {
                        if (pipelineData[key].actions[actionKey].id == sd.id) {
                            pipelineData[key].actions.splice(actionKey, 1);
                            
                        }

                    }
                }

            }
            removeLinkArray(sd);
            initPipeline();
            initAction();
            initLine();
           
        });


    //show close action pop button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "../../assets/svg/stageClosePop.svg";
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