
import {pipelineData} from "./pipelineData";
import * as constant from "./constant";
import uuid from "./uuid/uuid";

export function clickAddStage(d, i) {
    //add stage data
    pipelineData.splice(
        pipelineData.length - 2,
        0,
        {
            id: constant.PIPELINE_ACTION + "-" + uuid.v1(),
            type: constant.PIPELINE_STAGE,
            class: constant.PIPELINE_STAGE,
            drawX: 0,
            drawY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0,
            actions: [],
            setupData: {}
        });

   
}