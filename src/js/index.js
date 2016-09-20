import $ from "./jquery.min";
import d3 from "./d3.min";
import jsonEditor from "./jquery/jquery.jsoneditor";
import {PIPELINE_START , PIPELINE_END, PIPELINE_ADD_STAGE, PIPELINE_ADD_ACTION,PIPELINE_STAGE,PIPELINE_ACTION} from "./pipelineConstant";
import {svgStageWidth, svgStageHeight, svgActionWidth, svgActionHeight, svgButtonWidth, svgButtonHeight} from "./svgConstant";
import {pipelineData} from "./pipelineData";
import {mouseoverRelevantPipeline, mouseoutRelevantPipeline} from "./lineHover";
import {clickStage} from "./clickStage";

var pipelineView = null,
    actionsView = null,
    actionView = [],
    buttonView = null,
    linesView = null,
    lineView = [],
    clickNodeData = {},

    PipelineNodeSpaceSize = 200,
    ActionNodeSpaceSize = 75,

    pipelineNodeStartX = 0,
    pipelineNodeStartY = 0,

    svgWidth = 0,
    svgHeight = 0,
    svgMainRect = null,
    svg = null,
    g = null;

//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    })
    .interpolate("bundle");


var linePathAry = [];


var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart",dragstarted);




$("#div-d3-main-svg").height($("main").height() / 1.5);
    svgWidth = $("#div-d3-main-svg").width();
    svgHeight = $("#div-d3-main-svg").height();

    var zoom = d3.behavior.zoom()
        .on("zoom", zoomed);

    

    svg = d3.select("#div-d3-main-svg")
        .on("touchstart", nozoom)
        .on("touchmove", nozoom)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("fill", "white");




    g = svg.append("g")
        .call(zoom)
        .on("dblclick.zoom", null);

    svgMainRect = g.append("rect")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .on("click", clicked);

    linesView = g.append("g")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "linesView");

    actionsView = g.append("g")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "actionsView");

    pipelineView = g.append("g")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "pipelineView");

    buttonView = g.append("g")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "buttonView");



    initNodeXY();
    initPipeline();
    initAction();


function initNodeXY() {
    pipelineNodeStartX = 50;
    pipelineNodeStartY = svgHeight / 2;
}

function initPipeline() {

    pipelineView.selectAll("image").remove();
    pipelineView.selectAll("image")
        .data(pipelineData)
        .enter()
        .append("image")
        .attr("xlink:href", function (d, i) {
            // console.log(d.type);
            if (d.type == PIPELINE_START) {
                // console.log(PIPELINE_START);
                return "./svg/start.svg";
            } else if (d.type == PIPELINE_ADD_STAGE) {
                // console.log(PIPELINE_ADD_STAGE);
                return "./svg/addStage.svg";
            } else if (d.type == PIPELINE_END) {
                // console.log(PIPELINE_END);
                return "./svg/end.svg";
            } else if (d.type == PIPELINE_STAGE) {
                // console.log(PIPELINE_STAGE);
                return "./svg/stage.svg";
            }
        })
        .attr("id", function (d, i) {
            return d.id;
        })
        .attr("width", function (d, i) {
            return svgStageWidth;
        })
        .attr("height", function (d, i) {
            return svgStageHeight;
        })
        .attr("transform", function (d, i) {
            d.width = svgStageWidth;
            d.height = svgStageHeight;
            d.translateX = i * PipelineNodeSpaceSize + pipelineNodeStartX;
            d.translateY = pipelineNodeStartY;
            return "translate(" + d.translateX + "," + d.translateY + ")";
        })
        .attr("class", function (d, i) {
            // console.log(d);
            if (d.type == PIPELINE_START) {
                return PIPELINE_START;
            } else if (d.type == PIPELINE_ADD_STAGE) {
                return PIPELINE_ADD_STAGE;
            } else if (d.type == PIPELINE_END) {
                return PIPELINE_END;
            } else if (d.type == PIPELINE_STAGE) {
                return PIPELINE_STAGE;
            }
        })
        .on("mousedown",function(d,i){

            if (d.type == PIPELINE_START) {
                dragDropSetPath({
                        "data" : d,
                        "node" : i
                    });
                
            }

        })
        .on("mouseover", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {
                    if (d.type == PIPELINE_START) {
                         mouseoverRelevantPipeline(d);
                        return "./svg/start-mouseover.svg";
                    } else if (d.type == PIPELINE_ADD_STAGE) {
                        return "./svg/addStage-mouseover.svg";
                    } else if (d.type == PIPELINE_END) {
                        return "./svg/end.svg";
                    } else if (d.type == PIPELINE_STAGE) {
                        return "./svg/stage-mouseover.svg";
                    }
                });
        })
        .on("mouseout", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {
                    if (d.type == PIPELINE_START) {
                        mouseoutRelevantPipeline();
                        return "./svg/start.svg";
                    } else if (d.type == PIPELINE_ADD_STAGE) {
                        return "./svg/addStage.svg";
                    } else if (d.type == PIPELINE_END) {
                        return "./svg/end.svg";
                    } else if (d.type == PIPELINE_STAGE) {
                        return "./svg/stage.svg";
                    }
                });
        })
        .on("click", function (d, i) {
            if (d.type == PIPELINE_START) {
                clickStart(this, d, i);
            } else if (d.type == PIPELINE_ADD_STAGE) {
                clickAddStage(this, d, i);
            } else if (d.type == PIPELINE_END) {
            } else if (d.type == PIPELINE_STAGE) {
                clickStage(this, d, i,buttonView);
            }
        }).call(drag);


        

}

