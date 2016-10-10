"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPipeline = initPipeline;

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

var _pipelineData = require("../pipeline/pipelineData");

var _drag = require("../common/drag");

var _clickStart = require("../stage/clickStart");

var _clickAddStage = require("../stage/clickAddStage");

var _clickStage = require("../stage/clickStage");

var _initAction = require("../pipeline/initAction");

var _lineHover = require("../relation/lineHover");

var _dragDropSetPath = require("../relation/dragDropSetPath");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function initPipeline() {

    constant.pipelineView.selectAll("image").remove();
    constant.pipelineView.selectAll("image").data(_pipelineData.pipelineData).enter().append("image").attr("xlink:href", function (d, i) {
        // console.log(d.type);
        if (d.type == constant.PIPELINE_START) {
            // console.log(PIPELINE_START);
            return "../../assets/svg/start.svg";
        } else if (d.type == constant.PIPELINE_ADD_STAGE) {
            // console.log(PIPELINE_ADD_STAGE);
            return "../../assets/svg/addStage.svg";
        } else if (d.type == constant.PIPELINE_END) {
            // console.log(PIPELINE_END);
            return "../../assets/svg/end.svg";
        } else if (d.type == constant.PIPELINE_STAGE) {
            // console.log(PIPELINE_STAGE);
            return "../../assets/svg/stage.svg";
        }
    }).attr("id", function (d, i) {
        return d.id;
    }).attr("data-index", function (d, i) {
        return i;
    }).attr("width", function (d, i) {
        return constant.svgStageWidth;
    }).attr("height", function (d, i) {
        return constant.svgStageHeight;
    }).attr("transform", function (d, i) {
        d.width = constant.svgStageWidth;
        d.height = constant.svgStageHeight;
        d.translateX = i * constant.PipelineNodeSpaceSize + constant.pipelineNodeStartX;
        d.translateY = constant.pipelineNodeStartY;
        return "translate(" + d.translateX + "," + d.translateY + ")";
    }).attr("translateX", function (d, i) {
        return i * constant.PipelineNodeSpaceSize + constant.pipelineNodeStartX;
    }).attr("translateY", constant.pipelineNodeStartY).attr("class", function (d, i) {
        // console.log(d);
        if (d.type == constant.PIPELINE_START) {
            return constant.PIPELINE_START;
        } else if (d.type == constant.PIPELINE_ADD_STAGE) {
            return constant.PIPELINE_ADD_STAGE;
        } else if (d.type == constant.PIPELINE_END) {
            return constant.PIPELINE_END;
        } else if (d.type == constant.PIPELINE_STAGE) {
            return constant.PIPELINE_STAGE;
        }
    }).on("mousedown", function (d, i) {

        if (d.type == constant.PIPELINE_START) {
            (0, _dragDropSetPath.dragDropSetPath)({
                "data": d,
                "node": i
            });
        }
    }).on("mouseover", function (d, i) {
        d3.select("#" + d.id).attr("xlink:href", function (d, i) {
            if (d.type == constant.PIPELINE_START) {
                (0, _lineHover.mouseoverRelevantPipeline)(d);
                return "../../assets/svg/start-mouseover.svg";
            } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                return "../../assets/svg/addStage-mouseover.svg";
            } else if (d.type == constant.PIPELINE_END) {
                return "../../assets/svg/end.svg";
            } else if (d.type == constant.PIPELINE_STAGE) {
                return "../../assets/svg/stage-mouseover.svg";
            }
        });
    }).on("mouseout", function (d, i) {
        d3.select("#" + d.id).attr("xlink:href", function (d, i) {
            if (d.type == constant.PIPELINE_START) {
                (0, _lineHover.mouseoutRelevantPipeline)();
                return "../../assets/svg/start.svg";
            } else if (d.type == constant.PIPELINE_ADD_STAGE) {
                return "../../assets/svg/addStage.svg";
            } else if (d.type == constant.PIPELINE_END) {
                return "../../assets/svg/end.svg";
            } else if (d.type == constant.PIPELINE_STAGE) {
                return "../../assets/svg/stage.svg";
            }
        });
    }).on("click", function (d, i) {
        if (d.type == constant.PIPELINE_START) {
            (0, _clickStart.clickStart)(d, i);
        } else if (d.type == constant.PIPELINE_ADD_STAGE) {
            (0, _clickAddStage.clickAddStage)(d, i);
            initPipeline();
            (0, _initAction.initAction)();
        } else if (d.type == constant.PIPELINE_END) {} else if (d.type == constant.PIPELINE_STAGE) {
            (0, _clickStage.clickStage)(d, i);
        }
    }).call(_drag.drag);
}