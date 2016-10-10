"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeLinkArray = removeLinkArray;

var _constant = require("../common/constant");

function removeLinkArray(sd) {
	var parentIndex = $("#" + sd.id).attr("data-parent");
	var index = $("#" + sd.id).attr("data-index");

	for (var i = 0; i < _constant.linePathAry.length; i++) {

		if (parentIndex == undefined) {
			if (_constant.linePathAry[i].fromParentIndex == index || _constant.linePathAry[i].toParentIndex == index) {
				_constant.linePathAry.splice(i, 1);
				removeLinkArray(sd);
				return;
			}
		} else {
			if (_constant.linePathAry[i].fromParentIndex == parentIndex) {
				if (_constant.linePathAry[i].fromIndex == index) {
					_constant.linePathAry.splice(i, 1);
					removeLinkArray(sd);
					return;
				}
			}

			if (_constant.linePathAry[i].toParentIndex == parentIndex) {
				if (_constant.linePathAry[i].toIndex == index) {
					_constant.linePathAry.splice(i, 1);
					removeLinkArray(sd);
					return;
				}
			}
		}
	}
}