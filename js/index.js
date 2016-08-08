$(function(){

});


var pipeline = {
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


$(document).ready(function(){
    // alert($("main").width());
    // alert($("main").height());
    $("#div-d3-main-svg").height($("main").height()-50);
    var width = $("#div-d3-main-svg").width(),
        height = $("#div-d3-main-svg").height();

    var data = d3.range(20).map(function() { return [Math.random() * width, Math.random() * height]; });

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

    g.append("rect")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    var view = g.append("g")
        .attr("class", "view");

    view.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 32)
        .style("fill", function(d, i) { return color(i); })
        .on("click", clickeCircle);


    function zoomed() {
        view.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    }

    function clicked(d, i) {
        if (d3.event.defaultPrevented) return; // zoomed

        d3.select(this).transition()
            .transition()
    }

    function clickeCircle(d, i) {
        if (d3.event.defaultPrevented) return; // dragged

        d3.select(this).transition()
            // .style("fill", "black")
            .attr("r", 64)
            .transition()
            .attr("r", 32);
            // .style("fill", color(i));
    }

    function nozoom() {
        d3.event.preventDefault();
    }


});

