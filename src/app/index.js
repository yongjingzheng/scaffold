import {getPipeLine} from "./pipeline/pipelineData";
// import {historyRecord} from "./historyRecord";

// let $a = d3.select("#showHistory").on("click",historyRecord);

getPipeLine();

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

