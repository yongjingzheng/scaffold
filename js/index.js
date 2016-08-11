$(function () {

});


var tempPipeline = {
    stages: [
        {
            id: "Stage1",
            name: "Stage1-Git",
            actions: [
                {
                    id: "Stage1-Action1",
                    name: "Stage1-Action1-Name",
                    scripts: "alert(Stage1-Action1)"
                },
                {
                    id: "Stage1-Action2",
                    name: "Stage1-Action2-Name",
                    scripts: "alert(Stage1-Action2)"
                },
                {
                    id: "Stage1-Action3",
                    name: "Stage1-Action3-Name",
                    scripts: "alert(Stage1-Action3)"
                }
            ]
        },
        {
            id: "Stage2",
            name: "Stage2-CheckCode",
            actions: [
                {
                    id: "Stage2-Action1",
                    name: "Stage2-Action1-Name",
                    scripts: "alert(Stage2-Action1)"
                },
                {
                    id: "Stage2-Action2",
                    name: "Stage2-Action2-Name",
                    scripts: "alert(Stage2-Action2)"
                },
                {
                    id: "Stage2-Action3",
                    name: "Stage2-Action3-Name",
                    scripts: "alert(Stage2-Action3)"
                }
            ]
        },
        {
            id: "Stage3",
            name: "Stage3-Build",
            actions: [
                {
                    id: "Stage3-Action1",
                    name: "Stage3-Action1-Name",
                    scripts: "alert(Stage3-Action1)"
                },
                {
                    id: "Stage3-Action2",
                    name: "Stage3-Action2-Name",
                    scripts: "alert(Stage3-Action2)"
                },
                {
                    id: "Stage3-Action3",
                    name: "Stage3-Action3-Name",
                    scripts: "alert(Stage3-Action3)"
                }
            ]
        },
        {
            id: "Stage4",
            name: "Stage4-Build",
            actions: [
                {
                    id: "Stage4-Action1",
                    name: "Stage4-Action1-Name",
                    scripts: "alert(Stage4-Action1)"
                },
                {
                    id: "Stage4-Action2",
                    name: "Stage4-Action2-Name",
                    scripts: "alert(Stage4-Action2)"
                },
                {
                    id: "Stage3-Action3",
                    name: "Stage3-Action3-Name",
                    scripts: "alert(Stage3-Action3)"
                }
            ]
        }
    ]
}

var PIPELINE_START = "pipeline-start";
var PIPELINE_END = "pipeline-end";
var PIPELINE_ADD_STAGE = "pipeline-add-stage";
var PIPELINE_ADD_ACTION = "pipeline-add-action";

var PIPELINE_STAGE = "pipeline-stage";


var pipelineView = null;

var pipelineData = [
    {
        id: "pipeline-start",
        type: PIPELINE_START,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0

    },
    {
        id: "pipeline-add-stage",
        type: PIPELINE_ADD_STAGE,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0
    },
    {
        id: "pipeline-end",
        type: PIPELINE_END,
        drawX: 0,
        drawY: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0
    }
]

var PipelineNodespaceSize = 150;
var pipelineNodeStartX = 0;
var pipelineNodeStartY = 0;
var svgWidth = 0;
var svgHeight = 0;


function initPipeline() {

    for (var i = 0; i < pipelineData.length; i++) {
        if (pipelineData[i].type == PIPELINE_START) {
            console.log(PIPELINE_START);
            showStartNode(pipelineView, pipelineData[i], i);
        } else if (pipelineData[i].type == PIPELINE_ADD_STAGE) {
            console.log(PIPELINE_ADD_STAGE);
            showAddStageNode(pipelineView, pipelineData[i], i);
        } else if (pipelineData[i].type == PIPELINE_END) {
            console.log(PIPELINE_END);
            showEndNode(pipelineView, pipelineData[i], i);
        }else if (pipelineData[i].type == PIPELINE_STAGE) {
            console.log(PIPELINE_STAGE);
            showStageNode(pipelineView, pipelineData[i], i);
        }
    }
}

function initNodeXY() {
    svgWidth = $("#div-d3-main-svg").width();
    svgHeight = $("#div-d3-main-svg").height();

    pipelineNodeStartX = 50;
    pipelineNodeStartY = svgHeight / 2;
}


