
import * as constant from "./constant";
import {drag} from "./drag";
import {pipelineEdit} from "./pipelineEdit";


export function setPath(options){
    constant.lineView[options.pipelineLineViewId]
        .append("path")
        .attr("d", getPathData(options.startPoint,options.endPoint))
        .attr("fill", "none")
        .attr("stroke-opacity", "0.2")
        .attr("stroke", "green")
        .attr("stroke-width", 15)
        .attr("class",options.defaultClass)
        .on("mouseover",function(){
            this.parentNode.appendChild(this);
            d3.select(this).attr("stroke-opacity","1");
        })
        .on("mouseout",function(){
            d3.select(this).attr("stroke-opacity","0.2");
        })
        .on("click",function(d){
            $.ajax({
                url: "./templates/pipelineEdit.html",
                type: "GET",
                cache: false,
                success: function (data) {
                    pipelineEdit(data);
                }
            });
        });

}



export function getPathData(startPoint,endPoint){  
    var curvature = .5;
    var x0 = startPoint.x + 30,
        x1 = endPoint.x + 2,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = startPoint.y + 30 / 2,
        y1 = endPoint.y + 30 / 2;

    return "M" + x0 + "," + y0
        + "C" + x2 + "," + y0
        + " " + x3 + "," + y1
        + " " + x1 + "," + y1;
}