

export function isObject(o) { return Object.prototype.toString.call(o) == '[object Object]'; }
export function isArray(o) { return Object.prototype.toString.call(o) == '[object Array]'; }
export function isBoolean(o) { return Object.prototype.toString.call(o) == '[object Boolean]'; }
export function isNumber(o) { return Object.prototype.toString.call(o) == '[object Number]'; }
export function isString(o) { return Object.prototype.toString.call(o) == '[object String]'; }