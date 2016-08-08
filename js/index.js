$(function(){

});


var tempPipeline = {
    stages:[
        {
            id:"Stage1",
            name:"Stage1-Git",
            actions:[
                {
                    id:"Stage1-Action1",
                    name:"Stage1-Action1-Name",
                    scripts:"alert(Stage1-Action1)"
                },
                {
                    id:"Stage1-Action2",
                    name:"Stage1-Action2-Name",
                    scripts:"alert(Stage1-Action2)"
                },
                {
                    id:"Stage1-Action3",
                    name:"Stage1-Action3-Name",
                    scripts:"alert(Stage1-Action3)"
                }
            ]
        },
        {
            id:"Stage2",
            name:"Stage2-CheckCode",
            actions:[
                {
                    id:"Stage2-Action1",
                    name:"Stage2-Action1-Name",
                    scripts:"alert(Stage2-Action1)"
                },
                {
                    id:"Stage2-Action2",
                    name:"Stage2-Action2-Name",
                    scripts:"alert(Stage2-Action2)"
                },
                {
                    id:"Stage2-Action3",
                    name:"Stage2-Action3-Name",
                    scripts:"alert(Stage2-Action3)"
                }
            ]
        },
        {
            id:"Stage3",
            name:"Stage3-Build",
            actions:[
                {
                    id:"Stage3-Action1",
                    name:"Stage3-Action1-Name",
                    scripts:"alert(Stage3-Action1)"
                },
                {
                    id:"Stage3-Action2",
                    name:"Stage3-Action2-Name",
                    scripts:"alert(Stage3-Action2)"
                },
                {
                    id:"Stage3-Action3",
                    name:"Stage3-Action3-Name",
                    scripts:"alert(Stage3-Action3)"
                }
            ]
        },
        {
            id:"Stage4",
            name:"Stage4-Build",
            actions:[
                {
                    id:"Stage4-Action1",
                    name:"Stage4-Action1-Name",
                    scripts:"alert(Stage4-Action1)"
                },
                {
                    id:"Stage4-Action2",
                    name:"Stage4-Action2-Name",
                    scripts:"alert(Stage4-Action2)"
                },
                {
                    id:"Stage3-Action3",
                    name:"Stage3-Action3-Name",
                    scripts:"alert(Stage3-Action3)"
                }
            ]
        }
    ]
}

var CurrentX = 0;
// ($("main").height()-50)/2

var CurrentY = 0;
    //($("main").height()-50)/2

// var StartX = ($("main").height()-50)/2


$(document).ready(function(){

    $("#div-d3-main-svg").height($("main").height()-50);



    var width = $("#div-d3-main-svg").width(),
        height = $("#div-d3-main-svg").height();

    CurrentX = 50;
    CurrentY = height/2;

    var data = d3.range(3).map(function() { return [$("#div-d3-main-svg").width()-50, Math.random() * height]; });

    var color = d3.scale.category10();

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

    var view = g.append("g")
        .attr("class", "view");


    var StartView = g.append("g")
        .attr("class", "view");

    // StartView.append("circle")
    //     .attr("transform", "translate("+CurrentX+","+CurrentY+")")
    //     .attr("r", 20)
    //     .style("fill", "blue")
    //     .on("click", clickeCircle);

    //Draw Start Point
    CurrentX = 0;
    view.append("image")
        .attr("xlink:href", "./svg/start.svg")
        .attr("width", "80")
        .attr("height", "60")
        .attr("transform", "translate("+CurrentX+","+CurrentY+")")
        .attr("class","pipeline-start");

    CurrentX = 100;
    view.append("image")
        .attr("xlink:href", "./svg/stage.svg")
        .attr("width", "80")
        .attr("height", "60")
        .attr("transform", "translate("+CurrentX+","+CurrentY+")")
        .attr("class","pipeline-stage");

    //Draw Add Stage Point
    CurrentX = 200;
    view.append("image")
        .attr("xlink:href", "./svg/addStage.svg")
        .attr("width", "80")
        .attr("height", "60")
        .attr("transform", "translate("+CurrentX+","+CurrentY+")")
        .attr("class","pipeline-add-stage");

    //Draw End Point
    CurrentX = 300;
    view.append("image")
        .attr("xlink:href", "./svg/end.svg")
        .attr("width", "80")
        .attr("height", "60")
        .attr("transform", "translate("+CurrentX+","+CurrentY+")")
        .attr("class","pipeline-end");

    // remove all
    // view.selectAll(".pipeline-start").remove();
    // view.selectAll(".pipeline-stage").remove();
    // view.selectAll(".pipeline-add-stage").remove();
    // view.selectAll(".pipeline-end").remove();

    function zoomed() {
        view.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        StartView.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    }

    function clicked(d, i) {
        if (d3.event.defaultPrevented) return; // zoomed

        d3.select(this).transition()
            .transition()
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

