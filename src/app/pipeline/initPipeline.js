


import * as constant from "../common/constant";
import {pipelineData} from "../pipeline/pipelineData";
import {drag} from "../common/drag";
import {clickStart} from "../stage/clickStart";
import {clickAddStage} from "../stage/clickAddStage";
import {clickStage} from "../stage/clickStage";
import {initAction} from "../pipeline/initAction";
import {mouseoverRelevantPipeline,mouseoutRelevantPipeline} from "../relation/lineHover";
import {dragDropSetPath} from "../relation/dragDropSetPath";

export function initPipeline() {

    constant.pipelineView.selectAll("image").remove();
    constant.pipelineView.selectAll("image")
        .data(pipelineData)
        .enter()
        .append("image")
        .attr("xlink:href", function (d, i) {
            // console.log(d.type);
            if (d.type == constant.PIPELINE_START) {
                // console.log(PIPELINE_START);
                return "../../assets/svg/start.svg";
            } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                // console.log(PIPELINE_ADD_STAGE);
                return "../../assets/svg/addStage.svg";
            } else if (d.type == constant.PIPELINE_END) {
                // console.log(PIPELINE_END);
                return "../../assets/svg/end.svg";
            } else if (d.type == constant.PIPELINE_STAGE) {
                // console.log(PIPELINE_STAGE);
                return "../../assets/svg/stage.svg";
            }
        })
        .attr("id", function (d, i) {
            return d.id;
        })
        .attr("data-index",function(d, i){
            return i;
        })
        .attr("width", function (d, i) {
            return constant.svgStageWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgStageHeight;
        })
        .attr("transform", function (d, i) {
            d.width = constant.svgStageWidth;
            d.height = constant.svgStageHeight;
            d.translateX = i * constant.PipelineNodeSpaceSize + constant.pipelineNodeStartX;
            d.translateY = constant.pipelineNodeStartY;
            return "translate(" + d.translateX + "," + d.translateY + ")";
        })
        .attr("translateX",function(d,i){
            return i * constant.PipelineNodeSpaceSize + constant.pipelineNodeStartX;
        })
        .attr("translateY",constant.pipelineNodeStartY)
        .attr("class", function (d, i) {
            // console.log(d);
            if (d.type == constant.PIPELINE_START) {
                return constant.PIPELINE_START;
            } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                return constant.PIPELINE_ADD_STAGE;
            } else if (d.type == constant.PIPELINE_END) {
                return constant.PIPELINE_END;
            } else if (d.type == constant.PIPELINE_STAGE) {
                return constant.PIPELINE_STAGE;
            }
        })
        .on("mousedown",function(d,i){

            if (d.type == constant.PIPELINE_START) {
                dragDropSetPath({
                        "data" : d,
                        "node" : i
                    });
                
            }

        })
        .on("mouseover", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {
                    if (d.type == constant.PIPELINE_START) {
                         mouseoverRelevantPipeline(d);
                        return "../../assets/svg/start-mouseover.svg";
                    } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                        return "../../assets/svg/addStage-mouseover.svg";
                    } else if (d.type == constant.PIPELINE_END) {
                        return "../../assets/svg/end.svg";
                    } else if (d.type == constant.PIPELINE_STAGE) {
                        return "../../assets/svg/stage-mouseover.svg";
                    }
                });

        })
        .on("mouseout", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {
                    if (d.type == constant.PIPELINE_START) {
                        mouseoutRelevantPipeline();
                        return "../../assets/svg/start.svg";
                    } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                        return "../../assets/svg/addStage.svg";
                    } else if (d.type == constant.PIPELINE_END) {
                        return "../../assets/svg/end.svg";
                    } else if (d.type == constant.PIPELINE_STAGE) {
                        return "../../assets/svg/stage.svg";
                    }
                });
        })
        .on("click", function (d, i) {
            if (d.type == constant.PIPELINE_START) {
                clickStart(d, i);
            } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                clickAddStage(d, i);
                initPipeline();
                initAction();
            } else if (d.type == constant.PIPELINE_END) {
            } else if (d.type == constant.PIPELINE_STAGE) {
                clickStage(d, i);
            }
        }).call(drag);

      

}