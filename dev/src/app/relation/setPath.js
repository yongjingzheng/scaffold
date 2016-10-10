"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPath = setPath;
exports.getPathData = getPathData;

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

var _drag = require("../common/drag");

var _pipelineEdit = require("./pipelineEdit");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setPath(options) {
    var fromDom = $("#" + options.startData.id)[0].__data__;
    var toDom = $("#" + options.endData.id)[0].__data__;

    var fromParentIndex = $("#" + options.startData.id).attr("data-parent");
    var fromIndex = $("#" + options.startData.id).attr("data-index");

    var toParentIndex = $("#" + options.endData.id).attr("data-parent");
    var toIndex = $("#" + options.endData.id).attr("data-index");

    var startPoint = { x: fromDom.translateX, y: fromDom.translateY },
        endPoint = { x: toDom.translateX, y: toDom.translateY };

    constant.lineView[options.pipelineLineViewId].append("path").attr("d", getPathData(startPoint, endPoint)).attr("fill", "none").attr("stroke-opacity", "0.2").attr("stroke", "green").attr("stroke-width", 15).attr("class", options.defaultClass).attr("from-parent", !fromParentIndex ? -1 : fromParentIndex).attr("from-index", fromIndex).attr("to-parent", toParentIndex).attr("to-index", toIndex).attr("data-index", options.index).on("mouseover", function () {
        this.parentNode.appendChild(this);
        d3.select(this).attr("stroke-opacity", "1");
    }).on("mouseout", function () {
        d3.select(this).attr("stroke-opacity", "0.2");
    }).on("click", function (d) {
        var linkDom = $(this);
        $.ajax({
            url: "../../templates/relation/pipelineEdit.html",
            type: "GET",
            cache: false,
            success: function success(data) {
                (0, _pipelineEdit.pipelineEdit)(data, linkDom);
            }
        });
    });
}

function getPathData(startPoint, endPoint) {
    var curvature = .5;
    var x0 = startPoint.x + 30,
        x1 = endPoint.x + 2,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = startPoint.y + 30 / 2,
        y1 = endPoint.y + 30 / 2;

    return "M" + x0 + "," + y0 + "C" + x2 + "," + y0 + " " + x3 + "," + y1 + " " + x1 + "," + y1;
}