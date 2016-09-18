var PIPELINE_START = "pipeline-start";
var PIPELINE_END = "pipeline-end";
var PIPELINE_ADD_STAGE = "pipeline-add-stage";
var PIPELINE_ADD_ACTION = "pipeline-add-action";

var PIPELINE_STAGE = "pipeline-stage";
var PIPELINE_ACTION = "pipeline-action";

var pipelineView = null;

var actionsView = null;
var actionView = [];

var buttonView = null;

var linesView = null;
var lineView = [];

var clickNodeData = {};

var PipelineNodeSpaceSize = 200;
var ActionNodeSpaceSize = 75;

var pipelineNodeStartX = 0;
var pipelineNodeStartY = 0;
var svgWidth = 0;
var svgHeight = 0;
var svgMainRect = null;

var svgStageWidth = 45;
var svgStageHeight = 42;

var svgActionWidth = 30;
var svgActionHeight = 28;

var svgButtonWidth = 30;
var svgButtonHeight = 30;

var svg = null;
var g = null;

//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    })
    .interpolate("basis");

var pipelineData = [
    {
        id: "pipeline-start" + "-" + uuid.v1(),
        type: PIPELINE_START,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        setupData: {}
    },
   
    {
        id: "pipeline-add-stage" + "-" + uuid.v1(),
        type: PIPELINE_ADD_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0
    },
    {
        id: "pipeline-end" + "-" + uuid.v1(),
        type: PIPELINE_END,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        setupData: {}
    }
]

$(document).ready(function () {

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

    // linesView = g.append("g")
    //     .attr("width", svgWidth)
    //     .attr("height", svgHeight)
    //     .attr("id", "linesView");

    initNodeXY();
    initPipeline();
    initAction();


});

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
            switch(d.type){
                case PIPELINE_START :
                    return "./svg/start.svg";
                    break;
                case PIPELINE_ADD_STAGE :
                    return "./svg/addStage.svg";
                    break;
                case PIPELINE_END :
                    return "./svg/end.svg";
                    break;
                case PIPELINE_STAGE :
                    return "./svg/stage.svg";
                    break;
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
        .on("mouseover", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {

                    switch(d.type){
                        case PIPELINE_START :
                            return "./svg/start-mouseover.svg";
                            break;
                        case PIPELINE_ADD_STAGE :
                            return "./svg/addStage-mouseover.svg";
                            break;
                        case PIPELINE_END :
                            return "./svg/end.svg";
                            break;
                        case PIPELINE_STAGE :
                            return "./svg/stage-mouseover.svg";
                            break;
                    }

                  
                });
        })
        .on("mouseout", function (d, i) {
            d3.select("#" + d.id)
                .attr("xlink:href", function (d, i) {
                
                    switch(d.type){
                        case PIPELINE_START :
                            return "./svg/start.svg";
                            break;
                        case PIPELINE_ADD_STAGE :
                            return "./svg/addStage.svg";
                            break;
                        case PIPELINE_END :
                            return "./svg/end.svg";
                            break;
                        case PIPELINE_STAGE :
                            return "./svg/stage.svg";
                            break;
                    }

                });
        })
        .on("click", function (d, i) {
       
            switch(d.type){
                case PIPELINE_START :
                    clickStart(this, d, i);
                    break;
                case PIPELINE_ADD_STAGE :
                    clickAddStage(this, d, i);
                    break;
                case PIPELINE_END :
                    break;
                case PIPELINE_STAGE :
                    clickStage(this, d, i);
                    break;
            }


        });
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

            if(!actionsView.select("g")[0][0]){

                actionView[actionViewId] = actionsView.append("g")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .attr("id", actionViewId);

            }
            var actionStartX = d.translateX + 7.5;
            var actionStartY = d.translateY;

            actionView[actionViewId].selectAll("image")
                .data(d.actions).enter()
                .append("image")
                .attr("xlink:href", function (ad, ai) {
                    return ai % 2 == 0 ? "./svg/action-bottom.svg" : "./svg/action-top.svg";
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
                .on("mouseover", function (ad, ai) {
                    d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return ai % 2 == 0 ? "./svg/action-bottom-mouseover.svg" : "./svg/action-top-mouseover.svg";
                            });

                })
                .on("mouseout", function (ad, ai) {

                    d3.select("#" + ad.id)
                            .attr("xlink:href", function (ad, ai) {
                                return ai % 2 == 0 ? "./svg/action-bottom.svg" : "./svg/action-top.svg";
                            });
                })
                .on("click", function (ad, ai) {
                    clickAction(this, ad, ai);
                });
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

            lineView[actionLineViewId] = linesView.append("g")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", actionLineViewId);

            //Action line right
            lineView[actionLineViewId].selectAll("path")
                .data(d.actions).enter()
                .append("path")
                .attr("d", function (ad, ai) {
                    if (ai % 2 == 0) {

                        lineView[actionLineViewId]
                            .append("path")
                            .attr("d", function (ld, li) {
                                var leftLineData = [
                                    {"x": ad.translateX + 5, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 30, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 50, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 50, "y": pipelineNodeStartY + 50},
                                    {"x": ad.translateX - 50, "y": pipelineNodeStartY + 23},
                                    {"x": ad.translateX - 70, "y": pipelineNodeStartY + 23}
                                ];

                                return lineFunction(leftLineData)

                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 2);
                        var rightLineData = [
                            {"x": ad.translateX + 25, "y": ad.translateY + 12},
                            {"x": ad.translateX + 60, "y": ad.translateY + 12},
                            {"x": ad.translateX + 80, "y": ad.translateY + 12},
                            {"x": ad.translateX + 80, "y": pipelineNodeStartY + 50},
                            {"x": ad.translateX + 80, "y": pipelineNodeStartY + 23},
                            {"x": ad.translateX + 100, "y": pipelineNodeStartY + 23}
                        ];
                        return lineFunction(rightLineData);

                    } else {
                        lineView[actionLineViewId]
                            .append("path")
                            .attr("d", function (ld, li) {
                                var leftLineData = [
                                    {"x": ad.translateX + 5, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 30, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 50, "y": ad.translateY + 12},
                                    {"x": ad.translateX - 50, "y": pipelineNodeStartY },
                                    {"x": ad.translateX - 50, "y": pipelineNodeStartY + 22},
                                    {"x": ad.translateX - 70, "y": pipelineNodeStartY + 22}
                                ];
                                return lineFunction(leftLineData);
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 2);

                        var rightLineData = [
                            {"x": ad.translateX + 25, "y": ad.translateY + 12},
                            {"x": ad.translateX + 60, "y": ad.translateY + 12},
                            {"x": ad.translateX + 80, "y": ad.translateY + 12},
                            {"x": ad.translateX + 80, "y": pipelineNodeStartY },
                            {"x": ad.translateX + 80, "y": pipelineNodeStartY + 22},
                            {"x": ad.translateX + 100, "y": pipelineNodeStartY + 22}
                        ];
                        return lineFunction(rightLineData);
                        // return diagonal({
                        //     source: {x: ad.translateX + 15, y: ad.translateY + 25},
                        //     target: {x: ad.translateX + 110, y: pipelineNodeStartY + 21}
                        // });
                    }
                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            // Action 2 Stage
            lineView[action2StageLineViewId] = linesView.append("g")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", action2StageLineViewId);

            lineView[action2StageLineViewId].selectAll("path")
                .data(d.actions).enter()
                .append("path")
                .attr("d", function (ad, ai) {

                    lineView[action2StageLineViewId]
                            .append("path")
                            .attr("d", function (fd, fi) {
                                return diagonal({
                                    source: {x: ad.translateX + 15, y: ad.translateY + (ai % 2 == 0 ? 25 : 0)},
                                    target: {x: ad.translateX + 15, y: ad.translateY + (ai % 2 == 0 ? 40 : -15)}
                                });
                            })
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("stroke-dasharray", "2,2");

                        return diagonal({
                            source: {x: ad.translateX + 15, y: ad.translateY + (ai % 2 == 0 ? 0 : 25)},
                            target: {x: ad.translateX + 15, y: ad.translateY + (ai % 2 == 0 ? -50 : 75)}
                        });

                })
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "2,2");
        }

    });

}

