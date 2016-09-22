import $ from "../../node_modules/jquery/dist/jquery.min";
import d3 from "../../node_modules/d3/d3.min";
import jsonEditor from "./jquery.jsoneditor";
import * as constant from "./constant";
import {drag} from "./drag";

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
                    $("#pipeline-info-edit").html($(data));
                    //pipelineEdit(data);

                    $("#importJson").click(function(){
                        
                        var val = $("#importJsonText").val();
                        var json;
                        try{
                            json = (JSON.parse(val));
                            $('#importDiv').jsonEditor(json, {});
                        }catch(e){
                            console.log("Error in parsing json.");
                            alert("Error in parsing json.");
                        }

                    });
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