"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mouseoverRelevantPipeline = mouseoverRelevantPipeline;
exports.mouseoutRelevantPipeline = mouseoutRelevantPipeline;
function mouseoverRelevantPipeline(thisData) {
    var pathAry = d3.selectAll("#pipeline-line-view path")[0];
    pathAry.forEach(function (i) {
        try {
            var _path = d3.select(i),
                _class = _path.attr("class");
            if (!!_class) {
                // _path.attr("stroke-opacity","0.1");
            }

            if (_class.indexOf(thisData.id) == 0) {
                i.parentNode.appendChild(i);
                _path.attr("stroke-opacity", "1");
            }
        } catch (e) {}
    });
}

function mouseoutRelevantPipeline() {
    var pathAry = d3.selectAll("#pipeline-line-view path")[0];
    pathAry.forEach(function (i) {
        var _path = d3.select(i),
            _class = _path.attr("class");
        if (!!_class) {
            _path.attr("stroke-opacity", "0.2");
        }
    });
}