
import * as constant from "./constant";
import {drag} from "./drag";
import {mouseoverRelevantPipeline,mouseoutRelevantPipeline} from "./lineHover";
import {initLine} from "./initLine";
import {clickAction} from "./clickAction";
import {dragDropSetPath} from "./dragDropSetPath";

export function initAction() {
    constant.actionsView.selectAll("g").remove();

    //Action
    constant.pipelineView.selectAll("image").each(function (d, i) {
        if (d.type == constant.PIPELINE_STAGE && d.actions != null && d.actions.length > 0) {
            var actionViewId = "action" + "-" + d.id;

            constant.actionView[actionViewId] = constant.actionsView.append("g")
                .attr("width", constant.svgWidth)
                .attr("height", constant.svgHeight)
                .attr("id", actionViewId);

            var actionStartX = d.translateX + 7.5;
            var actionStartY = d.translateY;

            constant.actionView[actionViewId].selectAll("image")
                .data(d.actions).enter()
                .append("image")
                .attr("xlink:href", function (ad, ai) {
                    if (ai % 2 == 0) {
                        return "./svg/action-bottom.svg";
                    } else {
                        return "./svg/action-top.svg";
                    }
                })
                .attr("id", function (ad, ai) {
                    return ad.id;
                })
                .attr("width", function (ad, ai) {
                    return constant.svgActionWidth;
                })
                .attr("height", function (ad, ai) {
                    return constant.svgActionHeight;
                })
                .attr("transform", function (ad, ai) {
                    ad.width = constant.svgActionWidth;
                    ad.height = constant.svgActionHeight;
                    if (ai % 2 == 0) {
                        ad.translateX = actionStartX;
                        ad.translateY = actionStartY + constant.svgStageHeight - 25 + constant.ActionNodeSpaceSize * (ai / 2 + 1);
                    } else {
                        ad.translateX = actionStartX;
                        ad.translateY = actionStartY - constant.svgStageHeight + 5 - constant.ActionNodeSpaceSize * (ai / 2);
                    }

                    return "translate(" + ad.translateX + "," + ad.translateY + ")";
                })
                .on("mousedown",function(ad,ai){
                    dragDropSetPath({
                        "data" : ad,
                        "node" : ai
                    });
                   
                })
                .on("mouseover", function (ad, ai) {
                    if (ai % 2 == 0) {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-bottom-mouseover.svg";
                            });
                    } else {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-top-mouseover.svg";
                            });
                    }
                    mouseoverRelevantPipeline(ad);
                })
                .on("mouseout", function (ad, ai) {
                    if (ai % 2 == 0) {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-bottom.svg";
                            });
                    } else {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-top.svg";
                            });
                    }
                    mouseoutRelevantPipeline();
                })
                .on("click", function (ad, ai) {
                    clickAction(ad, ai);
                }).call(drag);
        }

    });

    initLine();
}