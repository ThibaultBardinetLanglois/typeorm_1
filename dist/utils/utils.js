"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatMorganDate(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const year = date.getFullYear(), month = months[date.getMonth()], day = date.getDate(), hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`, minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${day} ${month} ${year} à ${hour}h${minutes}`;
}
exports.default = formatMorganDate;
//# sourceMappingURL=utils.js.map