function clickStage(sView, sd, si) {

    clickNodeData = sd;

    //show stage form
    $.ajax({
        url: "./stageEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(clickNodeData.setupData, function (name, value) {
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);
        }
    });

    buttonView.selectAll("image").remove();

    //show stage pop button
    buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/actionAdd.svg";
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
            sd.actions.splice(
                sd.actions.length,
                0,
                {
                    id: PIPELINE_ACTION + "-" + uuid.v1(),
                    type: PIPELINE_ACTION,
                    class:  ,
                    drawX: 0,
                    drawY: 0,
                    width: 0,
                    height: 0,
                    translateX: 0,
                    translateY: 0,
                    setupData: {}
                });
            buttonView.selectAll("image").remove();
            initAction();
            // console.log(pipelineData)
        });

    //show del stage button
    buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "./svg/stageDel.svg";
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
            return sd.translateX + (svgButtonWidth / 3);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY - (svgButtonHeight * 2);
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
            pipelineData.splice(si, 1);

            // console.log(pipelineData);

            initPipeline();
            initAction();
        });


    //show close stage pop button
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

function clickStart(sView, sd, si) {

    clickNodeData = sd;
    console.log(clickNodeData);
    //show git form
    $.ajax({
        url: "./gitEdit.html",
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
        url: "./actionEdit.html",
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
                        if (pipelineData[key].actions[actionKey].id = sd.id) {
                            console.log(sd.id);
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

function clicked(d, i) {
    buttonView.selectAll("image").remove();
    if (d3.event.defaultPrevented) return; // zoomed
    d3.select(this).transition()
        .transition()
}

function nozoom() {
    d3.event.preventDefault();
}

function saveData(saveForm) {
    clickNodeData.setupData = saveForm.serializeObject();
    return false;
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};