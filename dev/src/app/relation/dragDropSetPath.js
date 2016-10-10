"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dragDropSetPath = dragDropSetPath;

var _setPath = require("./setPath");

var _constant = require("../common/constant");

function dragDropSetPath(options) {

    var thisData = options.data,
        thisIndex = options.node,
        fromParentIndex = $(window.event.target).attr("data-parent");

    var _path = d3.select("svg>g").insert("path", ":nth-child(2)").attr("class", "drag-drop-line"),
        _mainContentX = $("#content").offset().left,
        _startX = $(window.event.target).offset().left - _mainContentX,
        _startY = $(window.event.target).offset().top,
        _pageTitleHeight = $(".page-title").height();

    document.onmousemove = function (e) {

        var diffX = e.pageX - _startX - _mainContentX,
            diffY = e.pageY - _startY;

        _path.attr("d", (0, _setPath.getPathData)({ x: _startX - 60, y: _startY - (105 + _pageTitleHeight) }, { x: _startX + diffX - 40, y: _startY + diffY - (130 + _pageTitleHeight) })).attr("fill", "none").attr("stroke-opacity", "1").attr("stroke", "green").attr("stroke-width", 10);
    };
    document.onmouseup = function (e) {

        document.onmousemove = null;
        document.onmouseup = null;
        d3.select(".drag-drop-line").remove();

        try {
            var _data = d3.select(e.target)[0][0].__data__;
            var _class = thisData.id + _data.id;
            var toParentIndex = $(e.target).attr("data-parent");
            var toIndex = $(e.target).attr("data-index");
            if (d3.selectAll("." + _class)[0].length > 0) {
                alert("Repeated addition");
                return false;
            }
        } catch (e) {}

        if (_data !== undefined && _data.translateX > thisData.translateX && _data.type === "pipeline-action") {
            (0, _setPath.setPath)({
                pipelineLineViewId: "pipeline-line-view",
                startData: options.data,
                endData: d3.select(e.target)[0][0].__data__,
                startPoint: { x: thisData.translateX, y: thisData.translateY },
                endPoint: { x: _data.translateX, y: _data.translateY },
                defaultClass: _class,
                fromIndex: thisIndex,
                fromParentIndex: fromParentIndex,
                toParentIndex: toParentIndex,
                toIndex: toIndex,
                index: _constant.linePathAry.length
            });

            _constant.linePathAry.push({
                pipelineLineViewId: "pipeline-line-view",
                startData: options.data,
                endData: d3.select(e.target)[0][0].__data__,
                startPoint: { x: thisData.translateX, y: thisData.translateY },
                endPoint: { x: _data.translateX, y: _data.translateY },
                defaultClass: _class,
                fromIndex: thisIndex,
                fromParentIndex: fromParentIndex,
                toParentIndex: toParentIndex,
                toIndex: toIndex,
                index: _constant.linePathAry.length
            });
        }
    };
}