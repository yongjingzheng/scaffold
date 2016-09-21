import d3 from "./d3.min";

export var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart",dragstarted);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();  
}