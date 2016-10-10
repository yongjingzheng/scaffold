"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPipelineView = setPipelineView;
exports.setActionsView = setActionsView;
exports.setActionView = setActionView;
exports.setButtonView = setButtonView;
exports.setLinesView = setLinesView;
exports.setLineView = setLineView;
exports.setClickNodeData = setClickNodeData;
exports.setLinePathAry = setLinePathAry;
exports.setPipelineNodeSpaceSize = setPipelineNodeSpaceSize;
exports.setActionNodeSpaceSize = setActionNodeSpaceSize;
exports.setPipelineNodeStartX = setPipelineNodeStartX;
exports.setPipelineNodeStartY = setPipelineNodeStartY;
exports.setSvgWidth = setSvgWidth;
exports.setSvgHeight = setSvgHeight;
exports.setSvgMainRect = setSvgMainRect;
exports.setSvg = setSvg;
exports.setG = setG;
var PIPELINE_START = exports.PIPELINE_START = "pipeline-start",
    PIPELINE_END = exports.PIPELINE_END = "pipeline-end",
    PIPELINE_ADD_STAGE = exports.PIPELINE_ADD_STAGE = "pipeline-add-stage",
    PIPELINE_ADD_ACTION = exports.PIPELINE_ADD_ACTION = "pipeline-add-action",
    PIPELINE_STAGE = exports.PIPELINE_STAGE = "pipeline-stage",
    PIPELINE_ACTION = exports.PIPELINE_ACTION = "pipeline-action",
    svgStageWidth = exports.svgStageWidth = 45,
    svgStageHeight = exports.svgStageHeight = 42,
    svgActionWidth = exports.svgActionWidth = 30,
    svgActionHeight = exports.svgActionHeight = 28,
    svgButtonWidth = exports.svgButtonWidth = 30,
    svgButtonHeight = exports.svgButtonHeight = 30,
    pipelineView = exports.pipelineView = null,
    actionsView = exports.actionsView = null,
    actionView = exports.actionView = [],
    buttonView = exports.buttonView = null,
    linesView = exports.linesView = null,
    lineView = exports.lineView = [],
    clickNodeData = exports.clickNodeData = {},
    linePathAry = exports.linePathAry = [],
    PipelineNodeSpaceSize = exports.PipelineNodeSpaceSize = 200,
    ActionNodeSpaceSize = exports.ActionNodeSpaceSize = 75,
    pipelineNodeStartX = exports.pipelineNodeStartX = 0,
    pipelineNodeStartY = exports.pipelineNodeStartY = 0,
    svgWidth = exports.svgWidth = 0,
    svgHeight = exports.svgHeight = 0,
    svgMainRect = exports.svgMainRect = null,
    svg = exports.svg = null,
    g = exports.g = null;

function setPipelineView(v) {
	exports.pipelineView = pipelineView = v;
}

function setActionsView(v) {
	exports.actionsView = actionsView = v;
}

function setActionView(v) {
	exports.actionView = actionView = v;
}

function setButtonView(v) {
	exports.buttonView = buttonView = v;
}

function setLinesView(v) {
	exports.linesView = linesView = v;
}

function setLineView(v) {
	exports.lineView = lineView = v;
}

function setClickNodeData(v) {
	exports.clickNodeData = clickNodeData = v;
}

function setLinePathAry(v) {
	exports.linePathAry = linePathAry = v;
}

function setPipelineNodeSpaceSize(v) {
	exports.PipelineNodeSpaceSize = PipelineNodeSpaceSize = v;
}

function setActionNodeSpaceSize(v) {
	exports.ActionNodeSpaceSize = ActionNodeSpaceSize = v;
}

function setPipelineNodeStartX(v) {
	exports.pipelineNodeStartX = pipelineNodeStartX = v;
}

function setPipelineNodeStartY(v) {
	exports.pipelineNodeStartY = pipelineNodeStartY = v;
}

function setSvgWidth(v) {
	exports.svgWidth = svgWidth = v;
}

function setSvgHeight(v) {
	exports.svgHeight = svgHeight = v;
}

function setSvgMainRect(v) {
	exports.svgMainRect = svgMainRect = v;
}

function setSvg(v) {
	exports.svg = svg = v;
}

function setG(v) {
	exports.g = g = v;
}