"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAction = initAction;

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

var _drag = require("../common/drag");

var _lineHover = require("../relation/lineHover");

var _initLine = require("../pipeline/initLine");

var _clickAction = require("../action/clickAction");

var _dragDropSetPath = require("../relation/dragDropSetPath");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function initAction() {
    constant.actionsView.selectAll("g").remove();

    //Action
    constant.pipelineView.selectAll("image").each(function (d, i) {
        if (d.type == constant.PIPELINE_STAGE && d.actions != null && d.actions.length > 0) {
            var actionViewId = "action" + "-" + d.id;

            constant.actionView[actionViewId] = constant.actionsView.append("g").attr("width", constant.svgWidth).attr("height", constant.svgHeight).attr("id", actionViewId);

            var actionStartX = d.translateX + 7.5;
            var actionStartY = d.translateY;

            constant.actionView[actionViewId].selectAll("image").data(d.actions).enter().append("image").attr("xlink:href", function (ad, ai) {
                // if (ai % 2 == 0) {
                return "../../assets/svg/action-bottom.svg";
                // } else {
                //     return "../../assets/svg/action-top.svg";
                // }
            }).attr("id", function (ad, ai) {
                return ad.id;
            }).attr("data-index", function (ad, ai) {
                return ai;
            }).attr("data-parent", i).attr("width", function (ad, ai) {
                return constant.svgActionWidth;
            }).attr("height", function (ad, ai) {
                return constant.svgActionHeight;
            })
            // .attr("translateX",actionStartX)
            // .attr("translateY",function(ad, ai){
            //     if (ai % 2 == 0) {
            //         ad.translateY = actionStartY + constant.svgStageHeight - 25 + constant.ActionNodeSpaceSize * (ai / 2 + 1);
            //     } else {
            //         ad.translateY = actionStartY - constant.svgStageHeight + 5 - constant.ActionNodeSpaceSize * (ai / 2);
            //     }
            //     return ad.translateY;
            // })
            .attr("transform", function (ad, ai) {
                ad.width = constant.svgActionWidth;
                ad.height = constant.svgActionHeight;
                console.log(i);
                if (i % 2 == 0) {
                    ad.translateX = actionStartX;
                    ad.translateY = actionStartY + constant.svgStageHeight + constant.ActionNodeSpaceSize * (ai + 1);
                } else {
                    ad.translateX = actionStartX;
                    ad.translateY = actionStartY + constant.svgStageHeight + 25 + constant.ActionNodeSpaceSize * (ai + 1);
                }

                return "translate(" + ad.translateX + "," + ad.translateY + ")";
            }).on("mousedown", function (ad, ai) {
                (0, _dragDropSetPath.dragDropSetPath)({
                    "data": ad,
                    "node": ai
                });
            }).on("mouseover", function (ad, ai) {
                // if (ai % 2 == 0) {
                d3.select("#" + ad.id).attr("xlink:href", function (ad, ai) {
                    return "../../assets/svg/action-bottom-mouseover.svg";
                });
                // } else {
                //     d3.select("#" + ad.id)
                //         .attr("xlink:href", function (ad, ai) {
                //             return "../../assets/svg/action-top-mouseover.svg";
                //         });
                // }
                (0, _lineHover.mouseoverRelevantPipeline)(ad);
            }).on("mouseout", function (ad, ai) {
                // if (ai % 2 == 0) {
                d3.select("#" + ad.id).attr("xlink:href", function (ad, ai) {
                    return "../../assets/svg/action-bottom.svg";
                });
                // } else {
                //     d3.select("#" + ad.id)
                //         .attr("xlink:href", function (ad, ai) {
                //             return "../../assets/svg/action-top.svg";
                //         });
                // }
                (0, _lineHover.mouseoutRelevantPipeline)();
            }).on("click", function (ad, ai) {
                (0, _clickAction.clickAction)(ad, ai);
            }).call(_drag.drag);
            // .append("text")
            // .text(d.id)
            // .attr("x",actionStartX + 2)
            // .attr("y",function(td,ti){actionStartY + constant.svgStageHeight - 25 + constant.ActionNodeSpaceSize * ti + 2})
            // .attr("stroke", "green")
            // .attr("stroke-width", 1);

        }
    });

    (0, _initLine.initLine)();
}