function clickAddStage(d, i) {


    //add stage data
    pipelineData.splice(
        pipelineData.length - 2,
        0,
        {
            id: PIPELINE_ACTION + "-" + uuid.v1(),
            type: PIPELINE_STAGE,
            class: PIPELINE_STAGE,
            drawX: 0,
            drawY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0,
            actions: [],
            setupData: {}
        });

    initPipeline();
    initAction();
}

function initAction() {


    actionsView.selectAll("image").remove();

    //Action
    pipelineView.selectAll("image").each(function (d, i) {
        if (d.type == PIPELINE_STAGE && d.actions != null && d.actions.length > 0) {
            var actionViewId = "action" + "-" + d.id;

            actionView[actionViewId] = actionsView.append("g")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", actionViewId);

            var actionStartX = d.translateX + 7.5;
            var actionStartY = d.translateY;

            actionView[actionViewId].selectAll("image")
                .data(d.actions).enter()
                .append("image")
                .attr("xlink:href", function (ad, ai) {
                    if (ai % 2 == 0) {
                        return "./svg/action-bottom.svg";
                    } else {
                        return "./svg/action-top.svg";
                    }
                })
                .attr("id", function (ad, ai) {
                    return ad.id;
                })
                .attr("width", function (ad, ai) {
                    return svgActionWidth;
                })
                .attr("height", function (ad, ai) {
                    return svgActionHeight;
                })
                .attr("transform", function (ad, ai) {
                    ad.width = svgActionWidth;
                    ad.height = svgActionHeight;
                    if (ai % 2 == 0) {
                        ad.translateX = actionStartX;
                        ad.translateY = actionStartY + svgStageHeight - 25 + ActionNodeSpaceSize * (ai / 2 + 1);
                    } else {
                        ad.translateX = actionStartX;
                        ad.translateY = actionStartY - svgStageHeight + 5 - ActionNodeSpaceSize * (ai / 2);
                    }

                    return "translate(" + ad.translateX + "," + ad.translateY + ")";
                })
                .on("mousedown",function(ad,ai){
                    dragDropSetPath({
                        "data" : ad,
                        "node" : ai
                    });
                   
                })
                .on("mouseover", function (ad, ai) {
                    if (ai % 2 == 0) {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-bottom-mouseover.svg";
                            });
                    } else {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-top-mouseover.svg";
                            });
                    }
                    mouseoverRelevantPipeline(ad);
                })
                .on("mouseout", function (ad, ai) {
                    if (ai % 2 == 0) {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-bottom.svg";
                            });
                    } else {
                        d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return "./svg/action-top.svg";
                            });
                    }
                    mouseoutRelevantPipeline();
                })
                .on("click", function (ad, ai) {
                    clickAction(this, ad, ai);
                }).call(drag);
        }

    });

    initLine();
}

