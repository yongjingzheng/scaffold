'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
function isObject(o) {
  return Object.prototype.toString.call(o) == '[object Object]';
}
function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}
function isBoolean(o) {
  return Object.prototype.toString.call(o) == '[object Boolean]';
}
function isNumber(o) {
  return Object.prototype.toString.call(o) == '[object Number]';
}
function isString(o) {
  return Object.prototype.toString.call(o) == '[object String]';
}