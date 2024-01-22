"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DeadPage.ts
var react_1 = require("react");
var DeadPage = function (_a) {
    var date = _a.date, status = _a.status, _b = _a.duration, duration = _b === void 0 ? 7 : _b;
    if (!date || !status) {
        throw new Error('Both "date" and "status" props are required.');
    }
    (0, react_1.useEffect)(function () {
        if (status === 'paid') {
            return; // If status is 'paid', do nothing
        }
        var dueDate = new Date(date);
        var currentDate = new Date();
        var daysDeadline = duration;
        var utc1 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        var utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        var days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
        if (days > 0) {
            var daysLate = daysDeadline - days;
            var opacity = (daysLate * 100) / daysDeadline / 100;
            opacity = opacity < 0 ? 0 : opacity;
            opacity = opacity > 1 ? 1 : opacity;
            if (opacity >= 0 && opacity <= 1) {
                document.body.style.opacity = opacity.toString();
            }
        }
    }, [date, status, duration]);
    return null;
};
exports.default = DeadPage;
