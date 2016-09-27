
import {PIPELINE_START , PIPELINE_END, PIPELINE_ADD_STAGE, PIPELINE_ADD_ACTION,PIPELINE_STAGE,PIPELINE_ACTION} from "./constant";


export var pipelineData = [
    {
        id: "pipeline-start" + "-" + uuid.v1(),
        type: PIPELINE_START,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        setupData: {}
    },
    {
        id: PIPELINE_STAGE + "-" + uuid.v1(),
        type: PIPELINE_STAGE,
        class: PIPELINE_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        actions: [
            {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            },
             {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            }

        ],
        setupData:{}
    },
    {
        id: PIPELINE_STAGE + "-" + uuid.v1(),
        type: PIPELINE_STAGE,
        class: PIPELINE_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        actions: [
            {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            },
             {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            }

        ],
        setupData:{}
    },
    {
        id: PIPELINE_STAGE + "-" + uuid.v1(),
        type: PIPELINE_STAGE,
        class: PIPELINE_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        actions: [
            {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            },
             {
                id: PIPELINE_ACTION + "-" + uuid.v1(),
                type: PIPELINE_ACTION,
                class: PIPELINE_ACTION,
                drawX: 0,
                drawY: 0,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                actions: [],
                setupData: {}
            }

        ],
        setupData:{}
    },
    {
        id: "pipeline-add-stage" + "-" + uuid.v1(),
        type: PIPELINE_ADD_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0
    },
    {
        id: "pipeline-end" + "-" + uuid.v1(),
        type: PIPELINE_END,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        setupData: {}
    }
]