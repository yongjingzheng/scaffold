"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickAddStage = clickAddStage;

var _pipelineData = require("../pipeline/pipelineData");

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function clickAddStage(d, i) {
    //add stage data
    _pipelineData.pipelineData.splice(_pipelineData.pipelineData.length - 2, 0, {
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