function initLine() {

    linesView.selectAll("g").remove();

    var diagonal = d3.svg.diagonal();

    var pipelineLineViewId = "pipeline-line-view";

    lineView[pipelineLineViewId] = linesView.append("g")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", pipelineLineViewId);

    pipelineView.selectAll("image").each(function (d, i) {

        //pipeline line
        if (i != 0) {
            lineView[pipelineLineViewId]
                .append("path")
                .attr("d", function () {
                    return diagonal({
                        source: {x: d.translateX - PipelineNodeSpaceSize, y: pipelineNodeStartY + 22.5},
                        target: {x: d.translateX + 2, y: pipelineNodeStartY + 22.5}
                    });
                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 5);
        }

        //Action Diagonal
        if (d.type == PIPELINE_STAGE && d.actions != null && d.actions.length > 0) {

            var actionLineViewId = "action-line" + "-" + d.id;
            var action2StageLineViewId = "action-2-stage-line" + "-" + d.id;

            // Action 2 Stage
            lineView[action2StageLineViewId] = linesView.append("g")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", action2StageLineViewId);

            lineView[action2StageLineViewId].selectAll("path")
                .data(d.actions).enter()
                .append("path")
                .attr("d", function (ad, ai) {
                    if (ai % 2 == 0) {
                        lineView[action2StageLineViewId]
                            .append("path")
                            .attr("d", function (fd, fi) {
                                return diagonal({
                                    source: {x: ad.translateX + 15, y: ad.translateY + 25},
                                    target: {x: ad.translateX + 15, y: ad.translateY + 40}
                                });
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("stroke-dasharray", "2,2");

                        return diagonal({
                            source: {x: ad.translateX + 15, y: ad.translateY},
                            target: {x: ad.translateX + 15, y: ad.translateY - 50}
                        });
                    } else {
                        lineView[action2StageLineViewId]
                            .append("path")
                            .attr("d", function (fd, fi) {
                                return diagonal({
                                    source: {x: ad.translateX + 15, y: ad.translateY + 0},
                                    target: {x: ad.translateX + 15, y: ad.translateY - 15}
                                });
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("stroke-dasharray", "2,2");

                        return diagonal({
                            source: {x: ad.translateX + 15, y: ad.translateY + 25},
                            target: {x: ad.translateX + 15, y: ad.translateY + 75}
                        });
                    }
                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "2,2");
        }

    });
 
   linePathAry.forEach(function(i){
        setPath(i);
   })
}




function dragDropSetPath(options){

    
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




function setPath(options){
    lineView[options.pipelineLineViewId]
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

function getPathData(startPoint,endPoint){  
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



function pipelineEdit(data){
     d3.json("js/flare.json", function (nodes) {
       
        var opt = { 
            change: function(data) { /* called on every change */ },
            propertyclick: function(path) { /* called when a property is clicked with the JS path to that property */ }
        };
        /* opt.propertyElement = '<textarea>'; */ // element of the property field, <input> is default
        /* opt.valueElement = '<textarea>'; */  // element of the value field, <input> is default
        $('#importDiv').jsonEditor(nodes, opt);
    });  
    
}



function clickStart(sView, sd, si) {

    clickNodeData = sd;
    //show git form
    $.ajax({
        url: "./templates/gitEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(clickNodeData.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

        }
    });
}

function clickAction(sView, sd, si) {

    clickNodeData = sd;

    //show git form
    $.ajax({
        url: "./templates/actionEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(clickNodeData.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);
        }
    });

    buttonView.selectAll("image").remove();

    // show action del button
    buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/actionDel.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX - (svgButtonWidth * 2);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {
            return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            buttonView.selectAll("image").remove();

            for (var key in pipelineData) {
                if (pipelineData[key].type == PIPELINE_STAGE && pipelineData[key].actions.length > 0) {
                    for (var actionKey in pipelineData[key].actions) {
                        if (pipelineData[key].actions[actionKey].id == sd.id) {
                            pipelineData[key].actions.splice(actionKey, 1);
                            initPipeline();
                            initAction();
                            initLine();
                            return;
                        }

                    }
                }

            }

            // console.log(pipelineData);
        });


    //show close action pop button
    buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/stageClosePop.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX + (svgButtonWidth * 2.6);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {
            return "translate("
                + this.attributes["translateX"].value + ","
                + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            buttonView.selectAll("image").remove();
        });

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

function clicked(d, i) {
    buttonView.selectAll("image").remove();
    if (d3.event.defaultPrevented) return; // zoomed
    d3.select(this).transition()
        .transition()
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();  
}

