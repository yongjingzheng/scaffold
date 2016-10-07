
import * as constant from "./constant";
import {initPipeline} from "./initPipeline";
import {initAction} from "./initAction";


let zoom = d3.behavior.zoom().on("zoom", zoomed);



let $div = $("#div-d3-main-svg").height($("main").height() / 1.5);

constant.setSvgWidth("100%");
constant.setSvgHeight($div.height());
constant.setPipelineNodeStartX(50);
constant.setPipelineNodeStartY($div.height()/2);


let svg = d3.select("#div-d3-main-svg")
    .on("touchstart", nozoom)
    .on("touchmove", nozoom)
    .append("svg")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .style("fill", "white");

let g = svg.append("g")
    .call(zoom)
    .on("dblclick.zoom", null);

let svgMainRect = g.append("rect")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .on("click", clicked);

let linesView = g.append("g")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .attr("id", "linesView");

let actionsView = g.append("g")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .attr("id", "actionsView");

let pipelineView = g.append("g")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .attr("id", "pipelineView");

let buttonView = g.append("g")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .attr("id", "buttonView");


let actionLinkView = g.append("g")
    .attr("width", constant.svgWidth)
    .attr("height", constant.svgHeight)
    .attr("id", "actionLinkView");


constant.setSvg(svg);
constant.setG(g);
constant.setSvgMainRect(svgMainRect);
constant.setLinesView(linesView);
constant.setActionsView(actionsView);
constant.setPipelineView(pipelineView);
constant.setButtonView(buttonView);




initPipeline();
initAction();

// initActionLinkView();

function initActionLinkView() {
    actionLinkView.append("rect")
        .attr("x",10)
        .attr("y",10)
        .attr("rx",10)
        .attr("ry",10)
        .attr("width",120)
        .attr("height",40)
        .attr("stroke","red")
        .attr("fill","red")
    ;
}


function clicked(d, i) {
    constant.buttonView.selectAll("image").remove();
    if (d3.event.defaultPrevented) return; // zoomed
    d3.select(this).transition()
        .transition()
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