function showStartNode(drawView, showData, i) {
    console.log("showStartNode\n" + showData);
    showData.width = 80;
    showData.height = 60;
    showData.translateX = pipelineNodeStartX + (PipelineNodespaceSize * i);
    showData.translateY = pipelineNodeStartY;

    //Draw Start Point
    drawView.append("image")
        .attr("xlink:href", "./svg/start.svg")
        .attr("id", showData.id)
        .attr("width", showData.width)
        .attr("height", showData.height)
        .attr("transform", "translate(" + showData.translateX + "," + showData.translateY + ")")
        .attr("class", "pipeline-start")
        .on("mouseover", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX - (showData.width / 2)) + "," + (showData.translateY - (showData.height / 2)) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX) + "," + (showData.translateY ) + ") scale(1)");
        });

}

function showAddStageNode(drawView, showData, i) {
    console.log("showAddStageNode\n" + showData);

    showData.width = 80;
    showData.height = 60;
    showData.translateX = pipelineNodeStartX + (PipelineNodespaceSize * i);
    showData.translateY = pipelineNodeStartY;

    //Draw Start Point
    drawView.append("image")
        .attr("xlink:href", "./svg/addStage.svg")
        .attr("id", showData.id)
        .attr("width", showData.width)
        .attr("height", showData.height)
        .attr("transform", "translate(" + showData.translateX + "," + showData.translateY + ")")
        .attr("class", "pipeline-start")
        .on("click", function (d, i) {
            d3.selectAll("image").remove();
            //添加stage数据
            pipelineData.splice(
                pipelineData.length - 2,
                0,
                {
                    id: PIPELINE_STAGE+i,
                    type: PIPELINE_STAGE,
                    class:PIPELINE_STAGE,
                    drawX: 0,
                    drawY: 0,
                    width: 0,
                    height: 0,
                    translateX: 0,
                    translateY: 0

                });
            initPipeline();
        })
        .on("mouseover", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX - (showData.width / 2)) + "," + (showData.translateY - (showData.height / 2)) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX) + "," + (showData.translateY ) + ") scale(1)");
        });
}

function showEndNode(drawView, showData, i) {
    console.log("showEndNode\n" + showData);

    showData.width = 80;
    showData.height = 60;
    showData.translateX = pipelineNodeStartX + (PipelineNodespaceSize * i);
    showData.translateY = pipelineNodeStartY;

    //Draw Start Point
    drawView.append("image")
        .attr("xlink:href", "./svg/end.svg")
        .attr("id", showData.id)
        .attr("width", showData.width)
        .attr("height", showData.height)
        .attr("transform", "translate(" + showData.translateX + "," + showData.translateY + ")")
        .attr("class", "pipeline-start")
        .on("mouseover", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX - (showData.width / 2)) + "," + (showData.translateY - (showData.height / 2)) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select("#" + showData.id)
                .attr("transform", "translate(" + (showData.translateX) + "," + (showData.translateY ) + ") scale(1)");
        });

}

