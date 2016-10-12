import * as constant from "../common/constant";
import {initPipeline} from "../pipeline/initPipeline";
import {initAction} from "../pipeline/initAction";
import {initLine} from "../pipeline/initLine";
import {pipelineData} from "../pipeline/main";
import {resizeWidget} from "../theme/widget";
import {pipelineEdit} from "../relation/pipelineEdit";
import {removeLinkArray} from "../relation/removeLinkArray";
import {initActionIO} from "./action.io";
import {initActionSetup} from "./action.setup";

export function clickAction(sd, si) {

    // clickNodeData = sd;

    //show git form
    $.ajax({
        url: "../../templates/action/actionEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            initActionSetup(sd);

            initActionIO(sd);

            $("#uuid").attr("value", sd.id);

            // view select init
            $("#action-component-select").select2({
               minimumResultsForSearch: Infinity
             });
            $("#k8s-service-protocol").select2({
               minimumResultsForSearch: Infinity
            });

            resizeWidget(); 
            

            // $("#see-links").click(function(){
            //     $.ajax({
            //         url: "../../templates/relation/pipelineEdit.html",
            //         type: "GET",
            //         cache: false,
            //         success: function (data) {
            //             pipelineEdit(data);
            //         }
            //     });
            // })        
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