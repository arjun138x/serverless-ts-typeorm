"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const success = (statusCode, body) => ({
    statusCode,
    body: JSON.stringify({ success: true, data: body }),
});
exports.success = success;
const failure = (statusCode, message) => ({
    statusCode,
    body: JSON.stringify({ success: false, error: message }),
});
exports.failure = failure;
//# sourceMappingURL=responseHandler.js.map