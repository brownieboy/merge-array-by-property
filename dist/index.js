(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.mergeArrayByPropertyValue = mod.exports;
    }
})(this, function (module) {
    "use strict";

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var mergeArrayByPropertyValue = function mergeArrayByPropertyValue(id, sourceArray, toMergeArray, options) {
        var infoMatched = void 0,
            sourceArrayKey = void 0,
            toMergeArrayKey = void 0,
            newEl = void 0;
        if (typeof id === "string") {
            sourceArrayKey = id;
            toMergeArrayKey = id;
        } else {
            // Assume id is actually an array of ids
            sourceArrayKey = id[0];
            toMergeArrayKey = id[1] || id[0];
        }
        var mergeArray = sourceArray.map(function (sourceEl) {
            infoMatched = toMergeArray.find(function (targetMergeEl) {
                return sourceEl[sourceArrayKey] === targetMergeEl[toMergeArrayKey];
            });

            newEl = Object.assign({}, sourceEl); // Avoid mutation, and default if there's no matching info
            //newEl = { ...sourceEl };
            if (typeof infoMatched !== "undefined") {
                // Assign as new target if we supplied that option
                if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && typeof options.newProperty === "string") {
                    newEl[options.newProperty] = Object.assign({}, infoMatched);
                    delete newEl[options.newProperty][toMergeArrayKey];
                } else {
                    // Otherwise just merge
                    newEl = Object.assign({}, sourceEl, infoMatched);
                }
            }
            return newEl;
        });
        return mergeArray;
    };

    module.exports = mergeArrayByPropertyValue;
});
