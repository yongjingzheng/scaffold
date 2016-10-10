"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pipelineData = undefined;

var _constant = require("../common/constant");

var pipelineData = exports.pipelineData = [{
    id: "pipeline-start" + "-" + uuid.v1(),
    type: _constant.PIPELINE_START,
    setupData: {}
}, {
    id: "pipeline-add-stage" + "-" + uuid.v1(),
    type: _constant.PIPELINE_ADD_STAGE
}, {
    id: "pipeline-end" + "-" + uuid.v1(),
    type: _constant.PIPELINE_END,
    setupData: {}
}];