function showStageNode(drawView, showData, i) {
    console.log("showStageNode\n" + showData);

    showData.id = PIPELINE_STAGE+i;
    showData.width = 80;
    showData.height = 60;
    showData.translateX = pipelineNodeStartX + (PipelineNodespaceSize * i);
    showData.translateY = pipelineNodeStartY;

    //Draw Start Point
    drawView.append("image")
        .attr("xlink:href", "./svg/stage.svg")
        .attr("id", showData.id)
        .attr("width", showData.width)
        .attr("height", showData.height)
        .attr("translateX", showData.translateX)
        .attr("translateY", showData.translateY)
        .attr("transform", "translate(" + showData.translateX + "," + showData.translateY + ")")
        .attr("class", "pipeline-start")
        .on("mouseover", function (d, i) {

            console.log("StageID:"+this.attributes["id"].value);

            var currentTranslateX = this.attributes["translateX"].value;
            var currentTranslateY = this.attributes["translateY"].value;
            var currentWidth = this.attributes["width"].value;
            var currentHeight = this.attributes["height"].value;
            d3.select("#" + this.attributes["id"].value)
                .attr("transform",
                    "translate("
                    + (currentTranslateX - currentWidth / 2)
                    + ","
                    + (currentTranslateY - currentHeight / 2)
                    + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            var currentTranslateX = this.attributes["translateX"].value;
            var currentTranslateY = this.attributes["translateY"].value;
            var currentWidth = this.attributes["width"].value;
            var currentHeight = this.attributes["height"].value;
            d3.select("#" + this.attributes["id"].value)
                .attr("transform",
                    "translate("
                    + (currentTranslateX )
                    + ","
                    + (currentTranslateY)
                    + ") scale(1)");
        });

}

function showActionNode(showData) {

}


$(document).ready(function () {

    $("#div-d3-main-svg").height($("main").height() - 50);
    var width = $("#div-d3-main-svg").width(),
        height = $("#div-d3-main-svg").height();

    // initNodeXY();
    // CurrentX = 50;
    // CurrentY = height/2;
    // var data = d3.range(3).map(function() { return [$("#div-d3-main-svg").width()-50, Math.random() * height]; });
    // var color = d3.scale.category10();

    var zoom = d3.behavior.zoom()
        .on("zoom", zoomed);

    var svg = d3.select("#div-d3-main-svg")
        .on("touchstart", nozoom)
        .on("touchmove", nozoom)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "white");

    var g = svg.append("g")
        .call(zoom);

    var MainRect = g.append("rect")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    pipelineView = g.append("g")
        .attr("class", "view");

    var StartView = g.append("g")
        .attr("class", "view");

    // pipelineView = view;

    initNodeXY();
    initPipeline();


    // StartView.append("circle")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("r", 20)
    //     .style("fill", "blue")
    //     .on("click", clickeCircle);

    // //Draw Start Point
    // CurrentX = 0;
    // view.append("image")
    //     .attr("xlink:href", "./svg/start.svg")
    //     .attr("width", "80")
    //     .attr("height", "60")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("class","pipeline-start");
    //
    // CurrentX = 100;
    // view.append("image")
    //     .attr("xlink:href", "./svg/stage.svg")
    //     .attr("width", "80")
    //     .attr("height", "60")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("class","pipeline-stage");
    //
    // //Draw Add Stage Point
    // CurrentX = 200;
    // view.append("image")
    //     .attr("xlink:href", "./svg/addStage.svg")
    //     .attr("width", "80")
    //     .attr("height", "60")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("class","pipeline-add-stage")
    //     .attr("id","pipeline-add-stage")
    //     .on("click", clickAddStage)
    //     .on("mouseover", addStageMouseOver)
    //     .on("mouseout", addStageMouseOut);
    //
    // //Draw End Point
    // CurrentX = 300;
    // view.append("image")
    //     .attr("xlink:href", "./svg/end.svg")
    //     .attr("width", "80")
    //     .attr("height", "60")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("class","pipeline-end");

    // remove all
    // view.selectAll(".pipeline-start").remove();
    // view.selectAll(".pipeline-stage").remove();
    // view.selectAll(".pipeline-add-stage").remove();
    // view.selectAll(".pipeline-end").remove();

    function zoomed() {
        pipelineView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        StartView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    }

    function clicked(d, i) {
        if (d3.event.defaultPrevented) return; // zoomed
        d3.select(this).transition()
            .transition()
    }

    function clickAddStage(d, i) {
        // console.log(this.class);
        // allPrpos(this);
        console.log(this.attributes["transform"].value);
        console.log("clickAddStage");
    }

    function addStageMouseOver(d, i) {
        // console.log(this.transform);
        console.log("addStageMouseOver");
        d3.select("#pipeline-add-stage")
            .attr("transform", "translate(" + (200 - 40) + "," + (CurrentY - 30) + ") scale(2)");

    }

    function addStageMouseOut(d, i) {
        // console.log(this.transform);
        console.log("addStageMouseOut");
        d3.select("#pipeline-add-stage")
            .attr("transform", "translate(" + (200) + "," + (CurrentY) + ") scale(1)");
    }

    function clickeCircle(d, i) {
        if (d3.event.defaultPrevented) return; // dragged

        d3.select(this).transition()
            .attr("r", 64)
            .transition()
            .attr("r", 32);
    }

    function nozoom() {
        d3.event.preventDefault();
    }


});

function allPrpos(obj) {
    var props = "";
    for (var p in obj) {
        if (typeof(obj[p]) == "function") {
            console.log("function:" + obj[p]);
        } else {
            console.log("prop:" + p + "=" + obj[p]);
        }
    }
}


