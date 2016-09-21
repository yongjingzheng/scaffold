import d3 from "./d3.min";
import * as constant from "./constant";
import {setPath} from "./setPath";


export function initLine() {

    constant.linesView.selectAll("g").remove();

    var diagonal = d3.svg.diagonal();

    var pipelineLineViewId = "pipeline-line-view";

    constant.lineView[pipelineLineViewId] = constant.linesView.append("g")
        .attr("width", constant.svgWidth)
        .attr("height", constant.svgHeight)
        .attr("id", pipelineLineViewId);

    constant.pipelineView.selectAll("image").each(function (d, i) {

        //pipeline line
        if (i != 0) {
            constant.lineView[pipelineLineViewId]
                .append("path")
                .attr("d", function () {
                    return diagonal({
                        source: {x: d.translateX - constant.PipelineNodeSpaceSize, y: constant.pipelineNodeStartY + 22.5},
                        target: {x: d.translateX + 2, y: constant.pipelineNodeStartY + 22.5}
                    });
                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 5);
        }

        //Action Diagonal
        if (d.type == constant.PIPELINE_STAGE && d.actions != null && d.actions.length > 0) {

            var actionLineViewId = "action-line" + "-" + d.id;
            var action2StageLineViewId = "action-2-stage-line" + "-" + d.id;

            // Action 2 Stage
            constant.lineView[action2StageLineViewId] = constant.linesView.append("g")
                .attr("width", constant.svgWidth)
                .attr("height", constant.svgHeight)
                .attr("id", action2StageLineViewId);

            constant.lineView[action2StageLineViewId].selectAll("path")
                .data(d.actions).enter()
                .append("path")
                .attr("d", function (ad, ai) {
                    if (ai % 2 == 0) {
                        constant.lineView[action2StageLineViewId]
                            .append("path")
                            .attr("d", function (fd, fi) {
                                return diagonal({
                                    source: {x: ad.translateX + 15, y: ad.translateY + 25},
                                    target: {x: ad.translateX + 15, y: ad.translateY + 40}
                                });
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("stroke-dasharray", "2,2");

                        return diagonal({
                            source: {x: ad.translateX + 15, y: ad.translateY},
                            target: {x: ad.translateX + 15, y: ad.translateY - 50}
                        });
                    } else {
                        constant.lineView[action2StageLineViewId]
                            .append("path")
                            .attr("d", function (fd, fi) {
                                return diagonal({
                                    source: {x: ad.translateX + 15, y: ad.translateY + 0},
                                    target: {x: ad.translateX + 15, y: ad.translateY - 15}
                                });
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("stroke-dasharray", "2,2");

                        return diagonal({
                            source: {x: ad.translateX + 15, y: ad.translateY + 25},
                            target: {x: ad.translateX + 15, y: ad.translateY + 75}
                        });
                    }
                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "2,2");
        }

    });
 
   constant.linePathAry.forEach(function(i){
        setPath(i);
   })
}