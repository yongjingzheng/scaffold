
import {PIPELINE_START , PIPELINE_END, PIPELINE_ADD_STAGE, PIPELINE_ADD_ACTION,PIPELINE_STAGE,PIPELINE_ACTION} from "../common/constant";


export var pipelineData = [
    {
        id: "pipeline-start" + "-" + uuid.v1(),
        type: PIPELINE_START,
        setupData: {}
    },
    
    {
        id: "pipeline-add-stage" + "-" + uuid.v1(),
        type: PIPELINE_ADD_STAGE
    },
    {
        id: "pipeline-end" + "-" + uuid.v1(),
        type: PIPELINE_END,
        setupData: {}
    }
]