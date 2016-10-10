"use strict";

var _constant = require("./common/constant");

var constant = _interopRequireWildcard(_constant);

var _initPipeline = require("./pipeline/initPipeline");

var _initAction = require("./pipeline/initAction");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import {historyRecord} from "./historyRecord";

// let $a = d3.select("#showHistory").on("click",historyRecord);

var zoom = d3.behavior.zoom().on("zoom", zoomed);

var $div = $("#div-d3-main-svg").height($("main").height() / 1.5);

constant.setSvgWidth("100%");
constant.setSvgHeight($div.height());
constant.setPipelineNodeStartX(50);
constant.setPipelineNodeStartY($div.height() * 0.2);

var svg = d3.select("#div-d3-main-svg").on("touchstart", nozoom).on("touchmove", nozoom).append("svg").attr("width", constant.svgWidth).attr("height", constant.svgHeight).style("fill", "white");

var g = svg.append("g").call(zoom).on("dblclick.zoom", null);

var svgMainRect = g.append("rect").attr("width", constant.svgWidth).attr("height", constant.svgHeight).on("click", clicked);

var linesView = g.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", "linesView");

var actionsView = g.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", "actionsView");

var pipelineView = g.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", "pipelineView");

var buttonView = g.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", "buttonView");

var actionLinkView = g.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", "actionLinkView");

constant.setSvg(svg);
constant.setG(g);
constant.setSvgMainRect(svgMainRect);
constant.setLinesView(linesView);
constant.setActionsView(actionsView);
constant.setPipelineView(pipelineView);
constant.setButtonView(buttonView);

(0, _initPipeline.initPipeline)();
(0, _initAction.initAction)();
// initActionLinkView();

function initActionLinkView() {
    actionLinkView.append("rect").attr("x", 10).attr("y", 10).attr("rx", 10).attr("ry", 10).attr("width", 120).attr("height", 40).attr("stroke", "red").attr("fill", "red");
}

function clicked(d, i) {
    constant.buttonView.selectAll("image").remove();
    if (d3.event.defaultPrevented) return; // zoomed
    d3.select(this).transition().transition();
}

function zoomed() {
    pipelineView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    actionsView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    buttonView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    linesView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
}

function nozoom() {
    d3.event.preventDefault();
}