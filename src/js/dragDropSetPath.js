import d3 from "./d3.min";
import $ from "./jquery.min";
import {setPath,getPathData} from "./setPath";
import {linePathAry} from "./constant";


export function dragDropSetPath(options){

    
    var thisData = options.data,
        thisIndex = options.node;
   

    var  _path =  d3.select("svg>g").insert("path",":nth-child(2)").attr("class","drag-drop-line"),
         _startX = $(window.event.target).offset().left,
         _startY = $(window.event.target).offset().top,
         _pageTitleHeight = $(".page-title").height();  

    document.onmousemove = function(e){
       
        var diffX = e.pageX - _startX,
            diffY = e.pageY - _startY;

        _path.attr("d", getPathData({x:_startX-60,y:_startY-(105+_pageTitleHeight)},{x:_startX + diffX -40,y:_startY + diffY -(130+_pageTitleHeight)}))
            .attr("fill", "none")
            .attr("stroke-opacity", "1")
            .attr("stroke", "green")
            .attr("stroke-width", 10);
    }
    document.onmouseup = function (e){
        document.onmousemove = null;   
        document.onmouseup = null; 
        d3.select(".drag-drop-line").remove();

        try{
            var _data = d3.select(e.target)[0][0].__data__;
            var _class = thisData.id +_data.id;
            if(d3.selectAll("."+_class)[0].length > 0){
                alert("Repeated addition");
                return false;
            }
        }catch(e){

        }
        

        if(_data !== undefined && _data.translateX > thisData.translateX && _data.class === "pipeline-action"){
            setPath({
                pipelineLineViewId : "pipeline-line-view",
                startPoint : {x:thisData.translateX,y:thisData.translateY},
                endPoint : {x:_data.translateX,y:_data.translateY},
                defaultClass : _class
            });

            linePathAry.push({
                pipelineLineViewId : "pipeline-line-view",
                startPoint : {x:thisData.translateX,y:thisData.translateY},
                endPoint : {x:_data.translateX,y:_data.translateY},
                defaultClass : _class
            });

           
        } 
        
    }
}